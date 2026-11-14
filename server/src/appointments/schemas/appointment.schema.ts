import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type AppointmentDocument = HydratedDocument<Appointment>;

@Schema({ timestamps: true })
export class Appointment {
  @Prop({ required: true, trim: true })
  name!: string;

  @Prop({ required: true, lowercase: true, trim: true })
  email!: string;

  @Prop({ required: true, trim: true })
  message!: string;

  @Prop({ default: "new", enum: ["new", "contacted", "closed"] })
  status!: string;
}

export const AppointmentSchema = SchemaFactory.createForClass(Appointment);
