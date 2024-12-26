import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../components/Auth/Login.vue'

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

}

]

const router = createRouter({
history: createWebHistory(),
routes
})


export default router