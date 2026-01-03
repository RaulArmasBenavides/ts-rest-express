// src/infrastructure/mappers/product.mapper.ts

import { Product } from "../../domain/entities/product";

 

export class ProductMapper {
  static toDomain(raw: any): Product {
    // raw puede ser instancia Sequelize o plain object
    const obj = raw?.toJSON ? raw.toJSON() : raw;
    return Product.fromObject(obj);
  }

  static toPersistence(entity: Product) {
    return {
      // id lo manejas según tu estrategia (auto incremental o manual)
      name: entity.name,
      description: entity.description,
      price: entity.price,
      stock: entity.stock,
      creation_date: entity.creation_date,
    };
  }
}
