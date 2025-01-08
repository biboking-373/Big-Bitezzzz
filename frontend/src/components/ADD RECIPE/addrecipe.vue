<template>
  <div class="add-recipe-container">
    <div v-if="!isLoggedIn" class="login-required">
      <h2>Login Required</h2>
      <p>You must be logged in to add or edit recipes.</p>
      <router-link to="/login" class="login-btn">
        Go to Login
      </router-link>
    </div>

    <div v-else class="recipe-form-container">
      <h1>{{ isEditing ? 'Edit Recipe' : 'Add New Recipe' }}</h1>
      
      <form @submit.prevent="saveRecipe" class="recipe-form">
        <div class="form-group">
          <label>Recipe Name</label>
          <input 
            v-model="recipe.name" 
            placeholder="Enter recipe name" 
            required
          >
        </div>

        <div class="form-group">
          <label>Category</label>
          <select 
            v-model="recipe.category" 
            required
          >
            <option value="">Select Category</option>
            <option 
              v-for="category in categories" 
              :key="category"
              :value="category"
            >
              {{ category }}
            </option>
          </select>
        </div>

        <div class="form-group">
          <label>Description</label>
          <textarea 
            v-model="recipe.description" 
            placeholder="Describe your recipe"
            rows="4"
          ></textarea>
        </div>

        <div class="form-group ingredients-section">
          <label>Ingredients</label>
          <div 
            v-for="(ingredient, index) in recipe.ingredients" 
            :key="index" 
            class="ingredient-input"
          >
            <input 
              v-model="ingredient.amount" 
              placeholder="Amount"
              class="ingredient-amount"
            >
            <input 
              v-model="ingredient.unit" 
              placeholder="Unit (cups, grams)"
              class="ingredient-unit"
            >
            <input 
              v-model="ingredient.name" 
              placeholder="Ingredient Name"
              class="ingredient-name"
            >
            <button 
              type="button" 
              @click="removeIngredient(index)"
              class="remove-ingredient-btn"
            >
              Remove
            </button>
          </div>
          <button 
            type="button" 
            @click="addIngredient"
            class="add-ingredient-btn"
          >
            Add Ingredient
          </button>
        </div>

        <div class="form-group">
          <label>Instructions</label>
          <div 
            v-for="(instruction, index) in recipe.instructions" 
            :key="index" 
            class="instruction-input"
          >
            <textarea 
              v-model="recipe.instructions[index]" 
              placeholder="Step description"
              rows="2"
            ></textarea>
            <button 
              type="button" 
              @click="removeInstruction(index)"
              class="remove-instruction-btn"
            >
              Remove
            </button>
          </div>
          <button 
            type="button" 
            @click="addInstruction"
            class="add-instruction-btn"
          >
            Add Step
          </button>
        </div>

        <div class="form-group">
          <label>Recipe Image</label>
          <input 
            type="file" 
            @change="handleImageUpload"
            accept="image/*"
            :disabled="isLoading"
          >
          <div v-if="imagePreview" class="image-preview">
            <img 
              :src="imagePreview" 
              alt="Recipe Preview"
              @error="handleImageError"
            >
          </div>
        </div>

        <div class="form-actions">
          <button 
            type="submit" 
            class="save-btn"
          >
            {{ isEditing ? 'Update Recipe' : 'Save Recipe' }}
          </button>
          
          <button 
            v-if="isEditing" 
            type="button" 
            @click="deleteRecipe" 
            class="delete-btn"
          >
            Delete Recipe
          </button>
          
          <router-link 
            to="/ingredients" 
            class="cancel-btn"
          >
            Cancel
          </router-link>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AddRecipe',
  data() {
    return {
      recipe: {
        id: null,
        name: '',
        category: '',
        description: '',
        ingredients: [{ amount: '', unit: '', name: '' }],
        instructions: [''],
        image: null,
        userId: null
      },
      categories: [
        'Black Forest Cake', 
        'Tiramisu', 
        'Cheese Cake', 
        'Fruit Cake', 
        'Chocolate Cake',
        'Carrot Cake'
      ],
      isEditing: false,
      isLoading: false,
      imagePreview: null
    }
  },
  computed: {
    isLoggedIn() {
      return localStorage.getItem('token') !== null
    },
    currentUserId() {
      return localStorage.getItem('userId')
    }
  },
  created() {
    // Ensure user is logged in
    if (!this.isLoggedIn) {
      this.$router.push('/login')
      return
    }

    // Set user ID for the recipe
    this.recipe.userId = this.currentUserId

    // Check if editing an existing recipe
    const recipeId = this.$route.params.id
    if (recipeId) {
      this.loadRecipe(recipeId)
    }
  },
  beforeUnmount() {
    // Clean up any object URLs to prevent memory leaks
    if (this.imagePreview) {
      URL.revokeObjectURL(this.imagePreview)
    }
  },
  methods: {
    addIngredient() {
      this.recipe.ingredients.push({ amount: '', unit: '', name: '' })
    },
    removeIngredient(index) {
      this.recipe.ingredients.splice(index, 1)
    },
    addInstruction() {
      this.recipe.instructions.push('')
    },
    removeInstruction(index) {
      this.recipe.instructions.splice(index, 1)
    },
    handleImageUpload(event) {
      const file = event.target.files[0]
      if (file) {
        this.imagePreview = URL.createObjectURL(file)
      }
    },
    handleImageError() {
      this.imagePreview = null
    },
    loadRecipe(id) {
      // Load recipe from local storage
      const recipes = JSON.parse(localStorage.getItem('recipes') || '[]')
      const foundRecipe = recipes.find(r => 
        String(r.id) === String(id) && r.userId === this.currentUserId
      )
      
      if (foundRecipe) {
        this.recipe = { ...foundRecipe }
        this.isEditing = true
      } else {
        // Redirect if trying to edit someone else's recipe
        this.$router.push('/ingredients')
      }
    },
    saveRecipe() {
      // Filter out empty ingredients and instructions
      this.recipe.ingredients = this.recipe.ingredients.filter(ing => ing.name.trim())
      this.recipe.instructions = this.recipe.instructions.filter(inst => inst.trim())

      // Generate unique ID if not editing
      if (!this.recipe.id) {
        this.recipe.id = `recipe_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
      }

      // Retrieve existing recipes
      const recipes = JSON.parse(localStorage.getItem('recipes') || '[]')

      if (this.isEditing) {
        // Update existing recipe
        const index = recipes.findIndex(r => 
          String(r.id) === String(this.recipe.id) && r.userId === this.currentUserId
        )
        if (index !== -1) {
          recipes[index] = { ...this.recipe }
        }
      } else {
        // Add new recipe
        recipes.push(this.recipe)
      }

      // Save to local storage
      localStorage.setItem('recipes', JSON.stringify(recipes))

      // Redirect to ingredients page
      this.$router.push('/ingredients')
    },
    deleteRecipe() {
      if (confirm('Are you sure you want to delete this recipe?')) {
        const recipes = JSON.parse(localStorage.getItem('recipes') || '[]')
        const filteredRecipes = recipes.filter(r => 
          String(r.id) !== String(this.recipe.id) || r.userId !== this.currentUserId
        )

        localStorage.setItem('recipes', JSON.stringify(filteredRecipes))
        this.$router.push('/ingredients')
      }
    }
  }
}
</script>

<style scoped>
.add-recipe-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.recipe-form-container h1 {
  text-align: center;
  margin-bottom: 30px;
}

.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  margin-bottom: 10px;
  font-weight: bold;
}

.form-group input, 
.form-group select, 
.form-group textarea {
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
}

.ingredient-input, .instruction-input {
  display: flex;
  gap: 10px;
  margin-bottom: 10px;
}

.ingredient-input input, .instruction-input textarea {
  flex-grow: 1;
}

.add-ingredient-btn, 
.add-instruction-btn, 
.remove-ingredient-btn,
.remove-instruction-btn {
  padding: 10px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.remove-ingredient-btn,
.remove-instruction-btn {
  background-color: #f44336;
}

.form-actions {
  display: flex;
  justify-content: space-between;
  margin-top: 30px;
}

.save-btn, .delete-btn, .cancel-btn {
  padding: 10px 20px;
  border-radius: 5px;
  text-decoration: none;
  cursor: pointer;
}

.save-btn {
  background-color: #4CAF50;
  color: white;
  border: none;
}

.delete-btn {
  background-color: #f44336;
  color: white;
  border: none;
}

.cancel-btn {
  background-color: #ddd;
  color: black;
}

.image-preview img {
  max-width: 300px;
  max-height: 300px;
  object-fit: cover;
  margin-top: 10px;
}

.login-required {
  text-align: center;
  padding: 50px;
}

.login-btn {
  display: inline-block;
  padding: 10px 20px;
  background-color: #4CAF50;
  color: white;
  text-decoration: none;
  border-radius: 5px;
  margin-top: 20px;
}
</style>