import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import productService from '../../services/productService';

export const fetchProducts = createAsyncThunk(
    'products/fetchProducts',
    async (params, { rejectWithValue }) => {
        try {
            return await productService.getAll(params);
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const fetchProductById = createAsyncThunk(
    'products/fetchProductById',
    async (id, { rejectWithValue }) => {
        try {
            return await productService.getById(id);
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

const initialState = {
    products: [],
    currentProduct: null,
    loading: false,
    error: null,
    filters: {
        category: '',
        minPrice: null,
        maxPrice: null,
        brand: '',
        search: '',
        sort: 'newest',
    },
    pagination: {
        page: 1,
        limit: 12,
        total: 0,
        pages: 0,
    },
};

const productSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
        setProducts: (state, action) => {
            state.products = action.payload.data;
            state.pagination = {
                page: action.payload.page,
                limit: action.payload.limit || 12,
                total: action.payload.total,
                pages: action.payload.pages,
            };
            state.loading = false;
        },
        setCurrentProduct: (state, action) => {
            state.currentProduct = action.payload;
            state.loading = false;
        },
        setFilters: (state, action) => {
            state.filters = { ...state.filters, ...action.payload };
        },
        clearFilters: (state) => {
            state.filters = initialState.filters;
        },
        setError: (state, action) => {
            state.error = action.payload;
            state.loading = false;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchProducts.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.products = action.payload.data;
                state.pagination = {
                    page: action.payload.page,
                    limit: action.payload.limit || 12,
                    total: action.payload.total,
                    pages: action.payload.pages,
                };
                state.loading = false;
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(fetchProductById.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchProductById.fulfilled, (state, action) => {
                state.currentProduct = action.payload.data;
                state.loading = false;
            })
            .addCase(fetchProductById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const {
    setLoading,
    setProducts,
    setCurrentProduct,
    setFilters,
    clearFilters,
    setError,
} = productSlice.actions;

export default productSlice.reducer;
