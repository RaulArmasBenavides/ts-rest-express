import Product from "../../domain/entities/product";
import { IProductService } from "../../domain/interfaces/IProductService";

// @injectable()
export class ProductService implements IProductService {
  async getAllProducts(): Promise<Product[]> {
    return await Product.findAll();
  }

  async getProductById(id: number): Promise<Product | null> {
    return await Product.findByPk(id);
  }

  async createProduct(productData: Partial<Product>): Promise<Product> {
    return await Product.create(productData);
  }

  async updateProduct(id: number, productData: Partial<Product>): Promise<void> {
    await Product.update(productData, {
      where: { id }
    });
  }

  async deleteProduct(id: number): Promise<void> {
    await Product.destroy({
      where: { id }
    });
  }
}