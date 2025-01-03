<script>
export default {
    name: 'Login',
    data() {
        return {
            username: '', // Add username field
            email: '',
            password: '',
            isLoading: false,
            error: null
        }
    },
    methods: {
        async handleLogin() {
            this.isLoading = true
            this.error = null

            try {
                // Simulate login - replace with actual API call
                const response = {
                    token: 'sample-token',
                    user: {
                        username: this.username, // Use the entered username
                        email: this.email
                    }
                }
                
                // Dispatch login action
                await this.$store.dispatch('auth/login', response)
                
                // Redirect to dashboard or account
                this.$router.push('/account')
            } catch (error) {
                this.error = error.response?.data?.message || 'Login failed'
                console.error('Login failed', error)
            } finally {
                this.isLoading = false
            }
        }
    }
}
</script>

<template>
    <div class="login-container">
        <h2>Login to Cake Tutorial Hub</h2>
        <form @submit.prevent="handleLogin">
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
            <button 
                type="submit" 
                class="btn btn-primary"
                :disabled="isLoading"
            >
                {{ isLoading ? 'Logging in...' : 'Login' }}
            </button>
            
            <div v-if="error" class="alert alert-danger mt-3">
                {{ error }}
            </div>

            <div class="text-center mt-3">
                <p>Don't have an account? <router-link to="/register">Register here</router-link></p>
            </div>
        </form>
    </div>
</template>