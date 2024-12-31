import { createApp } from 'vue'
import './style.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import App from './App.vue'
import router from './router'
import store from './store'
import sanitizePlugin from './plugins/sanitize'

const app = createApp(App)

app.use(sanitizePlugin)
app.use(store)
app.use(router)

app.mount('#app')