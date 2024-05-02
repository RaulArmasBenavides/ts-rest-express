import { Sequelize } from 'sequelize';


const db = new Sequelize('spring', 'sa', 'sasasa', {
    host: 'localhost',
    dialect: 'mysql',
    // logging: false,
});

export default db;
