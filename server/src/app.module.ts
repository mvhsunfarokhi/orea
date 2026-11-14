import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { CatalogModule } from "./catalog/catalog.module";
import { NewsletterModule } from "./newsletter/newsletter.module";
import { OrdersModule } from "./orders/orders.module";
import { AppointmentsModule } from "./appointments/appointments.module";
import { HealthController } from "./health.controller";

@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGODB_URI ?? "mongodb://127.0.0.1:27017/orea"),
    CatalogModule,
    NewsletterModule,
    OrdersModule,
    AppointmentsModule,
  ],
  controllers: [HealthController],
})
export class AppModule {}
