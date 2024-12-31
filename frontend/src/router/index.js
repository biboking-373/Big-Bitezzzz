import { createRouter, createWebHistory } from 'vue-router'
import store from '../store'

const routes = [
    { 
        path: '/', 
        component: () => import('../views/Home.vue'),
        name: 'Home',
    },
    {
        path: '/Login',
        component: () => import('../components/Auth/Login.vue'),
        name: 'Login',
        meta: { 
            requiresGuest: true,
            redirectIfAuthenticated: true 
        }
    },
    {
        path: '/register',
        component: () => import('../components/Auth/Register.vue'),
        name: 'Register',
        meta: { 
            requiresGuest: true,
            redirectIfAuthenticated: true 
        }
    },
    {
        path: '/Recipes',
        component: () => import('../views/Recipes.vue'),
        name: 'Recipes',
        meta: { requiresAuth: true }
    },
    {
        path: '/dashboard',
        component: () => import('../views/Dashboard.vue'),
        name: 'Dashboard',
        meta: { requiresAuth: true }
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

router.beforeEach((to, from, next) => {
    const isAuthenticated = store.getters['auth/isAuthenticated']
    
    // Redirect authenticated users away from guest routes
    if (to.meta.requiresGuest && isAuthenticated) {
        next('/dashboard')
        return
    }

    // Protect routes that require authentication
    if (to.meta.requiresAuth && !isAuthenticated) {
        next('/Login')
        return
    }

    next()
})

export default router