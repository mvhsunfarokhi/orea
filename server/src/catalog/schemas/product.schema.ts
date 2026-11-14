import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type ProductDocument = HydratedDocument<Product>;

@Schema({ timestamps: true })
export class Product {
  @Prop({ required: true, unique: true, index: true })
  slug!: string;

  @Prop({ required: true })
  name!: string;

  @Prop({ required: true, min: 0 })
  priceEur!: number;

  @Prop({ required: true })
  image!: string;

  @Prop()
  hoverImage?: string;

  @Prop({ required: true })
  family!: string;

  @Prop({ required: true })
  category!: string;

  @Prop({ min: 1 })
  colors?: number;

  @Prop({ type: [String], default: [] })
  sizes!: string[];
}

export const ProductSchema = SchemaFactory.createForClass(Product);
