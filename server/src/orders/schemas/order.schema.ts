import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

@Schema({ _id: false })
export class OrderLine {
  @Prop({ required: true })
  slug!: string;

  @Prop({ required: true })
  name!: string;

  @Prop({ required: true })
  quantity!: number;

  @Prop({ required: true })
  priceEur!: number;
}

export const OrderLineSchema = SchemaFactory.createForClass(OrderLine);

export type OrderDocument = HydratedDocument<Order>;

@Schema({ timestamps: true })
export class Order {
  @Prop({ type: [OrderLineSchema], required: true })
  items!: OrderLine[];

  @Prop({ required: true })
  totalEur!: number;

  @Prop({ required: true })
  totalToman!: number;

  @Prop({ default: "pending", enum: ["pending", "paid", "cancelled"] })
  status!: string;
}

export const OrderSchema = SchemaFactory.createForClass(Order);
