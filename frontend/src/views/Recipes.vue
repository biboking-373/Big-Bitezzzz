<template>
<div class="tutorials-container">
    <h2>Cake Tutorials</h2>
    
    <div class="filters">
    <input 
        v-model="searchQuery" 
        placeholder="Search tutorials..." 
        class="form-control"
    >
    <select v-model="difficultyFilter" class="form-select">
        <option value="">All Difficulties</option>
        <option value="Easy">Easy</option>
        <option value="Intermediate">Intermediate</option>
        <option value="Advanced">Advanced</option>
    </select>
    </div>
    
    <div class="tutorials-grid">
    <div 
        v-for="tutorial in filteredTutorials" 
        :key="tutorial.id" 
        class="tutorial-card"
    >
        <img :src="tutorial.image" :alt="tutorial.title">
        <div class="tutorial-info">
        <h3>{{ tutorial.title }}</h3>
        <p>{{ tutorial.description }}</p>
        <div class="tutorial-meta">
            <span>Difficulty: {{ tutorial.difficulty }}</span>
            <router-link 
            :to="`/tutorial/${tutorial.id}`" 
            class="btn btn-primary"
            >
            View Tutorial
            </router-link>
        </div>
        </div>
    </div>
    </div>
    
    <div v-if="filteredTutorials.length === 0" class="no-results">
    No tutorials found
    </div>
</div>
</template>

<script>
import { ref, computed } from 'vue'

export default {
name: 'Recipes',
setup() {
    const searchQuery = ref('')
    const difficultyFilter = ref('')
    
    const tutorials = ref([
    {
        id: 1,
        title: 'Classic Chocolate Cake',
        description: 'Learn to bake a rich, moist chocolate cake',
        difficulty: 'Intermediate',
        image: '/chocolate-cake.jpg'
    },
    {
        id: 2,
        title: 'Vanilla Sponge Cake',
        description: 'Perfect light and fluffy vanilla sponge',
        difficulty: 'Easy',
        image: '/vanilla-cake.jpg'
    },
    {
        id: 3,
        title: 'Red Velvet Cake',
        description: 'Master the art of red velvet baking',
        difficulty: 'Advanced',
        image: '/red-velvet-cake.jpg'
    }
    ])
    
    const filteredTutorials = computed(() => {
    return tutorials.value.filter(tutorial => {
        const matchesSearch = tutorial.title.toLowerCase().includes(searchQuery.value.toLowerCase())
        const matchesDifficulty = !difficultyFilter.value || tutorial.difficulty === difficultyFilter.value
        return matchesSearch && matchesDifficulty
    })
    })
    
    return {
    searchQuery,
    difficultyFilter,
    tutorials,
    filteredTutorials
    }
}
}
</script>

<style scoped>
.tutorials-container {
max-width: 1200px;
margin: 0 auto;
padding: 20px;
}

.filters {
display: flex;
gap: 15px;
margin-bottom: 20px;
}

.tutorials-grid {
display: grid;
grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
gap: 20px;
}

.tutorial-card {
border: 1px solid #ddd;
border-radius: 8px;
overflow: hidden;
}

.tutorial-card img {
width: 100%;
height: 200px;
object-fit: cover;
}

.tutorial-info {
padding: 15px;
}

.tutorial-meta {
display: flex;
justify-content: space-between;
align-items: center;
margin-top: 10px;
}

.no-results {
text-align: center;
color: #666;
margin-top: 50px;
}
</style>