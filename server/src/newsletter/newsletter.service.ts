import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { SubscribeDto } from "./newsletter.dto";
import { Subscriber, SubscriberDocument } from "./schemas/subscriber.schema";

@Injectable()
export class NewsletterService {
  constructor(@InjectModel(Subscriber.name) private readonly subscriberModel: Model<SubscriberDocument>) {}

  async subscribe(dto: SubscribeDto) {
    await this.subscriberModel.updateOne({ email: dto.email }, { $set: { email: dto.email } }, { upsert: true });
    return { ok: true, message: "عضویت شما در خبرنامه ثبت شد." };
  }
}
