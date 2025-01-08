const { body, validationResult } = require('express-validator');
const User = require('../models/User');

// Validation middleware for user registration
const registerValidation = [
  body('username')
    .trim()
    .isLength({ min: 3, max: 20 }).withMessage('Username must be between 3 and 20 characters long')
    .matches(/^[a-zA-Z0-9_]+$/).withMessage('Username can only contain letters, numbers, and underscores')
    .custom(async (username) => {
      // Check if username already exists
      const existingUser = await User.findOne({ username });
      if (existingUser) {
        throw new Error('Username is already in use');
      }
      return true;
    }),
  
  body('email')
    .trim()
    .isEmail().withMessage('Please provide a valid email address')
    .normalizeEmail()
    .custom(async (email) => {
      // Check if email already exists
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        throw new Error('Email is already in use');
      }
      return true;
    }),
  
  body('password')
    .isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
    .matches(/\d/).withMessage('Password must contain a number')
    .matches(/[A-Z]/).withMessage('Password must contain an uppercase letter')
    .matches(/[!@#$%^&*(),.?":{}|<>]/).withMessage('Password must contain a special character')
];

// Validation middleware for recipe creation
const recipeValidation = [
  body('name')
    .trim()
    .isLength({ min: 2, max: 100 }).withMessage('Recipe name must be between 2 and 100 characters long'),
  
  body('category')
    .trim()
    .isIn(['Black Forest Cake', 'Tiramisu', 'Cheese Cake', 'Fruit Cake', 'Chocolate Cake', 'Carrot Cake'])
    .withMessage('Invalid recipe category'),
  
  body('ingredients')
    .isArray({ min: 1 }).withMessage('At least one ingredient is required')
];

// Middleware to handle validation errors
const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ 
      errors: errors.array().map(error => ({
        field: error.path,
        message: error.msg
      }))
    });
  }
  next();
};

module.exports = {
  registerValidation,
  recipeValidation,
  validate
};