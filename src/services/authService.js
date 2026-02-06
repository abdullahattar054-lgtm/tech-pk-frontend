import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'https://new-project-1-beta-one.vercel.app/api/v1https://your-backend.vercel.app';

const api = axios.create({
    baseURL: `${API_URL}/api/v1`,
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true, // Important for CORS
});

// Add token to requests
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

const authService = {
    // Google Login
    googleLogin: async (credential) => {
        try {
            const response = await api.post('/auth/google', { credential });
            return response.data;
        } catch (error) {
            console.error('Google login error:', error.response?.data || error.message);
            throw error;
        }
    },

    // Regular Login
    login: async (userData) => {
        const response = await api.post('/auth/login', userData);
        return response.data;
    },

    // Register
    register: async (userData) => {
        const response = await api.post('/auth/register', userData);
        return response.data;
    },
};

export default authService; import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'https://new-project-1-beta-one.vercel.app/api/v1://your-backend.vercel.app';

const api = axios.create({
    baseURL: `${API_URL}/api/v1`,
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true, // Important for CORS
});

// Add token to requests
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

const authService = {
    // Google Login
    googleLogin: async (credential) => {
        try {
            const response = await api.post('/auth/google', { credential });
            return response.data;
        } catch (error) {
            console.error('Google login error:', error.response?.data || error.message);
            throw error;
        }
    },

    // Regular Login
    login: async (userData) => {
        const response = await api.post('/auth/login', userData);
        return response.data;
    },

    // Register
    register: async (userData) => {
        const response = await api.post('/auth/register', userData);
        return response.data;
    },
};

export default authService;