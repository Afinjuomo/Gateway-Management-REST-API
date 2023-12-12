"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/app.ts
const express_1 = __importDefault(require("express"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const morgan_1 = __importDefault(require("morgan"));
const database_1 = __importDefault(require("../src/config/database"));
const dotenv_1 = __importDefault(require("dotenv"));
// Import your routes
const gatewayRoute_1 = __importDefault(require("./routes/gatewayRoute"));
const peripheralDeviceRoute_1 = __importDefault(require("./routes/peripheralDeviceRoute"));
// Load environment variables from .env file
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
app.use((0, morgan_1.default)('dev'));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use((0, cookie_parser_1.default)());
// Define your routes here
app.get('/', (req, res) => {
    res.send('Hello, Express with TypeScript!');
});
// Use your routes
app.use(gatewayRoute_1.default);
app.use(peripheralDeviceRoute_1.default);
database_1.default
    .sync({})
    .then(() => {
    console.log('Database connected Successfully');
})
    .catch((error) => {
    console.error('Database sync error:', error);
});
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
