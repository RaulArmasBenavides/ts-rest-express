import { Product } from '../../domain/entities/product';
import { IProductService } from '../../domain/interfaces/product-service.interface';
import { IProductRepository } from '../../domain/interfaces/product-repository.interface';

// @injectable()
export class ProductService implements IProductService {
  constructor(private readonly productRepository: IProductRepository) {}

  async getAllProducts(): Promise<Product[]> {
    return this.productRepository.findAll();
  }

  async getProductById(id: number): Promise<Product | null> {
    return this.productRepository.findById(id);
  }

  async createProduct(productData: Partial<Product>): Promise<Product> {
    // Si tu repo.create espera ProductOptions, haz el cast/transform aquí.
    // Idealmente, cambia la firma del service a ProductOptions también.
    return this.productRepository.create(productData as any);
  }

  async updateProduct(id: number, productData: Partial<Product>): Promise<void> {
    await this.productRepository.update(id, productData as any);
  }

  async deleteProduct(id: number): Promise<void> {
    await this.productRepository.delete(id);
  }
}