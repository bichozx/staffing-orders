import { Injectable } from '@nestjs/common';
import { FindOptionsWhere, Repository } from 'typeorm';
import { Order } from '../entities/order.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class OrdersRepository {
  constructor(
    @InjectRepository(Order)
    private readonly repo: Repository<Order>,
  ) {}

  create(order: Partial<Order>): Order {
    return this.repo.create(order);
  }

  async save(order: Order): Promise<Order> {
    return await this.repo.save(order);
  }

  findById(id: string) {
    return this.repo.findOne({ where: { id } });
  }

  async findAll(filters: FindOptionsWhere<Order>, skip: number, take: number) {
    const [data, total] = await this.repo.findAndCount({
      where: filters,
      skip,
      take,
    });

    return {
      data,
      total,
    };
  }
}
