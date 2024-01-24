import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CartDetailsResponse } from "../api/interface";

const initialState: Partial<CartDetailsResponse> = {};

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        storeCart(state, action: PayloadAction<CartDetailsResponse>) {
            return { ...state, ...action.payload }
        },
        // addQtyItem: (state, action: PayloadAction<number>) => {
        //     return {...state, products: state.products?.map((product) => {
        //         if()
        //     })}
        // },
        // minusQtyItem: (state, action: PayloadAction<string>) => {
        //     return state.map((product) =>
        //         product.id === action.payload
        //             ? { ...product, quantity: product.quantity - 1 }
        //             : product
        //     );
        // },
    },
});


export const { storeCart } = cartSlice.actions;

export default cartSlice.reducer;
