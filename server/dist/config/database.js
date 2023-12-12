"use strict";
// // src/config/database.ts
// import { Sequelize } from 'sequelize';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
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
const sequelize_1 = require("sequelize");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const sequelize = new sequelize_1.Sequelize({
    database: process.env.DB_NAME || 'your_database_name',
    username: process.env.DB_USERNAME || 'your_database_user',
    password: process.env.DB_PASSWORD || 'your_database_password',
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT,
    dialect: 'postgres',
    logging: false,
});
exports.default = sequelize;
