import api from './api';

import { mockProducts } from '../data/mockProducts';

export const productService = {
    // Get all products with filters
    getAll: async (params = {}) => {
        try {
            const response = await api.get('/products', { params });
            return response.data;
        } catch (error) {
            console.warn('API unavailable, using mock data');

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
                data: filteredDocs
            };
        }
    },

    // Get single product
    getById: async (id) => {
        try {
            const response = await api.get(`/products/${id}`);
            return response.data;
        } catch (error) {
            console.warn('API unavailable, using mock data');
            const product = mockProducts.find(p => p._id === id);
            return {
                success: true,
                data: product || mockProducts[0]
            };
        }
    },

    // Get products by category
    getByCategory: async (category) => {
        try {
            const response = await api.get(`/products/category/${category}`);
            return response.data;
        } catch (error) {
            console.warn('API unavailable, using mock data');
            const filtered = mockProducts.filter(p => p.category === category);
            return {
                success: true,
                count: filtered.length,
                data: filtered
            };
        }
    },

    // Search products
    search: async (query) => {
        try {
            const response = await api.get('/products', { params: { search: query } });
            return response.data;
        } catch (error) {
            console.warn('API unavailable, using mock data');
            return {
                success: true,
                data: mockProducts
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
