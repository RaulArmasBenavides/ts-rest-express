import { Request, Response } from 'express';
import { ProductService } from '../../../../application/services/product.service';
import { ProductSequelizeRepository } from '../../../../infrastructure/data/repositories/product.sequelize.repository';

// Composition root (simple, sin DI framework)
const productRepository = new ProductSequelizeRepository();
const productService = new ProductService(productRepository);

export const getProducts = async (_req: Request, res: Response) => {
  try {
    const products = await productService.getAllProducts();
    res.json({ products });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Internal server error' });
  }
};

export const createProduct = async (req: Request, res: Response) => {
  try {
    const created = await productService.createProduct(req.body);
    res.status(201).json(created);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Internal server error' });
  }
};

export const getProductById = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const product = await productService.getProductById(id);

    if (!product) return res.status(404).json({ msg: 'Product not found' });

    res.json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Internal server error' });
  }
};

export const updateProduct = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    await productService.updateProduct(id, req.body);
    res.status(204).send();
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Internal server error' });
  }
};

export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    await productService.deleteProduct(id);
    res.status(204).send();
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Internal server error' });
  }
};
