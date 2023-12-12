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
exports.deletePeripheralDevice = exports.updatePeripheralDevice = exports.createPeripheralDevice = exports.getPeripheralDeviceById = exports.getAllPeripheralDevices = void 0;
const sequelize_1 = require("sequelize");
const uuid_1 = require("uuid");
const gateway_1 = __importDefault(require("../models/gateway"));
const peripheralDevice_1 = __importDefault(require("../models/peripheralDevice"));
// Get all peripheral devices
const getAllPeripheralDevices = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const devices = yield peripheralDevice_1.default.findAll();
        res.json({ message: 'Peripheral devices retrieved successfully', devices });
    }
    catch (error) {
        console.error('Error fetching peripheral devices:', error);
        res.status(500).send('Internal Server Error');
    }
});
exports.getAllPeripheralDevices = getAllPeripheralDevices;
// Get peripheral device by ID
const getPeripheralDeviceById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const device = yield peripheralDevice_1.default.findByPk(id);
        if (!device) {
            res.status(404).send('Peripheral device not found');
            return;
        }
        res.json({ message: 'Peripheral device retrieved successfully', device });
    }
    catch (error) {
        console.error('Error fetching peripheral device by ID:', error);
        res.status(500).send('Internal Server Error');
    }
});
exports.getPeripheralDeviceById = getPeripheralDeviceById;
// Create a new peripheral device
const createPeripheralDevice = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { uid, vendor, status, gatewayId } = req.body;
    try {
        const gateway = yield gateway_1.default.findByPk(gatewayId);
        if (!gateway) {
            res.status(404).send('Gateway not found');
            return;
        }
        // Check if the gateway has less than 10 devices
        const deviceCount = yield peripheralDevice_1.default.count({ where: { gatewayId } });
        if (deviceCount >= 10) {
            res.status(400).send('Gateway cannot have more than 10 peripheral devices');
            return;
        }
        const uid = (0, uuid_1.v4)();
        const device = yield peripheralDevice_1.default.create({ uid, vendor, status, gatewayId });
        res.json({ message: 'Peripheral device created successfully', device });
    }
    catch (error) {
        console.error('Error creating peripheral device:', error);
        res.status(500).send('Internal Server Error');
    }
});
exports.createPeripheralDevice = createPeripheralDevice;
// Update a peripheral device by ID
const updatePeripheralDevice = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { uid, vendor, status, gatewayId } = req.body;
        console.log('Received request to update device. ID:', id, 'Gateway ID:', gatewayId);
        const device = yield peripheralDevice_1.default.findByPk(id);
        if (!device) {
            console.log('Peripheral device not found');
            res.status(404).send('Peripheral device not found');
            return;
        }
        const gateway = yield gateway_1.default.findByPk(gatewayId);
        if (!gateway) {
            console.log('Gateway not found');
            res.status(404).send('Gateway not found');
            return;
        }
        // Check if the gateway has less than 10 devices
        const deviceCount = yield peripheralDevice_1.default.count({
            where: { gatewayId, id: { [sequelize_1.Op.ne]: device.id } },
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
        yield device.save();
        res.json({ message: 'Peripheral device updated successfully', device });
    }
    catch (error) {
        console.error('Error updating peripheral device:', error);
        res.status(500).send('Internal Server Error');
    }
});
exports.updatePeripheralDevice = updatePeripheralDevice;
// Delete a peripheral device by ID
const deletePeripheralDevice = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const device = yield peripheralDevice_1.default.findByPk(id);
        if (!device) {
            res.status(404).send('Peripheral device not found');
            return;
        }
        yield device.destroy();
        res.json({ message: 'Peripheral device deleted successfully' });
    }
    catch (error) {
        console.error('Error deleting peripheral device:', error);
        res.status(500).send('Internal Server Error');
    }
});
exports.deletePeripheralDevice = deletePeripheralDevice;
