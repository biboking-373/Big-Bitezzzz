<template>
    <nav class="navbar navbar-expand-md navbar-light" style="background-color:mediumslateblue">
    <div class="container d-flex justify-content-between align-items-center">
        <!-- Image on the left -->
        <router-link to="/" class="navbar-brand d-flex align-items-center">
        <img 
            src="/BIG BITEZZZ.png" 
            alt="Home page image"
            class="rounded-circle overflow-hidden" 
            style="width: 90px; height: 90px;"
        >
        </router-link>

        <!-- Toggler for small screens -->
        <button 
        class="navbar-toggler" 
        type="button" 
        data-bs-toggle="collapse" 
        data-bs-target="#navbarNav" 
        aria-controls="navbarNav" 
        aria-expanded="false" 
        aria-label="Toggle navigation"
        >
        <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse justify-content-end" id="navbarNav">
        <div class="navbar-nav">
            <router-link to="/" class="nav-item nav-link fw-bold">Home</router-link>
            <router-link to="/Ingredients" class="nav-item nav-link fw-bold">Ingredients</router-link>
            
            <!-- Conditional Authentication Links -->
            <template v-if="!isAuthenticated">
                <router-link to="/register" class="nav-item nav-link fw-bold">Register</router-link>
                <router-link to="/login" class="nav-item nav-link fw-bold">Login</router-link>
            </template>
            <template v-else>
                <a href="#" @click.prevent="handleLogout" class="nav-item nav-link fw-bold">Logout</a>
                <router-link to="/account" class="nav-item nav-link fw-bold">My Account</router-link>
            </template>
        </div>
        </div>
    </div>
    </nav>
</template>

<script>
import { computed } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

export default {
    name: 'Navigation',
    setup() {
        const store = useStore()
        const router = useRouter()

        const isAuthenticated = computed(() => 
            store.getters['auth/isAuthenticated']
        )

        const handleLogout = () => {
            store.dispatch('auth/logout')
            router.push('/login')
        }

        return {
            isAuthenticated,
            handleLogout
        }
    }
}
</script>

<style scoped>
.navbar-nav .nav-link {
margin: 0 10px;
}

.navbar-nav .nav-link:hover {
    font-size: 15px;
    color:white;
}

/* Media queries for responsiveness */
/* Smaller screens (max-width: 577px) */
@media (max-width: 577px) {
img {
    width: 61px;
    height: 61px;
}

.navbar-nav .nav-link{
    font-size: 15px;
}
}

/* Medium screens (max-width: 769px) */
@media (max-width: 769px) {
img {
    width: 71px;
    height: 71px;
}

.navbar-nav {
    text-align: center;
}
}

/* Large screens (min-width: 993px) */
@media (min-width: 993px) {
img {
    width: 91px;
    height: 91px;
}
}
</style>