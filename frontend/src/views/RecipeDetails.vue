<template>
  <div class="recipe-details-container" v-if="recipe">
    <div class="recipe-header">
      <img :src="recipe.image" :alt="recipe.name" class="recipe-main-image">
      <div class="recipe-header-info">
        <h1>{{ recipe.name }}</h1>
        <div class="recipe-meta">
          <span class="recipe-category">
            <i class="icon-category"></i> {{ recipe.category }}
          </span>
          <span class="recipe-difficulty">
            <i class="icon-difficulty"></i> {{ recipe.difficulty || 'Not specified' }}
          </span>
          <span class="recipe-time">
            <i class="icon-time"></i> {{ recipe.cookingTime ? `${recipe.cookingTime} mins` : 'Time not specified' }}
          </span>
        </div>
      </div>
    </div>

    <div class="recipe-description">
      <h2>Description</h2>
      <p>{{ recipe.description }}</p>
    </div>

    <div class="recipe-ingredients">
      <h2>Ingredients</h2>
      <ul>
        <li v-for="(ingredient, index) in recipe.ingredients" :key="index">
          {{ ingredient.amount }} {{ ingredient.unit }} {{ ingredient.name }}
        </li>
      </ul>
    </div>

    <div class="recipe-instructions">
      <h2>Instructions</h2>
      <ol>
        <li v-for="(step, index) in recipe.instructions" :key="index">
          {{ step }}
        </li>
      </ol>
    </div>

    <div class="recipe-nutrition" v-if="recipe.nutrition">
      <h2>Nutrition Information</h2>
      <div class="nutrition-grid">
        <div class="nutrition-item">
          <span class="nutrition-label">Calories</span>
          <span class="nutrition-value">{{ recipe.nutrition.calories }}</span>
        </div>
        <div class="nutrition-item">
          <span class="nutrition-label">Protein</span>
          <span class="nutrition-value">{{ recipe.nutrition.protein }}g</span>
        </div>
        <div class="nutrition-item">
          <span class="nutrition-label">Carbs</span>
          <span class="nutrition-value">{{ recipe.nutrition.carbs }}g</span>
        </div>
        <div class="nutrition-item">
          <span class="nutrition-label">Fat</span>
          <span class="nutrition-value">{{ recipe.nutrition.fat }}g</span>
        </div>
      </div>
    </div>

    <div class="recipe-actions" v-if="isOwner">
      <router-link 
        :to="`/edit-recipe/${recipe.id}`" 
        class="edit-btn"
      >
        Edit Recipe
      </router-link>
      <button @click="deleteRecipe" class="delete-btn">
        Delete Recipe
      </button>
    </div>
  </div>
  <div v-else class="recipe-not-found">
    <p>Recipe not found</p>
    <router-link to="/ingredients" class="back-btn">
      Back to Recipes
    </router-link>
  </div>
</template>

<script>
export default {
  name: 'RecipeDetails',
  data() {
    return {
      recipe: null
    }
  },
  computed: {
    isOwner() {
      return this.recipe && 
             localStorage.getItem('token') && 
             this.recipe.userId === localStorage.getItem('userId')
    }
  },
  created() {
    this.fetchRecipeDetails()
  },
  methods: {
    fetchRecipeDetails() {
      // Retrieve recipes from local storage
      const savedRecipes = localStorage.getItem('recipes')
      if (savedRecipes) {
        const recipes = JSON.parse(savedRecipes)
        // Convert both IDs to strings for consistent comparison
        this.recipe = recipes.find(r => String(r.id) === String(this.$route.params.recipeId))
      }

      // If recipe is not found, log for debugging
      if (!this.recipe) {
        console.error('Recipe not found:', this.$route.params.recipeId)
        console.error('Available recipes:', JSON.parse(localStorage.getItem('recipes')))
      } else {
        // Additional logging for ingredients
        console.log('Recipe found:', this.recipe)
        console.log('Ingredients:', this.recipe.ingredients)
      }
    },
    deleteRecipe() {
      if (confirm('Are you sure you want to delete this recipe?')) {
        const savedRecipes = localStorage.getItem('recipes')
        if (savedRecipes) {
          let recipes = JSON.parse(savedRecipes)
          recipes = recipes.filter(r => r.id !== this.recipe.id)
          localStorage.setItem('recipes', JSON.stringify(recipes))
          this.$router.push('/ingredients')
        }
      }
    }
  }
}
</script>

<style scoped>
.recipe-details-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 10px;
}

.recipe-header {
  display: flex;
  align-items: center;
  margin-bottom: 30px;
}

.recipe-main-image {
  width: 300px;
  height: 300px;
  object-fit: cover;
  border-radius: 10px;
  margin-right: 30px;
}

.recipe-header-info h1 {
  margin-bottom: 15px;
  color: #333;
}

.recipe-meta {
  display: flex;
  gap: 20px;
  color: #666;
}

.recipe-meta span {
  display: flex;
  align-items: center;
}

.recipe-meta i {
  margin-right: 5px;
}

.recipe-description, 
.recipe-ingredients, 
.recipe-instructions, 
.recipe-nutrition {
  margin-bottom: 30px;
}

.recipe-ingredients ul,
.recipe-instructions ol {
  padding-left: 30px;
}

.nutrition-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 15px;
}

.nutrition-item {
  background-color: #fff;
  padding: 15px;
  border-radius: 5px;
  text-align: center;
  box-shadow: 0 2px 5px rgba(0,0,0,0.1);
}

.nutrition-label {
  display: block;
  color: #666;
  margin-bottom: 5px;
}

.nutrition-value {
  font-weight: bold;
  color: #333;
}

.recipe-actions {
  display: flex;
  justify-content: space-between;
}

.edit-btn, .delete-btn, .back-btn {
  padding: 10px 20px;
  border-radius: 5px;
  text-decoration: none;
  color: white;
}

.edit-btn {
  background-color: #2196F3;
}

.delete-btn {
  background-color: #f44336;
}

.back-btn {
  background-color: #4CAF50;
}

.recipe-not-found {
  text-align: center;
  margin-top: 50px;
}
</style>