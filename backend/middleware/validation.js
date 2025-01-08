const { body, validationResult } = require('express-validator');

// Validation middleware for user registration
const registerValidation = [
  body('username')
    .trim()
    .isLength({ min: 3 }).withMessage('Username must be at least 3 characters long')
    .matches(/^[a-zA-Z0-9_]+$/).withMessage('Username can only contain letters, numbers, and underscores'),
  
  body('email')
    .trim()
    .isEmail().withMessage('Please provide a valid email address')
    .normalizeEmail(),
  
  body('password')
    .isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
    .matches(/\d/).withMessage('Password must contain a number')
];

// Validation middleware for recipe creation
const recipeValidation = [
  body('name')
    .trim()
    .isLength({ min: 2 }).withMessage('Recipe name must be at least 2 characters long'),
  
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
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

module.exports = {
  registerValidation,
  recipeValidation,
  validate
};