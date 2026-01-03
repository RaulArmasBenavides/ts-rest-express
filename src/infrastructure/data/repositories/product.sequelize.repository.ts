import { ProductOptions, Product } from "../../../domain/entities/product";
import { IProductRepository } from "../../../domain/interfaces/IProductRepository";
import { ProductMapper } from "../../mappers/product.mapper";
import ProductModel from "../models/product.model";

export class ProductSequelizeRepository implements IProductRepository {
  async create(data: ProductOptions): Promise<Product> {
    const created = await ProductModel.create({
      ...data,
      creation_date: data.creation_date ?? new Date(),
    });

    return ProductMapper.toDomain(created.get({ plain: true }));
  }

  async findAll(): Promise<Product[]> {
    const rows = await ProductModel.findAll();
    return rows.map(r => ProductMapper.toDomain(r.get({ plain: true })));
  }

  async findById(id: number): Promise<Product | null> {
    const row = await ProductModel.findByPk(id);
    if (!row) return null;
    return ProductMapper.toDomain(row.get({ plain: true }));
  }

  async update(id: number, data: Partial<ProductOptions>): Promise<Product | null> {
    const row = await ProductModel.findByPk(id);
    if (!row) return null;

    await row.update(data);
    return ProductMapper.toDomain(row.get({ plain: true }));
  }

  async delete(id: number): Promise<boolean> {
    const deleted = await ProductModel.destroy({ where: { id } });
    return deleted > 0;
  }
}