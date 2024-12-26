<template>
    <div class="login-container">
    <h2>Login to Cake Tutorial Hub</h2>
    <form @submit.prevent="handleLogin">
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
        <button type="submit" class="btn btn-primary">Login</button>
        <p v-if="error" class="text-danger">{{ error }}</p>
    </form>
    </div>
</template>

<script>
import { ref } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

export default {
    name: 'Login',
    setup() {
    const store = useStore()
    const router = useRouter()
    
    const email = ref('')
    const password = ref('')
    const error = ref(null)

    const handleLogin = async () => {
        try {
        await store.dispatch('login', { 
            email: email.value, 
            password: password.value 
        })
          router.push('/') // Redirect to home after successful login
        } catch (err) {
        error.value = err.response?.data?.message || 'Login failed'
        }
    }

    return {
        email,
        password,
        error,
        handleLogin
    }
    }
}
</script>