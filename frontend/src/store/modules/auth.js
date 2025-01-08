import { authApi } from '../../services/api'

export const state = () => ({
  user: JSON.parse(localStorage.getItem('user')) || null,
  token: localStorage.getItem('token') || null,
  loading: false,
  error: null
})

export const mutations = {
  SET_USER(state, user) {
    state.user = user
    if (user) {
      localStorage.setItem('user', JSON.stringify(user))
    } else {
      localStorage.removeItem('user')
    }
  },
  
  SET_TOKEN(state, token) {
    state.token = token
    if (token) {
      localStorage.setItem('token', token)
    } else {
      localStorage.removeItem('token')
    }
  },
  
  SET_LOADING(state, loading) {
    state.loading = loading
  },
  
  SET_ERROR(state, error) {
    state.error = error
  },
  
  CLEAR_ERROR(state) {
    state.error = null
  }
}

export const actions = {
  // Login action
  async login({ commit }, { username, password }) {
    try {
      commit('SET_LOADING', true)
      commit('CLEAR_ERROR')
      
      const data = await authApi.login(username, password)
      
      commit('SET_USER', data.user)
      commit('SET_TOKEN', data.token)
      
      return data
    } catch (error) {
      commit('SET_ERROR', error.message)
      throw error
    } finally {
      commit('SET_LOADING', false)
    }
  },
  
  // Register action
  async register({ commit }, userData) {
    try {
      commit('SET_LOADING', true)
      commit('CLEAR_ERROR')
      
      const data = await authApi.register(userData)
      
      commit('SET_USER', data.user)
      commit('SET_TOKEN', data.token)
      
      return data
    } catch (error) {
      commit('SET_ERROR', error.message)
      throw error
    } finally {
      commit('SET_LOADING', false)
    }
  },
  
  // Logout action
  logout({ commit }) {
    commit('SET_USER', null)
    commit('SET_TOKEN', null)
    commit('CLEAR_ERROR')
  },
  
  // Get current user profile
  async fetchProfile({ commit, state }) {
    if (!state.token) return
    
    try {
      commit('SET_LOADING', true)
      const data = await authApi.getProfile()
      commit('SET_USER', data.user)
    } catch (error) {
      if (error.status === 401) {
        commit('SET_USER', null)
        commit('SET_TOKEN', null)
      }
      throw error
    } finally {
      commit('SET_LOADING', false)
    }
  },
  
  // Clear any errors
  clearError({ commit }) {
    commit('CLEAR_ERROR')
  }
}

export const getters = {
  isAuthenticated: (state) => !!state.token,
  currentUser: (state) => state.user,
  isLoading: (state) => state.loading,
  error: (state) => state.error
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}