// src/models/PeripheralDevice.ts
import { DataTypes, Model } from 'sequelize';
import  sequelize  from '../config/database';


class PeripheralDevice extends Model {
  public id!: number;
  public uid!: number;
  public vendor!: string;
  public status!: string;
  public gatewayId!: number;
}

PeripheralDevice.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    uid: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    vendor: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM('online', 'offline'),
      allowNull: false,
    },
    gatewayId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Gateways',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    },
  },
  {
    sequelize,
    modelName: 'PeripheralDevice',
    tableName: 'peripheral_devices', // You can customize the table name
    timestamps: true,
    underscored: true,
  }
);

export default PeripheralDevice;
