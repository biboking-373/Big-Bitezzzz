const express = require('express');
const router = express.Router();
const Recipe = require('../models/Recipe');
const auth = require('../middleware/Auth');

// Create a new recipe
router.post('/', auth, async (req, res) => {
  try {
    const newRecipe = new Recipe({
      ...req.body,
      user: req.user.id
    });

    const recipe = await newRecipe.save();
    res.json(recipe);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});

// Get all recipes
router.get('/', async (req, res) => {
  try {
    const recipes = await Recipe.find().sort({ createdAt: -1 });
    res.json(recipes);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});

// Get user's recipes
router.get('/user', auth, async (req, res) => {
  try {
    const recipes = await Recipe.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.json(recipes);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});

// Update a recipe
router.put('/:id', auth, async (req, res) => {
  try {
    let recipe = await Recipe.findById(req.params.id);

    if (!recipe) {
      return res.status(404).json({ message: 'Recipe not found' });
    }

    // Ensure user owns recipe
    if (recipe.user.toString() !== req.user.id) {
      return res.status(401).json({ message: 'User not authorized' });
    }

    recipe = await Recipe.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );

    res.json(recipe);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});

// Delete a recipe
router.delete('/:id', auth, async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);

    if (!recipe) {
      return res.status(404).json({ message: 'Recipe not found' });
    }

    // Ensure user owns recipe
    if (recipe.user.toString() !== req.user.id) {
      return res.status(401).json({ message: 'User not authorized' });
    }

    await recipe.remove();
    res.json({ message: 'Recipe removed' });
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});

module.exports = router;