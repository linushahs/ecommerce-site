
import { BASE_API_URL } from "@/constants/api.constants";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Product, ProductDetails } from "../slices/interface";
import { handleApiQuery } from "./apiUtils";
import { storeProducts, storeSingleProduct } from "../slices/productSlice";
import { GetAllProductResponse } from "./interface";

export const productApi = createApi({
    reducerPath: 'productApi',
    baseQuery: fetchBaseQuery({ baseUrl: BASE_API_URL }),
    endpoints: (builder) => ({
        getAllProducts: builder.query<GetAllProductResponse, void>({
            query: () => ({
                url: '/product/',
                method: 'GET',
            }),
            async onQueryStarted(_, { dispatch, queryFulfilled }) {
                handleApiQuery<GetAllProductResponse>(dispatch, queryFulfilled, storeProducts, "Error fetching product details!");
            }
        }),
        getProductDetails: builder.query<ProductDetails, string>({
            query: (slug) => ({
                url: `/product/${slug}`,
                method: 'GET',
            }),
            async onQueryStarted(_, { dispatch, queryFulfilled }) {
                handleApiQuery<ProductDetails>(dispatch, queryFulfilled, storeSingleProduct, "Error fetching product details!");
            }
        })
    }),
});

export const { useGetAllProductsQuery, useGetProductDetailsQuery } = productApi;