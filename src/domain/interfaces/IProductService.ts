import Product from '../entities/product';
export interface IProductService {
  getAllProducts(): Promise<Product[]>;
  getProductById(id: number): Promise<Product | null>;
  createProduct(productData: Partial<Product>): Promise<Product>;
  updateProduct(id: number, productData: Partial<Product>): Promise<void>;
  deleteProduct(id: number): Promise<void>;
}