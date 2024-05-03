import { Request, Response } from 'express';
import { json } from 'sequelize/types';
import Producto from '../../../../domain/entities/producto';


export const getProductos = async( req: Request , res: Response ) => {

    const productos = await Producto.findAll();

    res.json({ productos });
}

export const createProducto = async( req: Request , res: Response ) => {

    const { body } = req;

    try {
        
        const existeProducto = await Producto.findOne({
            where: {
                nombre: body.nombre
            }
        });

        if (existeProducto) {
            return res.status(400).json({
                msg: 'Ya existe un producto con el nombre ' + body.nombre
            });
        }

        const producto = await Producto.create(body);
        res.json(producto);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Hable con el administrador'
        })    
    }
}