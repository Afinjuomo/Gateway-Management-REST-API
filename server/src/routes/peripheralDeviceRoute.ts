// src/routes/peripheralDeviceRoutes.ts
import { Router } from 'express';
import * as peripheralDeviceController from '../controllers/peripheralDeviceController'; 


const router: Router = Router();

// Get all peripheral devices
router.get('/peripheraldevices',  peripheralDeviceController.getAllPeripheralDevices);

// Get a specific peripheral device by ID
router.get('/peripheraldevices/:id', peripheralDeviceController.getPeripheralDeviceById);

// Create a new peripheral device
router.post('/peripheraldevices', peripheralDeviceController.createPeripheralDevice);

// Update a peripheral device by ID
router.put('/peripheraldevices/:id',  peripheralDeviceController.updatePeripheralDevice);

// Delete a peripheral device by ID
router.delete('/peripheraldevices/:id', peripheralDeviceController.deletePeripheralDevice);

export default router;
