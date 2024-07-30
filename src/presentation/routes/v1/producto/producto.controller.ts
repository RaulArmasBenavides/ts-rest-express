import { Request, Response } from 'express';
import { ProductService } from '../../../../application/services/ProductService';
import Product from '../../../../domain/entities/product';

const productService = new ProductService();
 
export const getProducts = async (req: Request, res: Response) => {
    try {
      const products = await productService.getAllProducts();
      res.json({ products });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        msg: 'Internal server error'
      });
    }
  };
  
export const createProduct = async (req: Request, res: Response) => {
    const { body } = req;
  
    try {
      const existingProduct = await Product.findOne({
        where: {
          name: body.name
        }
      });
  
      if (existingProduct) {
        return res.status(400).json({
          msg: 'A product with the name ' + body.name + ' already exists'
        });
      }
  
      const product = await productService.createProduct(body);
      res.json(product);
    } catch (error) {
      console.error(error);
      res.status(500).json({
        msg: 'Internal server error'
      });
    }
  };
  
  export const getProductById = async (req: Request, res: Response) => {
    try {
      const product = await productService.getProductById(parseInt(req.params.id, 10));
      if (product) {
        res.json(product);
      } else {
        res.status(404).json({ msg: 'Product not found' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({
        msg: 'Internal server error'
      });
    }
  };
  
  export const updateProduct = async (req: Request, res: Response) => {
    const { body } = req;
    try {
      await productService.updateProduct(parseInt(req.params.id, 10), body);
      res.status(204).send();
    } catch (error) {
      console.error(error);
      res.status(500).json({
        msg: 'Internal server error'
      });
    }
  };
  
  export const deleteProduct = async (req: Request, res: Response) => {
    try {
      await productService.deleteProduct(parseInt(req.params.id, 10));
      res.status(204).send();
    } catch (error) {
      console.error(error);
      res.status(500).json({
        msg: 'Internal server error'
      });
    }
  };