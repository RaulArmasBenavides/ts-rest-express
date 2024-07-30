import { DataTypes } from 'sequelize';
import db from '../../../infrastructure/data/db/connection';

const ProductModel = db.define('product', {
    id:{
       type :DataTypes.INTEGER,
       primaryKey:true
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
    stock:{
        type :DataTypes.INTEGER
     },
     creation_date:{
        type :DataTypes.DATE
     }
}, {
    timestamps: false  // Deshabilita la creación automática de los campos createdAt y updatedAt
});


export default ProductModel;