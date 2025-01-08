<script>
import { ref, computed } from 'vue'
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
    const isLoading = ref(false)
    const showPasswordRequirements = ref(false)

    // Password requirement checks
    const hasMinLength = computed(() => password.value.length >= 6)
    const hasNumber = computed(() => /\d/.test(password.value))
    const hasUppercase = computed(() => /[A-Z]/.test(password.value))
    const hasSpecialChar = computed(() => /[!@#$%^&*(),.?":{}|<>]/.test(password.value))

    const validatePassword = (pass) => {
      const requirements = []
      if (!hasMinLength.value) requirements.push('At least 6 characters')
      if (!hasNumber.value) requirements.push('At least one number')
      if (!hasUppercase.value) requirements.push('At least one uppercase letter')
      if (!hasSpecialChar.value) requirements.push('At least one special character')
      return requirements
    }

    const handleRegister = async () => {
      // Reset error
      error.value = null
      
      // Basic validation
      if (password.value !== confirmPassword.value) {
        error.value = 'Passwords do not match'
        return
      }

      // Password requirements validation
      const passwordRequirements = validatePassword(password.value)
      if (passwordRequirements.length > 0) {
        error.value = 'Password does not meet requirements'
        showPasswordRequirements.value = true
        return
      }

      // Username validation
      if (!/^[a-zA-Z0-9_]+$/.test(username.value)) {
        error.value = 'Username can only contain letters, numbers, and underscores'
        return
      }

      if (username.value.length < 3 || username.value.length > 20) {
        error.value = 'Username must be between 3 and 20 characters'
        return
      }

      try {
        isLoading.value = true
        
        // Register the user
        await store.dispatch('auth/register', {
          username: username.value,
          email: email.value,
          password: password.value
        })
        
        // Redirect to account page after successful registration
        router.push('/account')
      } catch (err) {
        error.value = err.message || 'Registration failed'
        if (err.data?.errors) {
          error.value = err.data.errors.map(e => e.msg).join(', ')
        }
      } finally {
        isLoading.value = false
      }
    }

    return {
      username,
      email,
      password,
      confirmPassword,
      error,
      isLoading,
      showPasswordRequirements,
      hasMinLength,
      hasNumber,
      hasUppercase,
      hasSpecialChar,
      handleRegister
    }
  }
}
</script>

<template>
<div class="register-container">
    <h2>Create an Account</h2>
    
    <!-- Error Alert -->
    <div v-if="error" class="error-alert">
      {{ error }}
    </div>
    
    <form @submit.prevent="handleRegister" class="register-form">
      <div class="form-group">
        <label for="username">Username</label>
        <input 
          id="username"
          type="text" 
          v-model="username" 
          :disabled="isLoading"
          required
          placeholder="Choose a username (3-20 characters)"
        >
        <small class="help-text">Only letters, numbers, and underscores allowed</small>
      </div>
      
      <div class="form-group">
        <label for="email">Email</label>
        <input 
          id="email"
          type="email" 
          v-model="email" 
          :disabled="isLoading"
          required
          placeholder="Enter your email"
        >
      </div>
      
      <div class="form-group">
        <label for="password">Password</label>
        <input 
          id="password"
          type="password" 
          v-model="password" 
          :disabled="isLoading"
          required
          placeholder="Choose a password"
          @focus="showPasswordRequirements = true"
        >
        <!-- Password Requirements -->
        <div v-if="showPasswordRequirements" class="password-requirements">
          <p>Password must contain:</p>
          <ul>
            <li :class="{ met: hasMinLength }">At least 6 characters</li>
            <li :class="{ met: hasNumber }">At least one number</li>
            <li :class="{ met: hasUppercase }">At least one uppercase letter</li>
            <li :class="{ met: hasSpecialChar }">At least one special character</li>
          </ul>
        </div>
      </div>
      
      <div class="form-group">
        <label for="confirmPassword">Confirm Password</label>
        <input 
          id="confirmPassword"
          type="password" 
          v-model="confirmPassword" 
          :disabled="isLoading"
          required
          placeholder="Confirm your password"
        >
      </div>
      
      <button 
        type="submit" 
        :disabled="isLoading"
        class="register-button"
      >
        {{ isLoading ? 'Creating Account...' : 'Register' }}
      </button>
      
      <div class="login-link">
        Already have an account? 
        <router-link to="/login">Login here</router-link>
      </div>
    </form>
</div>
</template>

<style scoped>
.register-container {
  max-width: 400px;
  margin: 2rem auto;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  background-color: white;
}

.register-form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.form-group label {
  font-weight: 600;
  color: #333;
}

.form-group input {
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
}

.form-group input:focus {
  outline: none;
  border-color: #4CAF50;
  box-shadow: 0 0 0 2px rgba(76, 175, 80, 0.2);
}

.help-text {
  color: #666;
  font-size: 0.875rem;
}

.password-requirements {
  background-color: #f5f5f5;
  padding: 1rem;
  border-radius: 4px;
  margin-top: 0.5rem;
}

.password-requirements p {
  margin: 0 0 0.5rem 0;
  font-weight: 600;
}

.password-requirements ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.password-requirements li {
  margin: 0.25rem 0;
  color: #666;
  display: flex;
  align-items: center;
}

.password-requirements li::before {
  content: "×";
  color: #dc3545;
  margin-right: 0.5rem;
  font-weight: bold;
}

.password-requirements li.met::before {
  content: "✓";
  color: #28a745;
}

.register-button {
  background-color: #4CAF50;
  color: white;
  padding: 0.75rem;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.2s;
}

.register-button:hover {
  background-color: #45a049;
}

.register-button:disabled {
  background-color: #cccccc;
  cursor: not-allowed;
}

.error-alert {
  background-color: #ffebee;
  color: #c62828;
  padding: 1rem;
  border-radius: 4px;
  margin-bottom: 1rem;
}

.login-link {
  text-align: center;
  margin-top: 1rem;
  color: #666;
}

.login-link a {
  color: #4CAF50;
  text-decoration: none;
}

.login-link a:hover {
  text-decoration: underline;
}
</style>