import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type SubscriberDocument = HydratedDocument<Subscriber>;

@Schema({ timestamps: true })
export class Subscriber {
  @Prop({ required: true, unique: true, lowercase: true, trim: true })
  email!: string;
}

export const SubscriberSchema = SchemaFactory.createForClass(Subscriber);
