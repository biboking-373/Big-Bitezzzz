const API_URL = 'http://localhost:5001/api';  // Updated port to match backend server

// Create a custom error class for API errors
class ApiError extends Error {
    constructor(message, status, data) {
        super(message);
        this.status = status;
        this.data = data;
    }
}

// Helper function to handle API responses
async function handleResponse(response) {
    const data = await response.json();
    
    if (!response.ok) {
        throw new ApiError(
            data.message || 'An error occurred',
            response.status,
            data
        );
    }
    
    return data;
}

// Auth API service
export const authApi = {
    // Login user
    async login(username, password) {
        const response = await fetch(`${API_URL}/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
        });
        return handleResponse(response);
    },

    // Register user
    async register(userData) {
        const response = await fetch(`${API_URL}/auth/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
        });
        return handleResponse(response);
    },

    // Get current user profile
    async getProfile() {
        const token = localStorage.getItem('token');
        if (!token) {
            throw new ApiError('No authentication token', 401);
        }

        const response = await fetch(`${API_URL}/auth/profile`, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });
        return handleResponse(response);
    },
};

// Create axios-like request interceptor
export function setupApiInterceptors(store) {
    // Add a helper to check if token exists and is not expired
    window.addEventListener('storage', (e) => {
        if (e.key === 'token' && !e.newValue) {
            store.dispatch('auth/logout');
        }
    });
}
