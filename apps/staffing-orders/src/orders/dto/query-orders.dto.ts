import { IsEnum, IsInt, IsOptional, IsString, Min } from 'class-validator';

import { OrderStatus } from '../enums/order-status.enum';
import { Type } from 'class-transformer';

export class QueryOrdersDto {
  @IsOptional()
  @IsEnum(OrderStatus)
  status?: OrderStatus;

  @IsOptional()
  @IsString()
  userId?: string;

  @Type(() => Number)
  @IsInt()
  @Min(1)
  page: number = 1;

  @Type(() => Number)
  @IsInt()
  @Min(1)
  limit: number = 10;
}
