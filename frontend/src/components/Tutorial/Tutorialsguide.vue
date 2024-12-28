
<template>
    <div v-if="tutorial" class="tutorial-detail">
        <h2>{{ tutorial.title }}</h2>
        <div class="tutorial-meta">
        <span>By {{ tutorial.author }}</span>
        <span>Difficulty: {{ tutorial.difficulty }}</span>
        </div>
        
        <div class="tutorial-content">
        <section class="ingredients">
            <h3>Ingredients</h3>
            <ul>
            <li v-for="(ingredient, index) in tutorial.ingredients" :key="index">
                {{ ingredient }}
            </li>
            </ul>
        </section>
        
        <section class="instructions">
            <h3>Instructions</h3>
            <ol>
            <li v-for="(step, index) in tutorial.steps" :key="index">
                {{ step }}
            </li>
            </ol>
        </section>
        </div>
        
        <div class="tutorial-actions">
        <button @click="addComment" class="btn btn-primary">Add Comment</button>
        </div>
        
        <section class="comments">
        <h3>Comments</h3>
        <div v-if="comments.length" class="comment-list">
            <div v-for="comment in comments" :key="comment.id" class="comment">
            <strong>{{ comment.user }}</strong>
            <p>{{ comment.text }}</p>
            </div>
        </div>
        <p v-else>No comments yet</p>
        </section>
    </div>
    <div v-else>
        <p>Tutorial not found</p>
    </div>
    </template>
    
<script>
import { ref, onMounted, reactive } from 'vue'
import { useRoute } from 'vue-router'

export default {
name: 'Tutorialguide',
setup() {
    const route = useRoute()
    const tutorial = ref(null)
    const comments = reactive([])

    onMounted(() => {
    const tutorialId = route.params.id
    if (!tutorialId) {
        console.error('No tutorial ID found in route parameters')
        return
    }

    tutorial.value = {
        id: tutorialId,
        title: 'Chocolate Cake Tutorial',
        author: 'Jane Doe',
        difficulty: 'Intermediate',
        ingredients: [
        '2 cups all-purpose flour',
        '2 cups sugar',
        '3/4 cup unsweetened cocoa powder',
        '2 teaspoons baking soda'
        ],
        steps: [
        'Preheat oven to 350°F (175°C)',
        'Mix dry ingredients in a large bowl',
        'Add wet ingredients and mix until smooth',
        'Pour batter into greased cake pan',
        'Bake for 30-35 minutes'
        ]
    }

    comments.push(
        { id: 1, user: 'Alice', text: 'Great tutorial!' },
        { id: 2, user: 'Bob', text: 'Worked perfectly' }
    )
    })

    const addComment = () => {
    const newComment = { id: comments.length + 1, user: 'New User', text: 'New comment' }
    comments.push(newComment)
    }

    return {
    tutorial,
    comments,
    addComment
    }
}
}
</script>

    <style scoped>
    .tutorial-detail {
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
    }
    
    .tutorial-meta {
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
    }
    
    .ingredients ul, .instructions ol {
    padding-left: 20px;
    }
    
    .comments {
    margin-top: 20px;
    }
    
    .comment {
    border-bottom: 1px solid #eee;
    padding: 10px 0;
    }
    </style>