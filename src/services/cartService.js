import api from './api';

export const cartService = {
    // Get user cart
    getCart: async () => {
        const response = await api.get('/cart');
        return response.data;
    },

    // Add item to cart
    addItem: async (item) => {
        const response = await api.post('/cart/add', item);
        return response.data;
    },

    // Update cart item
    updateItem: async (itemId, quantity) => {
        const response = await api.put(`/cart/update/${itemId}`, { quantity });
        return response.data;
    },

    // Remove item from cart
    removeItem: async (itemId) => {
        const response = await api.delete(`/cart/remove/${itemId}`);
        return response.data;
    },

    // Clear cart
    clearCart: async () => {
        const response = await api.delete('/cart/clear');
        return response.data;
    },
};

export default cartService;
