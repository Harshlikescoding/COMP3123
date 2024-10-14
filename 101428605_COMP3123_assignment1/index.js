require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./routes/user');
const employeeRoutes = require('./routes/employee'); 
const path = require('path');
const app = express();

app.use(express.json());

mongoose.connect('mongodb://localhost:27017/comp3123_assignment1')
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('Error connecting to MongoDB:', err));

app.use('/api/v1/user', userRoutes);
app.use('/api/v1/emp', employeeRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

app.get('/signup', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html')); 
});
