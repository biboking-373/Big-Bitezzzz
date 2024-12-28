export default {
    state: {
        user: null,
        token: localStorage.getItem('token') || null
    },
    mutations: {
        setUser(state, user) {
        state.user = user
        },
        setToken(state, token) {
        state.token = token
        localStorage.setItem('token', token)
        },
        clearAuth(state) {
        state.user = null
        state.token = null
        localStorage.removeItem('token')
        }
    },
    actions: {
        login({ commit }, credentials) {
          // Placeholder login action
        commit('setUser', { username: credentials.email })
        commit('setToken', 'sample-token')
        },
        register({ commit }, userData) {
          // Placeholder register action
        commit('setUser', { 
            username: userData.username, 
            email: userData.email 
        })
        commit('setToken', 'sample-registration-token')
        },
        logout({ commit }) {
        commit('clearAuth')
        }
    },
    getters: {
        isAuthenticated: state => !!state.token,
        currentUser: state => state.user
    }
    }