<script>
export default {
    name: 'Navigation'
}
</script>

<template>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
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

        <!-- Wording (links) on the right -->
        <div class="collapse navbar-collapse justify-content-end" id="navbarNav">
        <div class="navbar-nav">
            <router-link to="/" class="nav-item nav-link">Home</router-link>
            <router-link to="/tutorials" class="nav-item nav-link">Recipes</router-link>
            <router-link to="/bookmarks" class="nav-item nav-link">My Bookmarks</router-link>
            <router-link to="/login" class="nav-item nav-link">Login</router-link>
            <router-link to="/register" class="nav-item nav-link">Register</router-link>
        </div>
        </div>
    </div>
    </nav>

</template>

<style scoped>
/* Media queries for responsiveness */

/* Smaller screens (max-width: 576px) */
@media (max-width: 576px) {
img {
    width: 60px;
    height: 60px;
}

.navbar-nav .nav-link {
    font-size: 14px;
}
}

/* Medium screens (max-width: 768px) */
@media (max-width: 768px) {
img {
    width: 70px;
    height: 70px;
}

.navbar-nav {
    text-align: center;
}
}

/* Large screens (min-width: 992px) */
@media (min-width: 992px) {
img {
    width: 90px;
    height: 90px;
}
}
</style>