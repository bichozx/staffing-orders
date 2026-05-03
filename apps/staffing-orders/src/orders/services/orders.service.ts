import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import {
  ClientProxy,
  ClientProxyFactory,
  Transport,
} from '@nestjs/microservices';

import { CreateOrderDto } from '../dto/create-order.dto';
import { FindOptionsWhere } from 'typeorm';
import { Order } from '../entities/order.entity';
import { OrderStatus } from '../enums/order-status.enum';
import { OrdersRepository } from '../repositories/orders.repository';
import { QueryOrdersDto } from '../dto/query-orders.dto';

type OrderStatusChangedEvent = {
  orderId: string;
  fromStatus: OrderStatus;
  toStatus: OrderStatus;
  timestamp: Date;
};

const VALID_TRANSITIONS: Record<OrderStatus, OrderStatus[]> = {
  [OrderStatus.PENDING]: [OrderStatus.CONFIRMED, OrderStatus.CANCELLED],
  [OrderStatus.CONFIRMED]: [OrderStatus.SHIPPED],
  [OrderStatus.SHIPPED]: [OrderStatus.DELIVERED],
  [OrderStatus.DELIVERED]: [],
  [OrderStatus.CANCELLED]: [],
};

@Injectable()
export class OrdersService {
  private client: ClientProxy;

  constructor(private readonly repo: OrdersRepository) {
    this.client = ClientProxyFactory.create({
      transport: Transport.TCP,
      options: {
        host: process.env.AUDIT_MS_HOST || 'audit-service', // 🔥 docker ready
        port: Number(process.env.AUDIT_MS_PORT) || 4001,
      },
    });
  }

  async create(dto: CreateOrderDto) {
    if (dto.quantity <= 0) {
      throw new BadRequestException('Invalid quantity');
    }
    console.log('CREATING ORDER', dto);

    const order = this.repo.create({
      ...dto,
      status: OrderStatus.PENDING,
    });

    const saved = await this.repo.save(order);

    console.log('SAVED ORDER:', saved);

    return await this.repo.save(order); // ✅ ahora sí persiste
  }

  async findAll(query: QueryOrdersDto) {
    const { status, userId, page = 1, limit = 10 } = query;

    const filters: FindOptionsWhere<Order> = {};
    if (status) filters.status = status;
    if (userId) filters.userId = userId;

    return this.repo.findAll(filters, (page - 1) * limit, limit); // ✅ fix paginación
  }

  async updateStatus(id: string, newStatus: OrderStatus) {
    const order = await this.repo.findById(id);

    if (!order) throw new NotFoundException('Order not found');

    const allowed = VALID_TRANSITIONS[order.status];

    if (!allowed.includes(newStatus)) {
      throw new BadRequestException(
        `Invalid transition from ${order.status} to ${newStatus}`,
      );
    }

    const prev = order.status;
    order.status = newStatus;

    await this.repo.save(order);

    const event: OrderStatusChangedEvent = {
      orderId: order.id,
      fromStatus: prev,
      toStatus: newStatus,
      timestamp: new Date(),
    };

    this.client.emit('order.status.changed', event);

    return order;
  }
}
