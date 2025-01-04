<template>
<div class="home-container">
    <section class="welcome-section text-center py-5">
        <div class="container">
            <h1 class="display-4 fw-bold mb-4">
                Discover Your Next Baking Adventure
            </h1>
            <p class="lead mb-4">
                Explore delicious cake recipes, learn professional techniques, and unleash your inner pastry chef.
            </p>
        </div>
    </section>

    <section class="featured-section py-5">
        <div class="container">
            <h2 class="text-center mb-5">Featured Cake Recipes</h2>
            <div class="row" v-if="featuredCakes.length > 0">
                <div 
                    v-for="cake in featuredCakes" 
                    :key="cake.id" 
                    class="col-md-4 mb-4"
                >
                    <div class="card h-100 cake-showcase">
                        <img 
                            :src="cake.image" 
                            :alt="cake.title" 
                            class="card-img-top"
                        >
                        <div class="card-body">
                            <h3 class="card-title">{{ cake.title }}</h3>
                            <p class="card-text">{{ cake.description }}</p>
                        </div>
                    </div>
                </div>
            </div>
            <div v-else>
                <p>No featured cakes available</p>
            </div>
        </div>
    </section>
</div>
</template>

<script>
export default {
    name: 'Home',
    data() {
        return {
            featuredCakes: [
                {
                    id: 1,
                    title: 'Classic Chocolate Cake',
                    description: 'Rich, decadent chocolate cake with layers of ganache',
                    image: '/Images/chocolate.png'
                },
                { 
                    id: 2,
                    title: 'Vanilla Masterpiece',
                    description: 'Delicate vanilla cake with buttercream frosting',
                    image: '/Images/vanilla.png'
                }
            ]
        }
    },
    computed: {
        isAuthenticated() {
            return this.$store.getters['auth/isAuthenticated']
        }
    },
    methods: {
        navigateOrRedirect(route) {
            if (this.isAuthenticated) {
                this.$router.push(route)
            } else {
                this.$router.push('/Login')
            }
        }
    }
}
</script>

<style scoped>
.cake-showcase {
    cursor: default;  /* Remove pointer cursor */
    transition: none;  /* Remove hover effects */
}

.cake-showcase:hover {
    transform: none;  /* Disable scale on hover */
    box-shadow: none;  /* Remove box shadow on hover */
}

.card-img-top {
    height: 250px;
    object-fit: cover;
}
</style>