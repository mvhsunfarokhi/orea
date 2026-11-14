import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { CatalogController } from "./catalog.controller";
import { CatalogService } from "./catalog.service";
import { Collection, CollectionSchema } from "./schemas/collection.schema";
import { Product, ProductSchema } from "./schemas/product.schema";

@Module({
  imports: [MongooseModule.forFeature([{ name: Product.name, schema: ProductSchema }, { name: Collection.name, schema: CollectionSchema }])],
  controllers: [CatalogController],
  providers: [CatalogService],
  exports: [CatalogService],
})
export class CatalogModule {}
