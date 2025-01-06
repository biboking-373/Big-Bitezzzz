import { createRouter, createWebHistory } from 'vue-router'
import { useStore } from 'vuex'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/Home.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../components/Auth/Login.vue'),
    meta: { guest: true }
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('../components/Auth/Register.vue'),
    meta: { guest: true }
  },
  {
    path: '/ingredients',
    name: 'Ingredients',
    component: () => import('../views/Ingredients.vue')
  },
  {
    path: '/account',
    name: 'Account',
    component: () => import('../components/MY ACCOUNT/Account.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/add-recipe',
    name: 'AddRecipe',
    component: () => import('../components/ADD RECIPE/addrecipe.vue'),
    meta: { requiresAuth: true }
  },

  {
    path: '/recipe/:recipeId',
    name: 'RecipeDetails',
    component: () => import('../views/RecipeDetails.vue')
  },

  {
    path: '/edit-recipe/:id',
    name: 'EditRecipe',
    component: () => import('../components/ADD RECIPE/addrecipe.vue'),
    meta: { requiresAuth: true }
  },
  // Catch-all route
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('../views/Home.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// Navigation guard
router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth)
  const isGuest = to.matched.some(record => record.meta.guest)
  const isAuthenticated = localStorage.getItem('token') !== null

  // If route requires authentication and user is not logged in
  if (requiresAuth && !isAuthenticated) {
    next('/login')
  } 
  // If route is for guests only and user is already logged in
  else if (isGuest && isAuthenticated) {
    next('/')
  } 
  else {
    next()
  }
})

export default router