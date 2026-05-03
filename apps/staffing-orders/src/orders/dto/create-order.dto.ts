import { IsInt, IsString, Min } from 'class-validator';

export class CreateOrderDto {
  @IsString()
  userId!: string;

  @IsString()
  product!: string;

  @IsInt()
  @Min(1)
  quantity!: number;
}
