import { Product, ProductOptions } from "../entities/product";

export interface IProductRepository {
  create(data: ProductOptions): Promise<Product>;
  findAll(): Promise<Product[]>;
  findById(id: number): Promise<Product | null>;
  update(id: number, data: Partial<ProductOptions>): Promise<Product | null>;
  delete(id: number): Promise<boolean>;
}