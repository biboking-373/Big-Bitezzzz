import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../components/Auth/Login.vue'
import Register from '../components/Auth/Register.vue'
import Recipes from '../views/Recipes.vue'
import Tutorialguide from '../components/Tutorial/Tutorialsguide.vue'

const routes = [
{ 
    path: '/', 
    component: Home,
    name: 'Home',
},

{
    path:'/Login',
    component: Login,
    name: 'Login',
    meta: { requiresGuest: true }

},

{
    path:'/register',
    component: Register,
    name: 'Register',
    meta: { requiresGuest:true}
},

{
    path: '/Recipes',
    component: Recipes,
    name: 'Recipes',
},

{
    path: '/tutorial/:id',
    component: Tutorialguide,
    name: 'Tutorialguide',
},

]

const router = createRouter({
history: createWebHistory(),
routes
})

// Navigation guards
router.beforeEach((to, from, next) => {
  const isAuthenticated = localStorage.getItem('token') // Check authentication

if (to.meta.requiresAuth && !isAuthenticated) {
    next('/login')
} else if (to.meta.requiresGuest && isAuthenticated) {
    next('/')
} else {
    next()
    }
})


export default router