const express = require('express');
const mongoose = require('mongoose');

const app = express();
app.use(express.json());

const userRoutes = require('./routes/user');
const employeeRoutes = require('./routes/employee');

app.use('/api/v1/user', userRoutes);
app.use('/api/v1/emp', employeeRoutes);

module.exports = app;
