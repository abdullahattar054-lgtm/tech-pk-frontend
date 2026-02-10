import api from './api';
import { mockProducts } from '../data/mockProducts';

/**
 * Product service layer — handles API communication and provides
 * graceful mock-data fallback when the API is unreachable.
 */
export const productService = {
    /** Fetch all products with optional filters/pagination */
    getAll: async (params = {}) => {
        try {
            const response = await api.get('/products', { params });
            return response.data;
        } catch (error) {
            console.warn('[ProductService] API unreachable, using mock data:', error.message);

            // Client-side filtering for mock data fallback
            let filtered = [...mockProducts];

            if (params.category) {
                filtered = filtered.filter(p => p.category === params.category);
            }
            if (params.minPrice) {
                filtered = filtered.filter(p => p.price >= Number(params.minPrice));
            }
            if (params.maxPrice) {
                filtered = filtered.filter(p => p.price <= Number(params.maxPrice));
            }
            if (params.search) {
                const q = params.search.toLowerCase();
                filtered = filtered.filter(p =>
                    p.name.toLowerCase().includes(q) ||
                    p.description.toLowerCase().includes(q)
                );
            }

            return {
                success: true,
                count: filtered.length,
                total: filtered.length,
                page: 1,
                pages: 1,
                data: filtered,
                _isMockData: true,
            };
        }
    },

    /** Fetch a single product by its ID */
    getById: async (id) => {
        try {
            const response = await api.get(`/products/${id}`);
            return response.data;
        } catch (error) {
            console.warn('[ProductService] API unreachable for product:', id, error.message);
            const product = mockProducts.find(p => p._id === id);
            return {
                success: true,
                data: product || mockProducts[0],
                _isMockData: true,
            };
        }
    },

    /** Fetch products filtered by category */
    getByCategory: async (category) => {
        try {
            const response = await api.get(`/products/category/${category}`);
            return response.data;
        } catch (error) {
            console.warn('[ProductService] API unreachable for category:', category, error.message);
            const filtered = mockProducts.filter(p => p.category === category);
            return {
                success: true,
                count: filtered.length,
                data: filtered,
                _isMockData: true,
            };
        }
    },

    /** Search products by keyword */
    search: async (query) => {
        try {
            const response = await api.get('/products', { params: { search: query } });
            return response.data;
        } catch (error) {
            console.warn('[ProductService] Search API unreachable:', error.message);
            const q = query.toLowerCase();
            const filtered = mockProducts.filter(p =>
                p.name.toLowerCase().includes(q) ||
                p.description.toLowerCase().includes(q)
            );
            return {
                success: true,
                count: filtered.length,
                data: filtered,
                _isMockData: true,
            };
        }
    },

    /** Create a product (admin) */
    create: async (productData) => {
        const response = await api.post('/products', productData);
        return response.data;
    },

    /** Update a product (admin) */
    update: async (id, productData) => {
        const response = await api.put(`/products/${id}`, productData);
        return response.data;
    },

    /** Delete a product (admin) */
    delete: async (id) => {
        const response = await api.delete(`/products/${id}`);
        return response.data;
    },
};

export default productService;
