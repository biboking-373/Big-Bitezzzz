<template>
  <div class="account-container">
    <div class="account-header">
      <h2>{{ isAuthenticated ? `Welcome, ${username}!` : 'My Account' }}</h2>
      <div v-if="isAuthenticated" class="auth-actions">
        <button 
          @click="handleLogout" 
          class="btn btn-danger logout-btn"
        >
          Logout
        </button>
      </div>
      <div v-else class="auth-actions">
        <router-link to="/login" class="btn btn-primary login-btn">
          Login
        </router-link>
        <router-link to="/register" class="btn btn-secondary register-btn ml-2">
          Register
        </router-link>
      </div>
    </div>

    <div v-if="isAuthenticated" class="account-content">
      <section class="user-profile">
        <h3>Profile Details</h3>
        <div class="profile-info">
          <p><strong>Username:</strong> {{ username }}</p>
          <p><strong>Email:</strong> {{ email }}</p>
        </div>
      </section>

      <section class="bookmarked-recipes">
        <h3>Bookmarked Recipes</h3>
        <div v-if="bookmarkedRecipes.length === 0" class="no-bookmarks">
          <p>You haven't bookmarked any recipes yet.</p>
          <router-link to="/ingredients" class="btn btn-primary">
            Browse Recipes
          </router-link>
        </div>
        <div v-else class="recipes-grid">
          <div 
            v-for="recipe in bookmarkedRecipes" 
            :key="recipe.id" 
            class="recipe-card"
          >
            <img 
              :src="recipe.image" 
              :alt="recipe.title"
            >
            <div class="recipe-info">
              <h4>{{ recipe.title }}</h4>
              <p>{{ recipe.description }}</p>
              <div class="recipe-actions">
                <button 
                  @click="viewRecipeDetails(recipe.id)" 
                  class="btn btn-sm btn-primary"
                >
                  View Details
                </button>
                <button 
                  @click="removeBookmark(recipe.id)" 
                  class="btn btn-sm btn-danger"
                >
                  Remove Bookmark
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
    <div v-else class="guest-content">
      <div class="guest-message">
        <h3>Explore Your Culinary Journey</h3>
        <p>Create an account to save your favorite recipes and personalize your experience.</p>
        <div class="guest-actions">
          <router-link to="/login" class="btn btn-primary">
            Login
          </router-link>
          <router-link to="/register" class="btn btn-secondary ml-2">
            Register
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, ref, onMounted } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

export default {
  name: 'Account',
  setup() {
    const store = useStore()
    const router = useRouter()

    // Bookmarked recipes will now start as an empty array
    const bookmarkedRecipes = ref([])

    const isAuthenticated = computed(() => 
      store.getters['auth/isAuthenticated']
    )

    const username = computed(() => 
      store.getters['auth/currentUser']?.username || 'User'
    )

    const email = computed(() => 
      store.getters['auth/currentUser']?.email || 'No email'
    )

    // Method to add a bookmark
    const addBookmark = (recipe) => {
      // Check if recipe is already bookmarked
      const isAlreadyBookmarked = bookmarkedRecipes.value.some(
        bookmarked => bookmarked.id === recipe.id
      )

      if (!isAlreadyBookmarked) {
        bookmarkedRecipes.value.push(recipe)
        localStorage.setItem('bookmarkedRecipes', JSON.stringify(bookmarkedRecipes.value))
      }
    }

    const handleLogout = () => {
      store.dispatch('auth/logout')
      router.push('/login')
    }

    const viewRecipeDetails = (recipeId) => {
      router.push(`/recipe/${recipeId}`)
    }

    const removeBookmark = (recipeId) => {
      bookmarkedRecipes.value = bookmarkedRecipes.value.filter(
        recipe => recipe.id !== recipeId
      )
      localStorage.setItem('bookmarkedRecipes', JSON.stringify(bookmarkedRecipes.value))
    }

    onMounted(() => {
      const savedBookmarks = localStorage.getItem('bookmarkedRecipes')
      if (savedBookmarks) {
        try {
          bookmarkedRecipes.value = JSON.parse(savedBookmarks)
        } catch (error) {
          console.error('Error parsing bookmarks:', error)
          bookmarkedRecipes.value = []
        }
      }
    })

    return {
      bookmarkedRecipes,
      isAuthenticated,
      username,
      email,
      addBookmark,
      handleLogout,
      viewRecipeDetails,
      removeBookmark
    }
  }
}
</script>

<style scoped>
.account-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.account-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
}

.auth-actions {
  display: flex;
  align-items: center;
}

.logout-btn, .login-btn, .register-btn {
  margin-left: 10px;
}

.guest-content {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 400px;
  text-align: center;
  background-color: #f8f9fa;
  border-radius: 8px;
  padding: 30px;
}

.guest-message {
  max-width: 500px;
}

.guest-actions {
  margin-top: 20px;
}

.user-profile {
  background-color: #f8f9fa;
  padding: 20px;
  border-radius: 8px;
  margin-bottom: 30px;
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

.recipe-card:hover {
  transform: scale(1.05);
}

.recipe-card img {
  width: 100%;
  height: 250px;
  object-fit: cover;
}

.recipe-info {
  padding: 15px;
}

.recipe-actions {
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
}

.no-bookmarks {
  text-align: center;
  color: #6c757d;
  margin-top: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.no-bookmarks .btn {
  margin-top: 15px;
}

.ml-2 {
  margin-left: 0.5rem;
}
</style>