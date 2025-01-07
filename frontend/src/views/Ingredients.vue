<template>
    <div class="ingredients-container">
      <div class="ingredients-header">
        <h1>Explore Recipes</h1>
        
        <div class="search-filter-section">
          <input 
            v-model="searchQuery"
            placeholder="Search recipes..." 
            class="search-input"
          >
          
          <div class="category-management">
            <select 
              v-model="selectedCategory" 
              class="category-select"
            >
              <option value="">All Categories</option>
              <option 
                v-for="category in categories" 
                :key="category" 
                :value="category"
              >
                {{ category }}
              </option>
            </select>
          </div>
  
          <router-link 
            v-if="isLoggedIn"
            to="/add-recipe" 
            class="add-recipe-btn"
          >
            Add New Recipe
          </router-link>
          <div v-else class="login-prompt">
            <p>Please log in to add recipes</p>
            <router-link to="/login" class="login-btn">
              Login
            </router-link>
          </div>
        </div>
      </div>
  
      <div v-if="recipes.length === 0" class="no-recipes">
        <p>No recipes added yet. {{ isLoggedIn ? 'Start by adding your first recipe!' : 'Log in to add recipes.' }}</p>
      </div>
  
      <div v-else class="recipes-grid">
        <div 
          v-for="recipe in filteredRecipes" 
          :key="recipe.id" 
          class="recipe-card"
          @click="viewRecipeDetails(recipe)"
          role="button"
          tabindex="0"
          @keydown.enter="viewRecipeDetails(recipe)"
        >
          <img 
            :src="recipe.image" 
            :alt="recipe.name" 
            class="recipe-image"
          >
          <div class="recipe-details">
            <h3>{{ recipe.name }}</h3>
            <p class="recipe-category">{{ recipe.category }}</p>
            <p class="recipe-description">{{ recipe.description }}</p>
            <div class="recipe-additional-info">
              <span class="recipe-difficulty">
                <i class="icon-difficulty"></i>
                {{ recipe.difficulty || 'Not specified' }}
              </span>
              <span class="recipe-time">
                <i class="icon-time"></i>
                {{ recipe.cookingTime ? `${recipe.cookingTime} mins` : 'Time not specified' }}
              </span>
            </div>
            <div 
              v-if="isLoggedIn && recipe.userId === currentUserId" 
              class="recipe-actions"
            >
              <router-link 
                :to="`/edit-recipe/${recipe.id}`" 
                class="edit-btn"
                @click.stop
              >
                Edit
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'Ingredients',
    data() {
      return {
        searchQuery: '',
        selectedCategory: '',
        categories: [
          'Black Forest Cake', 
          'Tiramisu', 
          'Cheese Cake', 
          'Fruit Cake', 
          'Chocolate Cake',
          'Carrot Cake'
        ],
        recipes: []
      }
    },
    computed: {
      isLoggedIn() {
        return localStorage.getItem('token') !== null
      },
      currentUserId() {
        return localStorage.getItem('userId')
      },
      filteredRecipes() {
        return this.recipes.filter(recipe => {
          const matchesSearch = recipe.name.toLowerCase().includes(this.searchQuery.toLowerCase())
          const matchesCategory = !this.selectedCategory || recipe.category === this.selectedCategory
          return matchesSearch && matchesCategory
        })
      }
    },
    created() {
      // Load recipes from local storage
      this.loadRecipes()
    },
    methods: {
      loadRecipes() {
        const savedRecipes = localStorage.getItem('recipes')
        if (savedRecipes) {
          try {
            this.recipes = JSON.parse(savedRecipes)
          } catch (error) {
            console.error('Error parsing recipes:', error)
            this.recipes = []
          }
        }
      },
      addRecipe(recipe) {
        // Ensure user is logged in
        if (!this.isLoggedIn) {
          this.$router.push('/login')
          return
        }
  
        // Generate a unique ID using timestamp and random number
        recipe.id = `recipe_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
  
        // Add recipe with user ID
        recipe.userId = this.currentUserId
        this.recipes.push(recipe)
        localStorage.setItem('recipes', JSON.stringify(this.recipes))
      },
      viewRecipeDetails(recipe) {
        console.log('Navigating to recipe:', recipe)
        // Navigate to recipe details page or open a modal
        this.$router.push({ 
          name: 'RecipeDetails', 
          params: { recipeId: recipe.id }
        })
      }
    }
  }
  </script>
  
  <style scoped>
  .ingredients-container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
  }
  
  .ingredients-header {
    text-align: center;
    margin-bottom: 30px;
  }
  
  .search-filter-section {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
  }
  
  .search-input, .category-select {
    padding: 10px;
    width: 250px;
    border: 1px solid #ddd;
    border-radius: 5px;
  }
  
  .add-recipe-btn, .login-btn {
    padding: 10px 20px;
    background-color: #4CAF50;
    color: white;
    text-decoration: none;
    border-radius: 5px;
  }
  
  .login-prompt {
    text-align: center;
  }
  
  .recipes-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 20px;
  }
  
  .recipe-card {
    border: 1px solid #ddd;
    border-radius: 8px;
    overflow: hidden;
    cursor: pointer;
    transition: transform 0.3s ease;
  }
  
  .recipe-card:hover {
    transform: scale(1.05);
  }
  
  .recipe-image {
    width: 100%;
    height: 250px;
    object-fit: cover;
  }
  
  .recipe-details {
    padding: 15px;
  }
  
  .recipe-additional-info {
    display: flex;
    justify-content: space-between;
    margin-top: 10px;
    color: #666;
  }
  </style>