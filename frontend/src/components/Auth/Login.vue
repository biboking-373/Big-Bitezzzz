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
        </form>
    </div>
</template>

<script>
export default {
    name: 'Login',
    data() {
        return {
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
                        username: 'JohnDoe',
                        email: this.email
                    }
                }
                
                // Dispatch login action
                await this.$store.dispatch('auth/login', response)
                
                // Redirect to dashboard
                this.$router.push('/dashboard')
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

<style scoped>
.login-container {
    max-width: 400px;
    margin: 0 auto;
    padding: 20px;
    border: 1px solid #ddd;
    border-radius: 8px;
}

.form-group {
    margin-bottom: 15px;
}

.form-control {
    width: 100%;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 4px;
}

.btn-primary {
    width: 100%;
    padding: 10px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 4px;
}

.btn-primary:disabled {
    background-color: #6c757d;
}

.alert-danger {
    color: #721c24;
    background-color: #f8d7da;
    border: 1px solid #f5c6cb;
    padding: 10px;
    border-radius: 4px;
}
</style>