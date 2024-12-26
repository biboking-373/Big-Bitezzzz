<script>
export default {
    name: 'Home',
    data() {
    return {
        featuredCakes: [
        {
            id: 1,
            title: 'Classic Chocolate Cake',
            description: 'This is prime space! Use it to elaborate on your attention-grabbing section title. Explain what this section is about, share some details about making the perfect chocolate cake.'
        },
        { 
            id: 2,
            title: 'Vanilla Masterpiece',
            description: 'This is prime space! Use it to elaborate on your attention-grabbing section title. Explain what this section is about, share some details about creating a fluffy vanilla cake.'
        },
        
    ]
    }
}
}
</script>

<template>
<div class="home-container">
    <!-- Welcome Section with full width -->
    <section class="welcome-section">
    <div class="content-wrapper">
        <h1 class="display-4 fw-bold">
            Welcome to the home of the best recipes in town<br>
        </h1>
        <p class="lead welcome-text">
        
        </p>
        <button class="btn btn-info btn-lg">Get Started</button>
    </div>
    </section>

    <!-- Featured Section with cards -->
    <section class="featured-section">
    <div class="content-wrapper">
        <h2 class="text-center section-title">At Big Bitezz we've got a variety of ways you can bake your dream cake
            leaving you not only knowledgable
        </h2>
        <div class="cards-container">
        <div class="feature-card" v-for="cake in featuredCakes" :key="cake.id">
            <div class="card h-100">
            <div class="card-body">
                <h3 class="card-title">{{ cake.title }}</h3>
                <p class="card-text">{{ cake.description }}</p>
            </div>
            </div>
        </div>
        </div>
    </div>
    </section>

    <!-- Passion Section -->
    <section class="passion-section">
    <div class="content-wrapper">
        <h2 class="text-center section-title">Why choose BIG BITEZZ</h2>
        <div class="passion-content">
        <p class="main-idea">This is a platform where we share ideas on how to make your ideal
            sweet cake
        </p>
        <p class="sub-idea">Not only will you have fun</p>
        <p class="description">
            But also you and your family can create memories saving you a penny and giving
            you memories to last
        </p>
        </div>
    </div>
    </section>
</div>
</template>

<style scoped>
.home-container {
width: 100%;
}

/* Welcome Section */
.welcome-section {
background: linear-gradient(to bottom right, #14151d, #f8f9fa);
min-height: 100vh;
padding: 120px 0;
display: flex;
margin-bottom:60px;
align-items: center;
background-image: url("/Untitled design.png");
color:rgb(10, 31, 30);
border-radius:20px;
border:none;
}

/* Content Wrapper for all sections */
.content-wrapper {
max-width: 1400px;
margin: 0 auto;
padding: 0 2rem;
}

.welcome-text {
max-width: 800px;
margin: 2rem 0;
font-size: 1.25rem;
line-height: 1.8;
}

/* Featured Section */
.featured-section {
background-color: #bdb433;
color:white;
margin-bottom:60px;
padding: 120px 0;
}

.section-title {
font-size: 2.5rem;
margin-bottom: 4rem;
}

.cards-container {
display: grid;
grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
gap: 2rem;
padding: 2rem 0;
}

.feature-card .card {
border: none;
box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
transition: transform 0.3s ease;
padding: 2rem;
}

.feature-card .card:hover {
transform: translateY(-10px);
}

.card-title {
font-size: 1.5rem;
margin-bottom: 1.5rem;
}

/* Passion Section */
.passion-section {
background: linear-gradient(to bottom, #f8f9fa, #e9ecef);
padding: 120px 0;
margin-bottom:60px;
}

.passion-content {
max-width: 800px;
margin: 0 auto;
text-align: center;
}

.main-idea {
font-size: 1.5rem;
margin-bottom: 1.5rem;
}

.sub-idea {
font-size: 1.25rem;
margin-bottom: 2rem;
color: #666;
}

.description {
font-size: 1.1rem;
line-height: 1.8;
color: #444;
}

/* Responsive Design */
@media (max-width: 768px) {
section {
    padding: 80px 0;
}

.welcome-section {
    min-height: auto;
    text-align: center;
}

.section-title {
    font-size: 2rem;
    margin-bottom: 3rem;
}

.cards-container {
    grid-template-columns: 1fr;
}

.content-wrapper {
    padding: 0 1rem;
}
}
</style>