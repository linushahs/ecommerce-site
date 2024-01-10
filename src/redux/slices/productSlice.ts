import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { rootDomain } from "../../apis/info";
import { AppDispatch } from "../store";
import { Product } from "@/components/products/interface";
import { basketOfProduct } from "@/constants";


const initialState: Product[] = basketOfProduct;

// Create a slice
const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    storeProducts(state, action: PayloadAction<any[]>) {
      state = action.payload;
    },
  },
});

// Export the actions
export const { storeProducts } = productSlice.actions;

// Create an async thunk for fetching all products
export const fetchAllProducts = async (dispatch: AppDispatch) => {
  try {
    const res = await axios.get(`${rootDomain}/api/product`);
    dispatch(storeProducts(res.data.results));
  } catch (err) {
    // Handle error if needed
    console.error(err);
  }
};

// Export the reducer
export default productSlice.reducer;
