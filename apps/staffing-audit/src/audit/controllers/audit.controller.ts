import { Controller, Get, Param } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { AuditService } from '../services/audit.service';
import { OrderStatusChangedEvent } from '../dto/audit-event.dto';

@Controller()
export class AuditController {
  constructor(private readonly auditService: AuditService) {}

  // 🔥 ESCUCHAR EVENTO DESDE ORDERS
  @EventPattern('order.status.changed')
  async handleOrderStatusChanged(@Payload() data: OrderStatusChangedEvent) {
    console.log('AUDIT EVENT RECEIVED:', data);

    await this.auditService.create({
      orderId: data.orderId,
      fromStatus: data.fromStatus,
      toStatus: data.toStatus,
      timestamp: data.timestamp,
    });
  }

  // 📡 ENDPOINT PARA CONSULTAR AUDITORÍA
  @Get('audit/:orderId')
  async getAudit(@Param('orderId') orderId: string) {
    return this.auditService.findByOrderId(orderId);
  }
}
