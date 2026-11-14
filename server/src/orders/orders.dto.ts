import { Type } from "class-transformer";
import { ArrayMinSize, IsArray, IsInt, IsNotEmpty, IsString, Min, ValidateNested } from "class-validator";

export class OrderItemDto {
  @IsString()
  @IsNotEmpty()
  slug!: string;

  @IsInt()
  @Min(1)
  @Type(() => Number)
  quantity = 1;
}

export class CreateOrderDto {
  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => OrderItemDto)
  items!: OrderItemDto[];
}
