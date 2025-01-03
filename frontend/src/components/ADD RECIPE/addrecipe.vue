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
              v-model="recipe.ingredients[index]" 
              placeholder="Ingredient"
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
          <label>Recipe Image</label>
          <input 
            type="file" 
            @change="handleImageUpload"
            accept="image/*"
          >
          <div v-if="recipe.image" class="image-preview">
            <img 
              :src="recipe.image" 
              alt="Recipe Preview"
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
        ingredients: [''],
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
      isEditing: false
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
  methods: {
    addIngredient() {
      this.recipe.ingredients.push('')
    },
    removeIngredient(index) {
      this.recipe.ingredients.splice(index, 1)
    },
    handleImageUpload(event) {
      const file = event.target.files[0]
      if (file) {
        this.recipe.image = URL.createObjectURL(file)
      }
    },
    loadRecipe(id) {
      // Load recipe from local storage
      const recipes = JSON.parse(localStorage.getItem('recipes') || '[]')
      const foundRecipe = recipes.find(r => 
        r.id === parseInt(id) && r.userId === this.currentUserId
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
      // Validate form
      if (!this.recipe.name || !this.recipe.category) {
        alert('Please fill in all required fields')
        return
      }

      // Get existing recipes
      const recipes = JSON.parse(localStorage.getItem('recipes') || '[]')
      
      if (this.isEditing) {
        // Update existing recipe
        const index = recipes.findIndex(r => 
          r.id === this.recipe.id && r.userId === this.currentUserId
        )
        if (index !== -1) {
          recipes[index] = { ...this.recipe }
        }
      } else {
        // Add new recipe
        this.recipe.id = recipes.length > 0 
          ? Math.max(...recipes.map(r => r.id)) + 1 
          : 1
        recipes.push({ ...this.recipe })
      }

      // Save to local storage
      localStorage.setItem('recipes', JSON.stringify(recipes))
      
      // Navigate back to ingredients page
      this.$router.push('/ingredients')
    },
    deleteRecipe() {
      if (confirm('Are you sure you want to delete this recipe?')) {
        const recipes = JSON.parse(localStorage.getItem('recipes') || '[]')
        const filteredRecipes = recipes.filter(r => 
          r.id !== this.recipe.id || r.userId !== this.currentUserId
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

.login-required {
  text-align: center;
  padding: 50px;
  background-color: #f4f4f4;
  border-radius: 10px;
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

.recipe-form {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.form-group input, 
.form-group select, 
.form-group textarea {
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
}

.ingredients-section {
  background-color: #f9f9f9;
  padding: 15px;
  border-radius: 5px;
}

.ingredient-input {
  display: flex;
  gap: 10px;
  margin-bottom: 10px;
}

.ingredient-input input {
  flex-grow: 1;
}

.remove-ingredient-btn {
  background-color: #f44336;
  color: white;
  border: none;
  padding: 5px 10px;
  border-radius: 3px;
}

.add-ingredient-btn {
  background-color: #4CAF50;
  color: white;
  border: none;
  padding: 10px;
  border-radius: 5px;
}

.image-preview img {
  max-width: 300px;
  max-height: 300px;
  object-fit: cover;
  border-radius: 5px;
  margin-top: 10px;
}

.form-actions {
  display: flex;
  gap: 10px;
  margin-top: 20px;
}

.save-btn {
  background-color: #4CAF50;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
}

.delete-btn {
  background-color: #f44336;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
}

.cancel-btn {
  background-color: #ddd;
  color: black;
  text-decoration: none;
  padding: 10px 20px;
  border-radius: 5px;
}
</style>