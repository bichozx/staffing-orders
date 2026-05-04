import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { CreateOrderDto } from '../dto/create-order.dto';
import { OrdersService } from '../services/orders.service';
import { QueryOrdersDto } from '../dto/query-orders.dto';
import { UpdateOrderStatusDto } from '../dto/update-order-status.dto';
import { ApiKeyGuard } from '../auth/guards/api-key.guard';

@Controller('orders')
export class OrdersController {
  constructor(private readonly service: OrdersService) {}

  @UseGuards(ApiKeyGuard)
  @Post()
  create(@Body() dto: CreateOrderDto) {
    return this.service.create(dto);
  }

  @Get()
  findAll(@Query() query: QueryOrdersDto) {
    return this.service.findAll(query);
  }

  @UseGuards(ApiKeyGuard)
  @Put(':id/status')
  updateStatus(@Param('id') id: string, @Body() dto: UpdateOrderStatusDto) {
    return this.service.updateStatus(id, dto.status);
  }
}
