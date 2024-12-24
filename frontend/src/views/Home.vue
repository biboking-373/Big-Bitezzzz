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
        {
        id: 3,
        title: 'Special Occasions',
        description: 'This is prime space! Use it to elaborate on your attention-grabbing section title. Explain what this section is about, share some details about crafting celebration cakes.'
        }
    ]
    }
}
}
</script>
<!--This is just a skeleton of what the website home page will look like i used canva-->
<template>
<div class="home">
    <!-- Welcome Section -->
    <section class="welcome-section bg-light py-5">
    <div class="container">
        <div class="row">
        <div class="col-md-8">
            <h1 class="display-4 mb-4">WELCOMING MESSAGE</h1>
            <p class="lead mb-4">
            This is prime space! Use it to elaborate on your attention-grabbing section title. 
            Explain what this section is about, share some details, and give just the right 
            amount of information to get the audience hooked.
            </p>
            <button class="btn btn-dark btn-lg">Get Started</button>
        </div>
        </div>
    </div>
    </section>

    <!-- Main Content Section -->
    <section class="featured-section py-5">
    <div class="container">
        <h2 class="text-center mb-5">Examples of what you do and the images that are on display</h2>
        
        <div class="row">
        <div class="col-md-4" v-for="cake in featuredCakes" :key="cake.id">
            <div class="card h-100 border-0 shadow-sm">
            <div class="card-body text-center">
                <h3 class="h4 mb-3">{{ cake.title }}</h3>
                <p class="card-text">{{ cake.description }}</p>
            </div>
            </div>
        </div>
        </div>
    </div>
    </section>

    <!-- Passion Section -->
    <section class="passion-section py-5 bg-light">
    <div class="container">
        <h2 class="text-center mb-4">Passion about the thing</h2>
        <div class="row justify-content-center">
        <div class="col-md-8 text-center">
            <p class="mb-4">Your Main Idea Goes Here</p>
            <p class="mb-4">WHy you have this site</p>
            <p>There is just enough space here for several lines of text. You can add details, 
                share a quick story, or elaborate on an idea, as long as you keep the information 
                engaging and relevant. For maximum impact, make sure you get your message across 
                clearly yet concisely.</p>
        </div>
        </div>
    </div>
    </section>
</div>
</template>

<style scoped>
.welcome-section {
background: linear-gradient(to bottom right, #ffffff, #f8f9fa);
min-height: 60vh;
display: flex;
align-items: center;
}

.featured-section {
background-color: white;
}

.card {
transition: transform 0.3s ease;
background: rgba(255, 255, 255, 0.9);
backdrop-filter: blur(10px);
}

.card:hover {
transform: translateY(-10px);
}

.passion-section {
background: linear-gradient(to bottom, #f8f9fa, #e9ecef);
}

/* Responsive adjustments */
@media (max-width: 768px) {
.welcome-section {
    min-height: 40vh;
    text-align: center;
}

.card {
    margin-bottom: 2rem;
}
}
</style>