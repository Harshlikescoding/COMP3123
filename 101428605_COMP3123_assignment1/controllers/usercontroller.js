const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator'); // Import validationResult
const User = require('../models/User');

exports.signup = async (req, res) => {
  // Validate request
  const errors = validationResult(req); // Check for validation errors
  if (!errors.isEmpty()) {
    return res.status(400).json({ status: false, errors: errors.array() });
  }

  const { username, email, password } = req.body;

  // Check if password is defined
  if (!password) {
    return res.status(400).json({ status: false, message: 'Password is required' });
  }

  try {
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const user = new User({ username, email, password: hashedPassword });
    await user.save();

    // Respond with success
    res.status(201).json({ message: 'User created successfully', user_id: user._id });
  } catch (error) {
    // Handle potential errors (like MongoDB errors)
    console.error(error);
    res.status(500).json({ status: false, message: 'Server error, please try again later.' });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Invalid email or password' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid email or password' });

    res.status(200).json({ message: 'Login successful' });
  } catch (error) {
    // Handle potential errors (like MongoDB errors)
    console.error(error);
    res.status(500).json({ status: false, message: 'Server error, please try again later.' });
  }
};
