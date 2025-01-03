<script>
import { ref } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

export default {
  name: 'Register',
  setup() {
    const store = useStore()
    const router = useRouter()
    
    const username = ref('')
    const email = ref('')
    const password = ref('')
    const confirmPassword = ref('')
    const error = ref(null)

    const handleRegister = async () => {
      // Basic validation
      if (password.value !== confirmPassword.value) {
        error.value = 'Passwords do not match'
        return
      }

      try {
        // Simulate registration response
        const response = {
          token: 'sample-registration-token',
          user: {
            username: username.value,
            email: email.value
          }
        }

        // Dispatch login action with registration data
        await store.dispatch('auth/login', response)
        
        // Redirect to account page after successful registration
        router.push('/account')
      } catch (err) {
        error.value = err.response?.data?.message || 'Registration failed'
      }
    }

    return {
      username,
      email,
      password,
      confirmPassword,
      error,
      handleRegister
    }
  }
}
</script>

<template>
<div class="register-container">
    <h2>Create an Account</h2>
    <form @submit.prevent="handleRegister">
    <div class="form-group">
        <label>Username</label>
        <input 
        type="text" 
        v-model="username" 
        class="form-control" 
        required
        >
    </div>
    <div class="form-group">
        <label>Email</label>
        <input 
        type="email" 
        v-model="email" 
        class="form-control" 
        required
        >
    </div>
    <div class="form-group">
        <label>Password</label>
        <input 
        type="password" 
        v-model="password" 
        class="form-control" 
        required
        >
    </div>
    <div class="form-group">
        <label>Confirm Password</label>
        <input 
        type="password" 
        v-model="confirmPassword" 
        class="form-control" 
        required
        >
    </div>
    <button type="submit" class="btn btn-primary">Register</button>
    
    <p v-if="error" class="text-danger mt-3">{{ error }}</p>
    
    <p class="mt-3">
        Already have an account? 
        <router-link to="/login">Login here</router-link>
    </p>
    </form>
</div>
</template>

<style scoped>
.register-container {
max-width: 400px;
margin: 0 auto;
padding: 20px;
}

.form-group {
margin-bottom: 15px;
}

.btn-primary {
width: 100%;
}
</style>