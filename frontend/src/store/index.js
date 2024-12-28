import { createStore } from 'vuex'
import auth from './modules/auth'
import tutorials from './modules/tutorials'

export default createStore({
modules: {
    auth,
    tutorials
}
})