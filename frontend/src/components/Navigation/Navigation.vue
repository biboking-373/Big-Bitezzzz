<script>
export default{
    name: 'Navigation'
}
</script>

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

        <!-- Wording (links) on the right -->
        <div class="collapse navbar-collapse justify-content-end" id="navbarNav">
        <div class="navbar-nav">
            <router-link to="/" class="nav-item nav-link fw-bold">Home</router-link>
            <router-link to="/recipes" class="nav-item nav-link fw-bold">Recipes</router-link>
            <router-link to="/login" class="nav-item nav-link fw-bold">Login</router-link>
            <router-link to="/register" class="nav-item nav-link fw-bold">Register</router-link>
        </div>
        </div>
    </div>
    </nav>

</template>

<style scoped>
/*BELOW WILL BE THE COLOR OF text of  THE NAVBAR when hovered */

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