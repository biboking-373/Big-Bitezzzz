const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// User Registration
router.post('/register', async (req, res) => {
  try {
    // Log the incoming request body for debugging
    console.log('Register Request Body:', req.body);

    const { username, email, password } = req.body;

    // Validate input
    if (!username || !email || !password) {
      return res.status(400).json({ 
        message: 'Please provide username, email, and password' 
      });
    }

    // Check if user already exists
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user
    user = new User({
      username,
      email,
      password: hashedPassword
    });

    // Save user to database
    await user.save();

    // Create JWT Payload
    const payload = {
      user: {
        id: user.id
      }
    };

    // Generate JWT Token
    jwt.sign(
      payload, 
      process.env.JWT_SECRET, 
      { expiresIn: '1h' }, 
      (err, token) => {
        if (err) {
          console.error('JWT Sign Error:', err);
          return res.status(500).json({ message: 'Error generating token', error: err });
        }
        res.json({ token });
      }
    );
  } catch (error) {
    // Log the full error for debugging
    console.error('Registration Error:', error);
    
    // Check for validation errors
    if (error.name === 'ValidationError') {
      return res.status(400).json({ 
        message: 'Validation Error', 
        errors: Object.values(error.errors).map(err => err.message) 
      });
    }

    // Send more detailed error response
    res.status(500).json({ 
      message: 'Server error', 
      error: error.message 
    });
  }
});


module.exports = router;