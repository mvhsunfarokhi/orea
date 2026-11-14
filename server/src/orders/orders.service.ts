import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { CatalogService } from "../catalog/catalog.service";
import { CreateOrderDto } from "./orders.dto";
import { Order, OrderDocument } from "./schemas/order.schema";

@Injectable()
export class OrdersService {
  constructor(
    @InjectModel(Order.name) private readonly orderModel: Model<OrderDocument>,
    private readonly catalogService: CatalogService,
  ) {}

  async create(dto: CreateOrderDto) {
    const lines = await Promise.all(dto.items.map(async (item) => ({ item, product: await this.catalogService.findProduct(item.slug) })));
    if (lines.some(({ product }) => !product)) throw new BadRequestException("یکی از محصولات پیدا نشد");
    const items = lines.map(({ item, product }) => ({ slug: product!.slug, name: product!.name, quantity: item.quantity, priceEur: product!.priceEur }));
    const totalEur = items.reduce((sum, item) => sum + item.priceEur * item.quantity, 0);
    const totalToman = totalEur * 100_000;
    const order = await this.orderModel.create({ items, totalEur, totalToman, status: "pending" });
    return { ok: true, orderId: order.id, totalEur, totalToman, status: order.status };
  }
}
