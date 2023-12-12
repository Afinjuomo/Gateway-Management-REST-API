// src/controllers/GatewayController.ts
import { Request, Response, NextFunction } from 'express';
import Gateway from '../models/gateway';
import PeripheralDevice from '../models/peripheralDevice';

// Get all gateways
export const getAllGateways = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const gateways = await Gateway.findAll();
  
      if (gateways.length === 0) {
        res.json({ message: 'No gateways found', gateways: [] });
      } else {
        res.json({ message: 'All gateways retrieved successfully', gateways });
      }
    } catch (error) {
      console.error('Error fetching gateways:', error);
      res.status(500).send('Internal Server Error');
    }
  };
  

// Get gateway by ID
export const getGatewayById = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
  
    try {
      const gateway = await Gateway.findByPk(id, {
        include: [{
          model: PeripheralDevice,
          as: 'peripheralDevices', // Specify the alias here
        }],
      });
  
      if (!gateway) {
        res.status(404).send('Gateway not found');
        return;
      }
  
      res.json({ message: 'Gateway retrieved successfully', gateway });
    } catch (error) {
      console.error('Error fetching gateway by ID:', error);
      res.status(500).send('Internal Server Error');
    }
  };

// Create a new gateway
export const createGateway = async (req: Request, res: Response, next: NextFunction) => {
  const { name, ipAddress } = req.body;

  try {
    const gateway = await Gateway.create({ name, ipAddress });
    res.json({ message: 'Gateway created successfully', gateway });
  } catch (error) {
    console.error('Error creating gateway:', error);
    res.status(500).send('Internal Server Error');
  }
};

// Update a gateway by ID
export const updateGateway = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  const { name, ipAddress } = req.body;

  try {
    const gateway = await Gateway.findByPk(id);
    if (!gateway) {
      res.status(404).send('Gateway not found');
      return;
    }

    gateway.name = name;
    gateway.ipAddress = ipAddress;
    await gateway.save();

    res.json({ message: 'Gateway updated successfully', gateway });
  } catch (error) {
    console.error('Error updating gateway:', error);
    res.status(500).send('Internal Server Error');
  }
};

// Delete a gateway by ID
export const deleteGateway = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;

  try {
    const gateway = await Gateway.findByPk(id);
    if (!gateway) {
      res.status(404).send('Gateway not found');
      return;
    }

    await gateway.destroy();
    res.json({ message: 'Gateway deleted successfully' });
  } catch (error) {
    console.error('Error deleting gateway:', error);
    res.status(500).send('Internal Server Error');
  }
};
