const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const Employee = require('../models/Employee');

router.get('/employees', async (req, res) => {
  try {
    const employees = await Employee.find();
    res.status(200).json(employees);
  } catch (error) {
    console.error('Error fetching employees:', error);
    res.status(500).json({ message: 'Server error, please try again later.' });
  }
});

router.post('/employees', async (req, res) => {
  const { first_name, last_name, email, position, salary, date_of_joining, department } = req.body;

  try {
    const existingEmployee = await Employee.findOne({ email });
    if (existingEmployee) {
      return res.status(400).json({ message: 'Email already in use' });
    }

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
      date_of_joining: parsedDate,
      department
    });

    await employee.save();
    res.status(201).json({ message: 'Employee created successfully', employee_id: employee._id });
  } catch (error) {
    console.error('Error creating employee:', error);
    res.status(500).json({ message: 'Server error, please try again later.' });
  }
});

router.get('/employees/:id', async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: 'Invalid employee ID' });
  }

  try {
    const employee = await Employee.findById(id);
    if (!employee) {
      return res.status(404).json({ message: 'Employee not found' });
    }
    res.status(200).json(employee);
  } catch (error) {
    console.error('Error fetching employee:', error);
    res.status(500).json({ message: 'Server error, please try again later.' });
  }
});

router.put('/employees/:id', async (req, res) => {
  const { id } = req.params;
  const { position, salary } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: 'Invalid employee ID' });
  }

  try {
    const employee = await Employee.findByIdAndUpdate(
      id,
      { position, salary },
      { new: true, runValidators: true }
    );

    if (!employee) {
      return res.status(404).json({ message: 'Employee not found' });
    }

    res.status(200).json({ message: 'Employee updated successfully' });
  } catch (error) {
    console.error('Error updating employee:', error);
    res.status(500).json({ message: 'Server error, please try again later.' });
  }
});

router.delete('/employees/:id', async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: 'Invalid employee ID' });
  }

  try {
    const employee = await Employee.findByIdAndDelete(id);
    if (!employee) {
      return res.status(404).json({ message: 'Employee not found' });
    }
    res.status(200).json({ message: 'Employee deleted successfully' });
  } catch (error) {
    console.error('Error deleting employee:', error);
    res.status(500).json({ message: 'Server error, please try again later.' });
  }
});

module.exports = router;
