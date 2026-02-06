import api from './api';

export const authService = {
    // Register new user
    register: async (userData) => {
        const response = await api.post('/auth/register', userData);
        if (response.data.token) {
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('user', JSON.stringify(response.data.user));
        }
        return response.data;
    },

    // Login user
    login: async (credentials) => {
        const response = await api.post('/auth/login', credentials);
        if (response.data.token) {
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('user', JSON.stringify(response.data.user));
        }
        return response.data;
    },

    // Google Login
    googleLogin: async (token) => {
        const response = await api.post('/auth/google', { token });
        if (response.data.token) {
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('user', JSON.stringify(response.data.user));
        }
        return response.data;
    },

    // Logout user
    logout: () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
    },

    // Get current user
    getMe: async () => {
        const response = await api.get('/auth/me');
        return response.data;
    },

    // Update profile
    updateProfile: async (userData) => {
        const response = await api.put('/auth/update-profile', userData);
        return response.data;
    },

    // Update password
    updatePassword: async (passwords) => {
        const response = await api.put('/auth/update-password', passwords);
        return response.data;
    },

    // Add address
    addAddress: async (address) => {
        const response = await api.post('/auth/address', address);
        return response.data;
    },
};

export default authService;
