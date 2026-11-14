import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type CollectionDocument = HydratedDocument<Collection>;

@Schema({ timestamps: true })
export class Collection {
  @Prop({ required: true, unique: true, index: true })
  slug!: string;

  @Prop({ required: true })
  title!: string;

  @Prop({ required: true })
  eyebrow!: string;

  @Prop({ required: true })
  image!: string;
}

export const CollectionSchema = SchemaFactory.createForClass(Collection);
