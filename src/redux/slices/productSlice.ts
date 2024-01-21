import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AllProductsResponse, ProductDetailsResponse } from "../api/interface";

type ProductState = Partial<AllProductsResponse & ProductDetailsResponse>;
const initialState: ProductState = {};

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    storeProducts(state, action: PayloadAction<AllProductsResponse>) {
      return { ...state, products: [...action.payload.results] }
    },
    storeSingleProduct(state, action: PayloadAction<ProductDetailsResponse>) {
      return { ...state, product: { ...action.payload.product }, related_products: { ...action.payload.related_products } };
    },
  },
});


export const { storeProducts, storeSingleProduct } = productSlice.actions;

export default productSlice.reducer;
