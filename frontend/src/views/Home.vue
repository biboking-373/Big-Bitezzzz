<script>
import { ref, onMounted } from 'vue'

export default {

    setup() {
        const featuredTutorials = ref([
            {
                id: 1,
                title: 'Classic Chocolate Cake',
                description: 'Learn to bake the perfect chocolate cake',
                image: 'Images/chocolate.png',
            },
            {
                id: 2,
                title: 'Vanilla Sponge Cake',
                description: 'A light and fluffy vanilla sponge tutorial',
                image: 'Images/vanilla.png',
            },
        ]);

        onMounted(() => {
            // Fetch featured tutorials from backend
        });

        return {
            featuredTutorials,
        };
    },
};
</script>

<template>
    <div class="home container py-4">
        <h1 class="text-center mb-4">Welcome to Cake Tutorial Hub</h1>
        <p class="text-center mb-5">Discover amazing cake recipes and tutorials from passionate bakers!</p>
        
        <div class="featured-tutorials mb-5">
            <h2 class="mb-4">Variety of samples from the website</h2>
            <div class="row g-4">
                <div class="col-md-6 col-lg-4" v-for="tutorial in featuredTutorials" :key="tutorial.id">
                    <div class="card h-100 shadow-sm">
                        <img :src="tutorial.image" class="card-img-top mx-auto p-3" :alt="tutorial.title" 
                             style="object-fit: cover; height: 200px; width: auto;">
                        <div class="card-body d-flex flex-column">
                            <h5 class="card-title">{{ tutorial.title }}</h5>
                            <p class="card-text flex-grow-1">{{ tutorial.description }}</p>
                            <router-link :to="`/tutorial/${tutorial.id}`" 
                                       class="btn btn-primary mt-auto">
                                View Tutorial
                            </router-link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.home {
    margin-bottom: 6rem; /* Adds significant space before footer */
}

.card {
    transition: transform 0.2s;
}

.card:hover {
    transform: translateY(-5px);
}

/* Responsive image sizing */
@media (max-width: 768px) {
    .card-img-top {
        height: 180px;
    }
}
</style>