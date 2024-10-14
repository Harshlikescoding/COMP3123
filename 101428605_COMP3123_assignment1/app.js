const express = require('express');
const mongoose = require('mongoose');

// Initialize express app
const app = express();

// Middleware to parse JSON
app.use(express.json());

// Import routes
const userRoutes = require('./routes/user');
const employeeRoutes = require('./routes/employee');

// Use routes
app.use('/api/v1/user', userRoutes);
app.use('/api/v1/emp', employeeRoutes);

// Export the app object (without starting the server)
module.exports = app;
