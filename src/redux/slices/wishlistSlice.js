import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import wishlistService from '../../services/wishlistService';

// Async thunks for API calls
export const fetchWishlist = createAsyncThunk(
    'wishlist/fetchWishlist',
    async (_, { rejectWithValue }) => {
        try {
            const response = await wishlistService.getWishlist();
            return response;
        } catch (error) {
            return rejectWithValue(error.message || 'Failed to fetch wishlist');
        }
    }
);

export const addToWishlistAsync = createAsyncThunk(
    'wishlist/addToWishlist',
    async (productId, { rejectWithValue }) => {
        try {
            const response = await wishlistService.addToWishlist(productId);
            return response;
        } catch (error) {
            return rejectWithValue(error.message || 'Failed to add to wishlist');
        }
    }
);

export const removeFromWishlistAsync = createAsyncThunk(
    'wishlist/removeFromWishlist',
    async (productId, { rejectWithValue }) => {
        try {
            const response = await wishlistService.removeFromWishlist(productId);
            return response;
        } catch (error) {
            return rejectWithValue(error.message || 'Failed to remove from wishlist');
        }
    }
);

export const toggleWishlistAsync = createAsyncThunk(
    'wishlist/toggleWishlist',
    async (productId, { rejectWithValue }) => {
        try {
            const response = await wishlistService.toggleWishlist(productId);
            return response;
        } catch (error) {
            return rejectWithValue(error.message || 'Failed to toggle wishlist');
        }
    }
);

export const clearWishlistAsync = createAsyncThunk(
    'wishlist/clearWishlist',
    async (_, { rejectWithValue }) => {
        try {
            const response = await wishlistService.clearWishlist();
            return response;
        } catch (error) {
            return rejectWithValue(error.message || 'Failed to clear wishlist');
        }
    }
);

const initialState = {
    items: JSON.parse(localStorage.getItem('wishlist')) || [],
    loading: false,
    error: null,
};

const wishlistSlice = createSlice({
    name: 'wishlist',
    initialState,
    reducers: {
        // Local-only actions for non-authenticated users
        toggleWishlistLocal: (state, action) => {
            const product = action.payload;
            const exists = state.items.find(item => item._id === product._id);
            if (exists) {
                state.items = state.items.filter(item => item._id !== product._id);
            } else {
                state.items.push(product);
            }
            localStorage.setItem('wishlist', JSON.stringify(state.items));
        },
        removeFromWishlistLocal: (state, action) => {
            state.items = state.items.filter(item => item._id !== action.payload);
            localStorage.setItem('wishlist', JSON.stringify(state.items));
        },
        clearWishlistLocal: (state) => {
            state.items = [];
            localStorage.removeItem('wishlist');
        },
        syncWishlistFromStorage: (state) => {
            state.items = JSON.parse(localStorage.getItem('wishlist')) || [];
        },
    },
    extraReducers: (builder) => {
        builder
            // Fetch wishlist
            .addCase(fetchWishlist.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchWishlist.fulfilled, (state, action) => {
                state.items = action.payload.data || [];
                state.loading = false;
                localStorage.setItem('wishlist', JSON.stringify(state.items));
            })
            .addCase(fetchWishlist.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // Add to wishlist
            .addCase(addToWishlistAsync.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(addToWishlistAsync.fulfilled, (state, action) => {
                state.items = action.payload.data || [];
                state.loading = false;
                localStorage.setItem('wishlist', JSON.stringify(state.items));
            })
            .addCase(addToWishlistAsync.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // Remove from wishlist
            .addCase(removeFromWishlistAsync.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(removeFromWishlistAsync.fulfilled, (state, action) => {
                state.items = action.payload.data || [];
                state.loading = false;
                localStorage.setItem('wishlist', JSON.stringify(state.items));
            })
            .addCase(removeFromWishlistAsync.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // Toggle wishlist
            .addCase(toggleWishlistAsync.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(toggleWishlistAsync.fulfilled, (state, action) => {
                state.items = action.payload.data || [];
                state.loading = false;
                localStorage.setItem('wishlist', JSON.stringify(state.items));
            })
            .addCase(toggleWishlistAsync.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // Clear wishlist
            .addCase(clearWishlistAsync.fulfilled, (state) => {
                state.items = [];
                state.loading = false;
                localStorage.removeItem('wishlist');
            });
    },
});

export const { 
    toggleWishlistLocal, 
    removeFromWishlistLocal, 
    clearWishlistLocal,
    syncWishlistFromStorage 
} = wishlistSlice.actions;

// Backward compatibility exports
export const toggleWishlist = toggleWishlistLocal;
export const removeFromWishlist = removeFromWishlistLocal;

export default wishlistSlice.reducer;
