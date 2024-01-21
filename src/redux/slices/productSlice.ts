import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { GetAllProductResponse } from "../api/interface";
import { ProductDetails } from "./interface";

type ProductState = Partial<GetAllProductResponse & { singleProduct: ProductDetails }>;
const initialState: ProductState = {};

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    storeProducts(state, action: PayloadAction<GetAllProductResponse>) {
      return { ...state, products: [...action.payload.results] }
    },
    storeSingleProduct(state, action: PayloadAction<ProductDetails>) {
      return { ...state, singleProduct: { ...action.payload } };
    },
  },
});


export const { storeProducts, storeSingleProduct } = productSlice.actions;

export default productSlice.reducer;
