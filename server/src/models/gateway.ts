// src/models/Gateway.ts
import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';
import PeripheralDevice from './peripheralDevice'; 

class Gateway extends Model {
  public id!: number;
  public name!: string;
  public ipAddress!: string;
}

Gateway.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    ipAddress: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isIP: true,
      },
    },
  },
  {
    sequelize,
    modelName: 'Gateway',
    tableName: 'gateways',
    timestamps: true,
    underscored: true,
  }
);

// Define the association
Gateway.hasMany(PeripheralDevice, {
  foreignKey: 'gateway_id',
  as: 'peripheralDevices',
});

export default Gateway;
