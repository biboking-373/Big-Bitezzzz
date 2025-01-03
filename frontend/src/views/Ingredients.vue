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
          <div 
            v-if="isLoggedIn && recipe.userId === currentUserId" 
            class="recipe-actions"
          >
            <router-link 
              :to="`/edit-recipe/${recipe.id}`" 
              class="edit-btn"
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
    const savedRecipes = localStorage.getItem('recipes')
    if (savedRecipes) {
      this.recipes = JSON.parse(savedRecipes)
    }
  },
  methods: {
    addRecipe(recipe) {
      // Ensure user is logged in
      if (!this.isLoggedIn) {
        this.$router.push('/login')
        return
      }

      // Add recipe with user ID
      recipe.userId = this.currentUserId
      this.recipes.push(recipe)
      localStorage.setItem('recipes', JSON.stringify(this.recipes))
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
  transition: transform 0.3s ease;
}

.recipe-image {
  width: 100%;
  height: 250px;
  object-fit: cover;
}

.recipe-details {
  padding: 15px;
}

.recipe-category {
  color: #666;
  font-style: italic;
}

.recipe-description {
  color: #333;
  margin-bottom: 10px;
}

.recipe-actions {
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
}

.edit-btn {
  background-color: #2196F3;
  color: white;
  text-decoration: none;
  padding: 5px 10px;
  border-radius: 3px;
}

.no-recipes {
  text-align: center;
  color: #666;
  margin-top: 50px;
  font-size: 1.2em;
}
</style>