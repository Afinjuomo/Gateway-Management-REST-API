"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteGateway = exports.updateGateway = exports.createGateway = exports.getGatewayById = exports.getAllGateways = void 0;
const gateway_1 = __importDefault(require("../models/gateway"));
const peripheralDevice_1 = __importDefault(require("../models/peripheralDevice"));
// Get all gateways
const getAllGateways = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const gateways = yield gateway_1.default.findAll();
        if (gateways.length === 0) {
            res.json({ message: 'No gateways found', gateways: [] });
        }
        else {
            res.json({ message: 'All gateways retrieved successfully', gateways });
        }
    }
    catch (error) {
        console.error('Error fetching gateways:', error);
        res.status(500).send('Internal Server Error');
    }
});
exports.getAllGateways = getAllGateways;
// Get gateway by ID
const getGatewayById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const gateway = yield gateway_1.default.findByPk(id, {
            include: [{
                    model: peripheralDevice_1.default,
                    as: 'peripheralDevices', // Specify the alias here
                }],
        });
        if (!gateway) {
            res.status(404).send('Gateway not found');
            return;
        }
        res.json({ message: 'Gateway retrieved successfully', gateway });
    }
    catch (error) {
        console.error('Error fetching gateway by ID:', error);
        res.status(500).send('Internal Server Error');
    }
});
exports.getGatewayById = getGatewayById;
// Create a new gateway
const createGateway = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, ipAddress } = req.body;
    try {
        const gateway = yield gateway_1.default.create({ name, ipAddress });
        res.json({ message: 'Gateway created successfully', gateway });
    }
    catch (error) {
        console.error('Error creating gateway:', error);
        res.status(500).send('Internal Server Error');
    }
});
exports.createGateway = createGateway;
// Update a gateway by ID
const updateGateway = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { name, ipAddress } = req.body;
    try {
        const gateway = yield gateway_1.default.findByPk(id);
        if (!gateway) {
            res.status(404).send('Gateway not found');
            return;
        }
        gateway.name = name;
        gateway.ipAddress = ipAddress;
        yield gateway.save();
        res.json({ message: 'Gateway updated successfully', gateway });
    }
    catch (error) {
        console.error('Error updating gateway:', error);
        res.status(500).send('Internal Server Error');
    }
});
exports.updateGateway = updateGateway;
// Delete a gateway by ID
const deleteGateway = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const gateway = yield gateway_1.default.findByPk(id);
        if (!gateway) {
            res.status(404).send('Gateway not found');
            return;
        }
        yield gateway.destroy();
        res.json({ message: 'Gateway deleted successfully' });
    }
    catch (error) {
        console.error('Error deleting gateway:', error);
        res.status(500).send('Internal Server Error');
    }
});
exports.deleteGateway = deleteGateway;
