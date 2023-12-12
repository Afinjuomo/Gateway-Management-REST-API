"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// sequelize.test.ts
const sequelize_1 = require("sequelize");
const sequelize = new sequelize_1.Sequelize({
    dialect: 'postgres', // e.g., 'postgres' or 'mysql'
    database: 'postgres',
    username: 'postgres',
    password: '1234',
    host: 'localhost',
    port: 5432, // Adjust the port based on your setup
    logging: false, // Disable logging during tests
});
exports.default = sequelize;
