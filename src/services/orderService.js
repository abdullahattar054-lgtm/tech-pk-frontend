import api from './api';

export const orderService = {
    // Create new order
    createOrder: async (orderData) => {
        const response = await api.post('/orders', orderData);
        return response.data;
    },

    // Get user orders
    getMyOrders: async () => {
        const response = await api.get('/orders/myorders');
        return response.data;
    },

    // Get order details
    getOrderDetails: async (id) => {
        const response = await api.get(`/orders/${id}`);
        return response.data;
    },

    // Update order status (Admin)
    updateOrder: async (id, status) => {
        const response = await api.put(`/orders/${id}`, { status });
        return response.data;
    },

    // Delete order (Admin)
    deleteOrder: async (id) => {
        const response = await api.delete(`/orders/${id}`);
        return response.data;
    }
};

export default orderService;
