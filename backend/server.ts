

import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import cors from 'cors';
import connectDB from './config/db'; // Assuming this is a default export
import { connectRabbitMQ } from './services/rabbitmqService';
import postRoutes from './routes/postRoutes';
import authRoutes from './routes/authRoutes';

const app = express();

// Use CORS middleware
app.use(cors({
  origin: 'http://localhost:5173', // Specify your frontend origin here
  methods: 'GET,POST,PUT,DELETE',
  credentials: true,
}));

app.use(express.json());

// Connect to MongoDB
connectDB();

// Connect to RabbitMQ
connectRabbitMQ();
console.log("server.ts")

// Routes
app.use('/postRoutes', postRoutes);
app.use('/authRoutes', authRoutes);
console.log("server.ts")

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));













