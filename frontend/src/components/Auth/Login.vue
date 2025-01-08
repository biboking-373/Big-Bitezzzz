<template>
  <div class="login-container">
    <h2>Login to Cake Tutorial Hub</h2>
    
    <!-- Error Alert -->
    <div v-if="error" class="error-alert">
      {{ error }}
    </div>
    
    <form @submit.prevent="handleLogin" class="login-form">
      <!-- Username Field -->
      <div class="form-group">
        <label for="username">Username</label>
        <input
          id="username"
          v-model="username"
          type="text"
          required
          :disabled="isLoading"
          placeholder="Enter your username"
        >
      </div>
      
      <!-- Password Field -->
      <div class="form-group">
        <label for="password">Password</label>
        <input
          id="password"
          v-model="password"
          type="password"
          required
          :disabled="isLoading"
          placeholder="Enter your password"
        >
      </div>
      
      <!-- Submit Button -->
      <button 
        type="submit" 
        :disabled="isLoading"
        class="login-button"
      >
        {{ isLoading ? 'Logging in...' : 'Login' }}
      </button>
      
      <!-- Register Link -->
      <div class="register-link">
        Don't have an account? 
        <router-link to="/register">Register here</router-link>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

const store = useStore()
const router = useRouter()

// State
const username = ref('')
const password = ref('')

// Computed
const error = computed(() => store.state.auth.error)
const isLoading = computed(() => store.state.auth.loading)

// Methods
const handleLogin = async () => {
  try {
    await store.dispatch('auth/login', {
      username: username.value,
      password: password.value
    })
    
    // Redirect to account page on success
    router.push('/account')
  } catch (error) {
    console.error('Login failed:', error)
  }
}

// Lifecycle hooks
onMounted(() => {
  store.dispatch('auth/clearError')
})

onBeforeUnmount(() => {
  store.dispatch('auth/clearError')
})
</script>

<style scoped>
.login-container {
  max-width: 400px;
  margin: 2rem auto;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  background-color: white;
}

.login-form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

label {
  font-weight: 600;
  color: #333;
}

input {
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
}

input:focus {
  outline: none;
  border-color: #4a90e2;
  box-shadow: 0 0 0 2px rgba(74, 144, 226, 0.2);
}

.error-alert {
  padding: 0.75rem;
  margin-bottom: 1rem;
  border-radius: 4px;
  background-color: #fee2e2;
  color: #dc2626;
  border: 1px solid #fecaca;
}

.login-button {
  padding: 0.75rem;
  background-color: #4a90e2;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.2s;
}

.login-button:hover:not(:disabled) {
  background-color: #357abd;
}

.login-button:disabled {
  background-color: #9ca3af;
  cursor: not-allowed;
}

.register-link {
  text-align: center;
  margin-top: 1rem;
}

.register-link a {
  color: #4a90e2;
  text-decoration: none;
}

.register-link a:hover {
  text-decoration: underline;
}
</style>