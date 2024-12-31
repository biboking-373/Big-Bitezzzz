import { createStore } from 'vuex'
import auth from './modules/auth'
import tutorial from './modules/tutorial'

export default createStore({
modules: {
    auth,
    tutorial,
}
})