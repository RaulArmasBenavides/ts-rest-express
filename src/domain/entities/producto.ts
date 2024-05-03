import { DataTypes } from 'sequelize';
import db from '../../infrastructure/data/db/connection';

const Producto = db.define('Producto', {
    id:{
       type :DataTypes.INTEGER,
       primaryKey:true
    },
    nombre: {
        type: DataTypes.STRING
    },
    descripcion: {
        type: DataTypes.STRING
    },
    precio: {
        type: DataTypes.DECIMAL
    },
    stock:{
        type :DataTypes.INTEGER
     },
     fecha_creacion:{
        type :DataTypes.DATE
     }
}, {
    timestamps: false  // Deshabilita la creación automática de los campos createdAt y updatedAt
});


export default Producto;