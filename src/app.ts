import express, { Application } from 'express';
import dotenv from 'dotenv';
import apiRoutes from './routes/api.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';

// Load environment variables (.env file)
dotenv.config();

const app: Application = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: 'http://localhost:4200',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  }),
);

// API Routes
app.use('/api', apiRoutes);

app.use(cookieParser());

// Start the Server
app.listen(PORT, () => {
  console.log(`
🚀 Server is screaming at: http://localhost:${PORT}
📂 Environment: ${process.env.NODE_ENV || 'development'}
    `);
});
