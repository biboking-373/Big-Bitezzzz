export default {
  namespaced: true,
  state: {
    user: null,
    token: localStorage.getItem('token') || null
  },
  mutations: {
    SET_USER(state, user) {
      state.user = user
    },
    SET_TOKEN(state, token) {
      state.token = token
      localStorage.setItem('token', token)
    },
    LOGOUT(state) {
      state.user = null
      state.token = null
      localStorage.removeItem('token')
    }
  },
  actions: {
    login({ commit }, { user, token }) {
      commit('SET_USER', user)
      commit('SET_TOKEN', token)
    },
    logout({ commit }) {
      commit('LOGOUT')
    },
    // Add a register action that calls login
    register({ dispatch }, userData) {
      // In a real app, this would call an API to register the user
      // For now, we'll simulate a successful registration
      const response = {
        token: 'sample-token',
        user: userData
      }
      return dispatch('login', response)
    }
  },
  getters: {
    isAuthenticated: state => !!state.token,
    currentUser: state => state.user
  }
}