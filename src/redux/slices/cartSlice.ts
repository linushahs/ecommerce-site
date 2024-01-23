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

    },
});


export const { storeCart } = cartSlice.actions;

export default cartSlice.reducer;
