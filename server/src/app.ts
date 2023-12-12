// src/app.ts
import express, { Request, Response, NextFunction } from 'express';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import sequelize from '../src/config/database';
import dotenv from 'dotenv';

// Import your routes
import gatewayRoutes from './routes/gatewayRoute';
import peripheralDeviceRoutes from './routes/peripheralDeviceRoute';

// Load environment variables from .env file
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Define your routes here
app.get('/', (req: Request, res: Response) => {
  res.send('Hello, Express with TypeScript!');
});

// Use your routes
app.use(gatewayRoutes);
app.use(peripheralDeviceRoutes);

sequelize
  .sync({ })
  .then(() => {
    console.log('Database connected Successfully');
  })
  .catch((error: any) => {
    console.error('Database sync error:', error);
  });

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
