import { createStore } from 'vuex'
import auth from './modules/auth'
import { setupApiInterceptors } from '../services/api'

const store = createStore({
  modules: {
    auth
  }
})

// Setup API interceptors
setupApiInterceptors(store)

export default store