"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/models/Gateway.ts
const sequelize_1 = require("sequelize");
const database_1 = __importDefault(require("../config/database"));
const peripheralDevice_1 = __importDefault(require("./peripheralDevice"));
class Gateway extends sequelize_1.Model {
}
Gateway.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    ipAddress: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isIP: true,
        },
    },
}, {
    sequelize: database_1.default,
    modelName: 'Gateway',
    tableName: 'gateways',
    timestamps: true,
    underscored: true,
});
// Define the association
Gateway.hasMany(peripheralDevice_1.default, {
    foreignKey: 'gateway_id',
    as: 'peripheralDevices',
});
exports.default = Gateway;
