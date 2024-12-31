import axios from 'axios'
import store from '../store'

const axiosInstance = axios.create({
    baseURL: process.env.VUE_APP_API_URL || '/api',
    withCredentials: true
})

// Request Interceptor
axiosInstance.interceptors.request.use(
    config => {
        // Add authentication token
        const token = store.getters['auth/getToken']
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`
        }
        return config
    },
    error => Promise.reject(error)
)

// Response Interceptor
axiosInstance.interceptors.response.use(
    response => response,
    error => {
        // Handle unauthorized access
        if (error.response && error.response.status === 401) {
            store.dispatch('auth/logout')
        }
        return Promise.reject(error)
    }
)

export default axiosInstance