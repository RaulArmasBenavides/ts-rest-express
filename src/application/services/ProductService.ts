import ProductModel from "../../data/mysql/models/product.model";
import {Product} from "../../domain/entities/product";
import { IProductService } from "../../domain/interfaces/IProductService";

// @injectable()
export class ProductService implements IProductService {
  async getAllProducts(): Promise<Product[]> {
    const productResult = await ProductModel.findAll();
    return productResult.map(Product.fromObject)
  }

  async getProductById(id: number): Promise<Product | null> {
    const ProductResult = await ProductModel.findByPk(id);
    return Product.fromObject(ProductResult!);
  }

  async createProduct(productData: Partial<Product>): Promise<Product> {
    const ProductResult = await ProductModel.create(productData);

    return Product.fromObject(ProductResult);
  }

  async updateProduct(id: number, productData: Partial<Product>): Promise<void> {
    await ProductModel.update(productData, {
      where: { id }
    });
  }

  async deleteProduct(id: number): Promise<void> {
    await ProductModel.destroy({
      where: { id }
    });
  }
}