import { Request, Response, NextFunction } from 'express';
import { Op } from 'sequelize';
import { v4 as uuidv4 } from 'uuid';
import Gateway from '../models/gateway';
import PeripheralDevice from '../models/peripheralDevice';

// Get all peripheral devices
export const getAllPeripheralDevices = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const devices = await PeripheralDevice.findAll();
    res.json({ message: 'Peripheral devices retrieved successfully', devices });
  } catch (error) {
    console.error('Error fetching peripheral devices:', error);
    res.status(500).send('Internal Server Error');
  }
};

// Get peripheral device by ID
export const getPeripheralDeviceById = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;

  try {
    const device = await PeripheralDevice.findByPk(id);
    if (!device) {
      res.status(404).send('Peripheral device not found');
      return;
    }

    res.json({ message: 'Peripheral device retrieved successfully', device });
  } catch (error) {
    console.error('Error fetching peripheral device by ID:', error);
    res.status(500).send('Internal Server Error');
  }
};

// Create a new peripheral device
export const createPeripheralDevice = async (req: Request, res: Response, next: NextFunction) => {
  const { uid, vendor, status, gatewayId } = req.body;

  try {
    const gateway = await Gateway.findByPk(gatewayId);
    if (!gateway) {
      res.status(404).send('Gateway not found');
      return;
    }

    // Check if the gateway has less than 10 devices
    const deviceCount = await PeripheralDevice.count({ where: { gatewayId } });
    if (deviceCount >= 10) {
      res.status(400).send('Gateway cannot have more than 10 peripheral devices');
      return;
    }

    const uid = uuidv4();

    const device = await PeripheralDevice.create({ uid, vendor, status, gatewayId });
    res.json({ message: 'Peripheral device created successfully', device });
  } catch (error) {
    console.error('Error creating peripheral device:', error);
    res.status(500).send('Internal Server Error');
  }
};

// Update a peripheral device by ID
export const updatePeripheralDevice = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const { uid, vendor, status, gatewayId } = req.body;

    console.log('Received request to update device. ID:', id, 'Gateway ID:', gatewayId);

    const device = await PeripheralDevice.findByPk(id);
    if (!device) {
      console.log('Peripheral device not found');
      res.status(404).send('Peripheral device not found');
      return;
    }

    const gateway = await Gateway.findByPk(gatewayId);
    if (!gateway) {
      console.log('Gateway not found');
      res.status(404).send('Gateway not found');
      return;
    }

    // Check if the gateway has less than 10 devices
    const deviceCount = await PeripheralDevice.count({
      where: { gatewayId, id: { [Op.ne]: device.id } },
    });
    if (deviceCount >= 10) {
      console.log('Gateway has too many devices');
      res.status(400).send('Gateway cannot have more than 10 peripheral devices');
      return;
    }

    device.uid = uid;
    device.vendor = vendor;
    device.status = status;
    device.gatewayId = gatewayId;
    await device.save();

    res.json({ message: 'Peripheral device updated successfully', device });
  } catch (error) {
    console.error('Error updating peripheral device:', error);
    res.status(500).send('Internal Server Error');
  }
};


// Delete a peripheral device by ID
export const deletePeripheralDevice = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;

  try {
    const device = await PeripheralDevice.findByPk(id);
    if (!device) {
      res.status(404).send('Peripheral device not found');
      return;
    }

    await device.destroy();
    res.json({ message: 'Peripheral device deleted successfully' });
  } catch (error) {
    console.error('Error deleting peripheral device:', error);
    res.status(500).send('Internal Server Error');
  }
};
