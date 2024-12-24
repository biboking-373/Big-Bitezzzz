<script>
import { ref, onMounted } from 'vue'

export default {
    setup() {
    const featuredTutorials = ref([
        // Placeholder data - will be replaced with actual API call
        {
        id: 1,
        title: 'Classic Chocolate Cake',
        description: 'Learn to bake the perfect chocolate cake',
        image: 'Images/chocolate.png'
        },
        {
        id: 2,
        title: 'Vanilla Sponge Cake',
        description: 'A light and fluffy vanilla sponge tutorial',
        image: 'Images/vanilla.png'
        }
    ])

    onMounted(() => {
        // Fetch featured tutorials from backend
    })

    return {
        featuredTutorials
    }
    }
}
</script>

<template>
    <div class="home">
    <h1>Welcome to Cake Tutorial Hub</h1>
    <p>Discover amazing cake recipes and tutorials from passionate bakers!</p>
    
    <div class="featured-tutorials">
        <h2>Variety of samples from the website</h2>
        <!-- Will be populated dynamically later -->
        <div class="row">
        <div class="col-md-4" v-for="tutorial in featuredTutorials" :key="tutorial.id">
            <div class="card mb--1">
            <img :src="tutorial.image" class="card-img-top w-50" :alt="tutorial.title">
            <div class="card-body">
                <h5 class="card-title">{{ tutorial.title }}</h5>
                <p class="card-text">{{ tutorial.description }}</p>
                <router-link :to="`/tutorial/${tutorial.id}`" class="btn btn-primary">View Tutorial</router-link>
            </div>
            </div>
        </div>
        </div>
    </div>
    </div>
</template>
