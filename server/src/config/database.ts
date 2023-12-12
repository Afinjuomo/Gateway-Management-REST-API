// // src/config/database.ts
// import { Sequelize } from 'sequelize';

// const sequelize = new Sequelize({
//   dialect: 'postgres',
//   host: process.env.DB_HOST,
//   port: parseInt(process.env.DB_PORT || '5432', 10),
//   username: process.env.DB_USERNAME,
//   password: (process.env.DB_PASSWORD),
//   database: process.env.DB_NAME
// });

// export { sequelize };

// src/config/sequelize.ts
 
import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
 
dotenv.config();
 
const sequelize = new Sequelize({
  database: process.env.DB_NAME || 'your_database_name',
  username: process.env.DB_USERNAME || 'your_database_user',
  password: process.env.DB_PASSWORD || 'your_database_password',
  host: process.env.DB_HOST || 'localhost',

port: process.env.DB_PORT as unknown as number,
 
  dialect: 'postgres',
  logging: false,
});
 
 
 
export default sequelize;
