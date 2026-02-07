import api from './api';
import { mockProducts } from '../data/mockProducts';

export const productService = {
    // Get all products with filters
    getAll: async (params = {}) => {
        try {
            const response = await api.get('/products', { params });
            return response.data;
        } catch (error) {
            console.error('❌ Products API Error:', error.response?.status, error.response?.data || error.message);
            console.warn('⚠️ Falling back to mock data due to API error');

            // Client-side filtering for mock data
            let filteredDocs = [...mockProducts];

            // Filter by Category
            if (params.category) {
                filteredDocs = filteredDocs.filter(p => p.category === params.category);
            }

            // Filter by Price
            if (params.minPrice) {
                filteredDocs = filteredDocs.filter(p => p.price >= Number(params.minPrice));
            }
            if (params.maxPrice) {
                filteredDocs = filteredDocs.filter(p => p.price <= Number(params.maxPrice));
            }

            // Filter by Search
            if (params.search) {
                const searchLower = params.search.toLowerCase();
                filteredDocs = filteredDocs.filter(p =>
                    p.name.toLowerCase().includes(searchLower) ||
                    p.description.toLowerCase().includes(searchLower)
                );
            }

            return {
                success: true,
                count: filteredDocs.length,
                pagination: {},
                data: filteredDocs,
                _isMockData: true // Flag to indicate this is mock data
            };
        }
    },

    // Get single product
    getById: async (id) => {
        try {
            const response = await api.get(`/products/${id}`);
            return response.data;
        } catch (error) {
            console.error('❌ Product API Error:', error.response?.status, error.response?.data || error.message);
            console.warn('⚠️ Falling back to mock data due to API error');
            const product = mockProducts.find(p => p._id === id);
            return {
                success: true,
                data: product || mockProducts[0],
                _isMockData: true
            };
        }
    },

    // Get products by category
    getByCategory: async (category) => {
        try {
            const response = await api.get(`/products/category/${category}`);
            return response.data;
        } catch (error) {
            console.error('❌ Category API Error:', error.response?.status, error.response?.data || error.message);
            console.warn('⚠️ Falling back to mock data due to API error');
            const filtered = mockProducts.filter(p => p.category === category);
            return {
                success: true,
                count: filtered.length,
                data: filtered,
                _isMockData: true
            };
        }
    },

    // Search products
    search: async (query) => {
        try {
            const response = await api.get('/products', { params: { search: query } });
            return response.data;
        } catch (error) {
            console.error('❌ Search API Error:', error.response?.status, error.response?.data || error.message);
            console.warn('⚠️ Falling back to mock data due to API error');
            return {
                success: true,
                data: mockProducts,
                _isMockData: true
            };
        }
    },

    // Create product (admin)
    create: async (productData) => {
        const response = await api.post('/products', productData);
        return response.data;
    },

    // Update product (admin)
    update: async (id, productData) => {
        const response = await api.put(`/products/${id}`, productData);
        return response.data;
    },

    // Delete product (admin)
    delete: async (id) => {
        const response = await api.delete(`/products/${id}`);
        return response.data;
    },
};

export default productService;
