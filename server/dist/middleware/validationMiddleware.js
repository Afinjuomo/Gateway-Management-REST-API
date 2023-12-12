"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateCreatePeripheralDevice = void 0;
// validationMiddleware.ts
const express_validator_1 = require("express-validator");
// Validation middleware for the createPeripheralDevice route
exports.validateCreatePeripheralDevice = [
    (0, express_validator_1.body)('uid').isNumeric().notEmpty(),
    (0, express_validator_1.body)('vendor').isString().notEmpty(),
    (0, express_validator_1.body)('status').isIn(['online', 'offline']).notEmpty(),
    (0, express_validator_1.body)('gatewayId').isNumeric().notEmpty(),
    // Add more validations as needed
    // Custom validation error handling
    (req, res, next) => {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    },
];
// Add similar validation middleware for other routes as needed
