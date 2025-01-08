const express = require('express');
const router = express.Router();
const Recipe = require('../models/Recipe');
const auth = require('../middleware/auth');
const multer = require('multer');
const path = require('path');
const { recipeValidation, validate } = require('../middleware/validation');


// Configure multer for image upload
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, 'uploads/recipes/');
  },
  filename: function(req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});
const upload = multer({ storage: storage });

// @route   POST /api/recipes
// @desc    Create a new recipe
// @access  Private
router.post('/', [auth, upload.single('image')], async (req, res) => {
  try {
    const { 
      name, 
      description, 
      category, 
      ingredients, 
      instructions 
    } = req.body;

    const newRecipe = new Recipe({
      name,
      description,
      category,
      ingredients: JSON.parse(ingredients),
      instructions: JSON.parse(instructions),
      image: req.file ? req.file.path : null,
      user: req.user.id
    });

    const recipe = await newRecipe.save();
    res.json(recipe);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET /api/recipes
// @desc    Get all recipes for logged in user
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    const recipes = await Recipe.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.json(recipes);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET /api/recipes/:id
// @desc    Get recipe by ID
// @access  Private
router.get('/:id', auth, async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);
    
    if (!recipe) {
      return res.status(404).json({ msg: 'Recipe not found' });
    }

    // Ensure user owns the recipe
    if (recipe.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorized' });
    }

    res.json(recipe);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   PUT /api/recipes/:id
// @desc    Update a recipe
// @access  Private
router.put('/:id', [auth, upload.single('image')], async (req, res) => {
  try {
    const { 
      name, 
      description, 
      category, 
      ingredients, 
      instructions 
    } = req.body;

    let recipe = await Recipe.findById(req.params.id);

    if (!recipe) {
      return res.status(404).json({ msg: 'Recipe not found' });
    }

    // Ensure user owns the recipe
    if (recipe.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorized' });
    }

    // Update recipe fields
    recipe.name = name;
    recipe.description = description;
    recipe.category = category;
    recipe.ingredients = JSON.parse(ingredients);
    recipe.instructions = JSON.parse(instructions);
    
    // Update image if new file uploaded
    if (req.file) {
      recipe.image = req.file.path;
    }

    await recipe.save();
    res.json(recipe);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   DELETE /api/recipes/:id
// @desc    Delete a recipe
// @access  Private
router.delete('/:id', auth, async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);

    if (!recipe) {
      return res.status(404).json({ msg: 'Recipe not found' });
    }

    // Ensure user owns the recipe
    if (recipe.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorized' });
    }

    await recipe.remove();
    res.json({ msg: 'Recipe removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;