const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const Employee = require('../models/Employee'); // Import the Employee model

// Fetch all employees
router.get('/employees', async (req, res) => {
  try {
    const employees = await Employee.find(); // Fetch all employee records
    res.status(200).json(employees); // Return the employees as a JSON response
  } catch (error) {
    console.error('Error fetching employees:', error);
    res.status(500).json({ message: 'Server error, please try again later.' });
  }
});

// Create a new employee
router.post('/employees', async (req, res) => {
  const { first_name, last_name, email, position, salary, date_of_joining, department } = req.body;

  try {
    // Check if an employee with the same email already exists
    const existingEmployee = await Employee.findOne({ email });
    if (existingEmployee) {
      return res.status(400).json({ message: 'Email already in use' });
    }

    // Validate the date_of_joining format
    const parsedDate = new Date(date_of_joining);
    if (isNaN(parsedDate)) {
      return res.status(400).json({ message: 'Invalid date format for date_of_joining' });
    }

    const employee = new Employee({
      first_name,
      last_name,
      email,
      position,
      salary,
      date_of_joining: parsedDate, // Ensure this is in Date format
      department
    });

    await employee.save(); // Save employee to the database
    res.status(201).json({ message: 'Employee created successfully', employee_id: employee._id });
  } catch (error) {
    console.error('Error creating employee:', error);
    res.status(500).json({ message: 'Server error, please try again later.' });
  }
});

// Fetch an employee by ID
router.get('/employees/:id', async (req, res) => {
  const { id } = req.params; // Extract the employee ID from the request parameters

  // Check if ID is a valid ObjectId
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: 'Invalid employee ID' });
  }

  try {
    const employee = await Employee.findById(id); // Find the employee by ID
    if (!employee) {
      return res.status(404).json({ message: 'Employee not found' }); // Handle case where employee is not found
    }
    res.status(200).json(employee); // Respond with the employee details
  } catch (error) {
    console.error('Error fetching employee:', error); // Log the specific error message
    res.status(500).json({ message: 'Server error, please try again later.' });
  }
});

// Update an employee by ID
router.put('/employees/:id', async (req, res) => {
  const { id } = req.params; // Extract the employee ID from the request parameters
  const { position, salary } = req.body; // Only extract the fields that need to be updated

  // Check if ID is a valid ObjectId
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: 'Invalid employee ID' });
  }

  try {
    // Find the employee by ID and update only the specified fields
    const employee = await Employee.findByIdAndUpdate(
      id,
      { position, salary }, // Update position and salary
      { new: true, runValidators: true } // Return the updated document and run validators
    );

    if (!employee) {
      return res.status(404).json({ message: 'Employee not found' });
    }

    res.status(200).json({ message: 'Employee updated successfully' }); // Respond with success message
  } catch (error) {
    console.error('Error updating employee:', error);
    res.status(500).json({ message: 'Server error, please try again later.' });
  }
});

// Delete an employee by ID
router.delete('/employees/:id', async (req, res) => {
    const { id } = req.params; // Extract the employee ID from the request parameters
  
    // Check if ID is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid employee ID' });
    }
  
    try {
      const employee = await Employee.findByIdAndDelete(id); // Delete the employee by ID
      if (!employee) {
        return res.status(404).json({ message: 'Employee not found' }); // Handle case where employee is not found
      }
      res.status(200).json({ message: 'Employee deleted successfully' }); // Respond with success message
    } catch (error) {
      console.error('Error deleting employee:', error);
      res.status(500).json({ message: 'Server error, please try again later.' });
    }
  });
  
module.exports = router; // Export the router
