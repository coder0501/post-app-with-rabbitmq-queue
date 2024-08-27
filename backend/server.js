// "use strict";
const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const connectToDB = require('./config/db.ts');
const { connectRabbitMQ } = require('./services/rabbitmqService.ts');
const postRoutes = require('./routes/postRoutes');
const authRoutes = require('./routes/authRoutes');
const app = express();
app.use(express.json());

// Connect to MongoDB
connectToDB();

// Connect to RabbitMQ
connectRabbitMQ();

// Routes
app.use('/api/posts', postRoutes);
app.use('/api/auth', authRoutes);
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));





