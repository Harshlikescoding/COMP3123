const Employee = require('../models/Employee');

exports.getEmployees = async (req, res) => {
  const employees = await Employee.find();
  res.status(200).json(employees);
};

exports.createEmployee = async (req, res) => {
  const employee = new Employee(req.body);
  await employee.save();
  res.status(201).json({ message: 'Employee created successfully', employee_id: employee._id });
};

exports.getEmployeeById = async (req, res) => {
  const employee = await Employee.findById(req.params.eid);
  res.status(200).json(employee);
};

exports.updateEmployee = async (req, res) => {
  await Employee.findByIdAndUpdate(req.params.eid, req.body);
  res.status(200).json({ message: 'Employee details updated successfully' });
};

exports.deleteEmployee = async (req, res) => {
  await Employee.findByIdAndDelete(req.query.eid);
  res.status(204).json({ message: 'Employee deleted successfully' });
};
