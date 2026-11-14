import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { CreateAppointmentDto } from "./appointments.dto";
import { Appointment, AppointmentDocument } from "./schemas/appointment.schema";

@Injectable()
export class AppointmentsService {
  constructor(@InjectModel(Appointment.name) private readonly appointmentModel: Model<AppointmentDocument>) {}

  async create(dto: CreateAppointmentDto) {
    const appointment = await this.appointmentModel.create({ ...dto, status: "new" });
    return { ok: true, appointmentId: appointment.id, message: "درخواست شما ثبت شد؛ تیم ORÉA با شما تماس می‌گیرد." };
  }
}
