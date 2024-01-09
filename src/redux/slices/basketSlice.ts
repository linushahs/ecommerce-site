import { Product } from '@/components/products/interface';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Initial State
const initialState: Product[] = [];

// Slice
const basketSlice = createSlice({
    name: 'basket',
    initialState,
    reducers: {
        setBasketItems: (state, action: PayloadAction<Product[]>) => {
            return action.payload;
        },
        addToBasket: (state, action: PayloadAction<Product>) => {
            if (state.some((product) => product.id === action.payload.id)) {
                return state;
            } else {
                return [action.payload, ...state];
            }
        },
        removeFromBasket: (state, action: PayloadAction<string>) => {
            return state.filter((product) => product.id !== action.payload);
        },
        clearBasket: () => {
            return [];
        },
        addQtyItem: (state, action: PayloadAction<string>) => {
            return state.map((product) =>
                product.id === action.payload
                    ? { ...product, quantity: product.quantity + 1 }
                    : product
            );
        },
        minusQtyItem: (state, action: PayloadAction<string>) => {
            return state.map((product) =>
                product.id === action.payload
                    ? { ...product, quantity: product.quantity - 1 }
                    : product
            );
        },
    },
});

// Export Actions
export const {
    setBasketItems,
    addToBasket,
    removeFromBasket,
    clearBasket,
    addQtyItem,
    minusQtyItem,
} = basketSlice.actions;

// Export Reducer
export default basketSlice.reducer;


