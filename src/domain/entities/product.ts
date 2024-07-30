import { DataTypes,Model  } from 'sequelize';
import db from '../../infrastructure/data/db/connection';

class Product extends Model {
    public id!: number;
    public name!: string;
    public description!: string;
    public price!: number;
    public stock!: number;
    public creation_date!: Date;
}

Product.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING
    },
    description: {
        type: DataTypes.STRING
    },
    price: {
        type: DataTypes.DECIMAL
    },
    stock: {
        type: DataTypes.INTEGER
    },
    creation_date: {
        type: DataTypes.DATE
    }
}, {
    sequelize: db,
    tableName: 'Product',
    timestamps: false  // Disable automatic creation of createdAt and updatedAt fields
});


export default Product;