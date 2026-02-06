import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'https://new-project-1-beta-one.vercel.app';

const api = axios.create({
    baseURL: `${API_URL}/api/v1`,
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: false, // Change to false for now
});

// Add token to requests
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        console.log('🚀 API Request:', config.method.toUpperCase(), config.url);
        return config;
    },
    (error) => {
        console.error('❌ Request Error:', error);
        return Promise.reject(error);
    }
);

// Response interceptor
api.interceptors.response.use(
    (response) => {
        console.log('✅ API Response:', response.status, response.config.url);
        return response;
    },
    (error) => {
        console.error('❌ API Error:', error.response?.status, error.config?.url);
        console.error('Error details:', error.response?.data);
        return Promise.reject(error);
    }
);

const authService = {
    googleLogin: async (credential) => {
        try {
            console.log('📡 Sending Google credential to backend...');
            const response = await api.post('/auth/google', { credential });
            console.log('✅ Google login successful:', response.data);
            return response.data;
        } catch (error) {
            console.error('❌ Google login failed:', error.response?.data || error.message);
            throw error;
        }
    },

    login: async (userData) => {
        const response = await api.post('/auth/login', userData);
        return response.data;
    },

    register: async (userData) => {
        const response = await api.post('/auth/register', userData);
        return response.data;
    },
};

export default authService;