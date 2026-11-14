import { Controller, Get, NotFoundException, Param, Query } from "@nestjs/common";
import { CatalogProduct, CatalogService, CollectionSummary } from "./catalog.service";

@Controller("catalog")
export class CatalogController {
  constructor(private readonly catalogService: CatalogService) {}

  @Get("products")
  products(@Query("family") family?: string, @Query("category") category?: string, @Query("search") search?: string): Promise<{ products: CatalogProduct[]; total: number }> {
    return this.catalogService.findProducts({ family, category, search });
  }

  @Get("products/:slug")
  async product(@Param("slug") slug: string): Promise<CatalogProduct> {
    const product = await this.catalogService.findProduct(slug);
    if (!product) throw new NotFoundException("محصول پیدا نشد");
    return product;
  }

  @Get("collections")
  collections(): Promise<CollectionSummary[]> {
    return this.catalogService.findCollections();
  }
}
