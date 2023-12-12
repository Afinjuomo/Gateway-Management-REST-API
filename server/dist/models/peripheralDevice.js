"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/models/PeripheralDevice.ts
const sequelize_1 = require("sequelize");
const database_1 = __importDefault(require("../config/database"));
class PeripheralDevice extends sequelize_1.Model {
}
PeripheralDevice.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    uid: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    vendor: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    status: {
        type: sequelize_1.DataTypes.ENUM('online', 'offline'),
        allowNull: false,
    },
    gatewayId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Gateways',
            key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
    },
}, {
    sequelize: database_1.default,
    modelName: 'PeripheralDevice',
    tableName: 'peripheral_devices', // You can customize the table name
    timestamps: true,
    underscored: true,
});
exports.default = PeripheralDevice;
