export default {
    namespaced: true,
    state: {
        token: localStorage.getItem('token') || null,
        user: JSON.parse(localStorage.getItem('user')) || null
    },
    mutations: {
        setToken(state, token) {
            localStorage.setItem('token', token)
            state.token = token
        },
        setUser(state, user) {
            localStorage.setItem('user', JSON.stringify(user))
            state.user = user
        },
        clearToken(state) {
            localStorage.removeItem('token')
            localStorage.removeItem('user')
            state.token = null
            state.user = null
        }
    },
    actions: {
        login({ commit }, { token, user }) {
            commit('setToken', token)
            commit('setUser', user)
        },
        logout({ commit }) {
            commit('clearToken')
            window.location.href = '/Login'
        }
    },
    getters: {
        isAuthenticated: state => !!state.token,
        getToken: state => state.token,
        getCurrentUser: state => state.user
    }
}