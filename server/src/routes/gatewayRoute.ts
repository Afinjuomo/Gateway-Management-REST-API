// src/routes/gatewayRoutes.ts
import { Router } from 'express';
import * as gatewayController from '../controllers/gatewayController'; 

const router: Router = Router();

// Get all gateways
router.get('/gateways', gatewayController.getAllGateways);

// Get a specific gateway by ID
router.get('/gateways/:id', gatewayController.getGatewayById);

// Create a new gateway
router.post('/gateways', gatewayController.createGateway);

// Update a gateway by ID
router.put('/gateways/:id', gatewayController.updateGateway);

// Delete a gateway by ID
router.delete('/gateways/:id', gatewayController.deleteGateway);

export default router;
