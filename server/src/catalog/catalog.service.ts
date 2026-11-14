import { Injectable, OnModuleInit } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { SEED_COLLECTIONS, SEED_PRODUCTS } from "./catalog.seed";
import { Collection, CollectionDocument } from "./schemas/collection.schema";
import { Product, ProductDocument } from "./schemas/product.schema";

export type CatalogProduct = {
  slug: string;
  name: string;
  priceEur: number;
  price: string;
  image: string;
  hoverImage?: string;
  family: string;
  category: string;
  colors?: number;
  sizes: string[];
};

export type CollectionSummary = { slug: string; title: string; eyebrow: string; image: string };

@Injectable()
export class CatalogService implements OnModuleInit {
  constructor(
    @InjectModel(Product.name) private readonly productModel: Model<ProductDocument>,
    @InjectModel(Collection.name) private readonly collectionModel: Model<CollectionDocument>,
  ) {}

  async onModuleInit() {
    await Promise.all([
      this.productModel.bulkWrite(SEED_PRODUCTS.map((product) => ({ updateOne: { filter: { slug: product.slug }, update: { $set: product }, upsert: true } }))),
      this.collectionModel.bulkWrite(SEED_COLLECTIONS.map((collection) => ({ updateOne: { filter: { slug: collection.slug }, update: { $set: collection }, upsert: true } }))),
    ]);
  }

  async findProducts(filters: { family?: string; category?: string; search?: string }): Promise<{ products: CatalogProduct[]; total: number }> {
    const query: Record<string, unknown> = {};
    if (filters.family) query.family = filters.family;
    if (filters.category) query.category = filters.category;
    if (filters.search) query.$or = [{ name: new RegExp(filters.search, "i") }, { family: new RegExp(filters.search, "i") }];
    const products = await this.productModel.find(query).sort({ createdAt: 1 }).lean();
    const result = products.map(({ slug, name, priceEur, image, hoverImage, family, category, colors, sizes }) => ({ slug, name, priceEur, price: `${priceEur}€`, image, hoverImage, family, category, colors, sizes: sizes ?? [] }));
    return { products: result, total: result.length };
  }

  async findProduct(slug: string): Promise<CatalogProduct | null> {
    const product = await this.productModel.findOne({ slug }).lean();
    if (!product) return null;
    const { name, priceEur, image, hoverImage, family, category, colors, sizes } = product;
    return { slug: product.slug, name, priceEur, price: `${priceEur}€`, image, hoverImage, family, category, colors, sizes: sizes ?? [] };
  }

  async findCollections(): Promise<CollectionSummary[]> {
    const collections = await this.collectionModel.find().sort({ createdAt: 1 }).lean();
    return collections.map(({ slug, title, eyebrow, image }) => ({ slug, title, eyebrow, image }));
  }
}
