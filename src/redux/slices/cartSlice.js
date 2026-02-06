import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import cartService from '../../services/cartService';

export const fetchCart = createAsyncThunk(
    'cart/fetchCart',
    async (_, { rejectWithValue }) => {
        try {
            return await cartService.getCart();
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || error.message);
        }
    }
);

export const addItemToCart = createAsyncThunk(
    'cart/addItemToCart',
    async (itemData, { rejectWithValue }) => {
        try {
            return await cartService.addItem(itemData);
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || error.message);
        }
    }
);

export const updateCartQuantity = createAsyncThunk(
    'cart/updateCartQuantity',
    async ({ itemId, quantity }, { rejectWithValue }) => {
        try {
            return await cartService.updateItem(itemId, quantity);
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || error.message);
        }
    }
);

export const removeItemFromCart = createAsyncThunk(
    'cart/removeItemFromCart',
    async (itemId, { rejectWithValue }) => {
        try {
            return await cartService.removeItem(itemId);
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || error.message);
        }
    }
);

const initialState = {
    items: [],
    totalPrice: 0,
    loading: false,
    error: null,
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        clearCart: (state) => {
            state.items = [];
            state.totalPrice = 0;
        },
    },
    extraReducers: (builder) => {
        builder
            // Fetch Cart
            .addCase(fetchCart.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchCart.fulfilled, (state, action) => {
                state.items = action.payload.data.items || [];
                state.totalPrice = action.payload.data.totalPrice || 0;
                state.loading = false;
            })
            .addCase(fetchCart.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // Add Item
            .addCase(addItemToCart.pending, (state) => {
                state.loading = true;
            })
            .addCase(addItemToCart.fulfilled, (state, action) => {
                state.items = action.payload.data.items;
                state.totalPrice = action.payload.data.totalPrice;
                state.loading = false;
            })
            .addCase(addItemToCart.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // Update Item
            .addCase(updateCartQuantity.fulfilled, (state, action) => {
                state.items = action.payload.data.items;
                state.totalPrice = action.payload.data.totalPrice;
                state.loading = false;
            })
            // Remove Item
            .addCase(removeItemFromCart.fulfilled, (state, action) => {
                state.items = action.payload.data.items;
                state.totalPrice = action.payload.data.totalPrice;
                state.loading = false;
            });
    },
});

export const {
    clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;
