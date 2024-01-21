import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Product } from "./interface";

const initialState: Product[] = [];

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    storeProducts(state, action: PayloadAction<Product[]>) {
      return [...state, ...action.payload]
    },
    storeSingleProduct(state, action: PayloadAction<Product>) {
      return [...state, action.payload];
    },
  },
});


export const { storeProducts, storeSingleProduct } = productSlice.actions;

export default productSlice.reducer;
