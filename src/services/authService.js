import api from './api';

const authService = {
    googleLogin: async (token) => {
        try {
            console.log('📡 Sending Google credential to backend...');
            const response = await api.post('/auth/google', { credential: token });
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

    getMe: async () => {
        const response = await api.get('/auth/me');
        return response.data;
    },

    updateProfile: async (userData) => {
        const response = await api.put('/auth/update-profile', userData);
        return response.data;
    },

    updatePassword: async (passwordData) => {
        const response = await api.put('/auth/update-password', passwordData);
        return response.data;
    },
};

export default authService;