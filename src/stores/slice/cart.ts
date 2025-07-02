import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product } from '../../types/products';

interface CartItem extends Product {
    quantity: number;
    isChecked: boolean;
}

interface CartState {
    items: CartItem[];
}

const initialState: CartState = {
    items: [],
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action: PayloadAction<Product>) => {
            const existing = state.items.find(item => item.id === action.payload.id);
            if (existing) {
                existing.quantity += 1;
            } else {
                state.items.push({ ...action.payload, quantity: 1, isChecked: false });
            }
        },
        removeFromCart: (state, action: PayloadAction<number>) => {
            state.items = state.items.filter(item => item.id !== action.payload);
        },
        updateQuantity: (state, action: PayloadAction<{ id: number, quantity: number }>) => {
            const item = state.items.find(item => item.id === action.payload.id);
            if (item) {
                item.quantity = action.payload.quantity;
            }
        },
        toggleCheck: (state, action: PayloadAction<number>) => {
            const item = state.items.find(item => item.id === action.payload);
            if (item) {
                item.isChecked = !item.isChecked;
            }
        },
        resetAllChecked: (state) => {
            state.items.forEach(item => {
                item.isChecked = false;
            })
        },
        clearCart: (state) => {
            state.items = [];
        }
    }
});

export const { addToCart, removeFromCart, updateQuantity, toggleCheck, resetAllChecked, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
