const mongoose = require('mongoose');

const RecipeSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  ingredients: [{
    name: String,
    quantity: String
  }],
  instructions: {
    type: String,
    required: true
  },
  cookTime: {
    type: Number
  },
  difficulty: {
    type: String,
    enum: ['Easy', 'Medium', 'Hard']
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Recipe', RecipeSchema);