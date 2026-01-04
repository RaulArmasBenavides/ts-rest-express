import { DataTypes } from 'sequelize';
import db from '../db/connection';

export const UserModel = db.define('User', {
    nombre: {
        type: DataTypes.STRING
    },
    email: {
        type: DataTypes.STRING
    },
    estado: {
        type: DataTypes.BOOLEAN
    },
});


 