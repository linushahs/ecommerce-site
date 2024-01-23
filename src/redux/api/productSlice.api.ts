
import { createApi } from "@reduxjs/toolkit/query/react";
import { PathString } from "react-hook-form";
import { storeProducts, storeSingleProduct } from "../slices/productSlice";
import { baseQueryWithReauth, handleApiQuery, showToastMessages } from "./apiUtils";
import { AllProductsResponse, ProductDetailsResponse } from "./interface";

export const productApi = createApi({
    reducerPath: 'productApi',
    baseQuery: baseQueryWithReauth,
    tagTypes: ['Product'],
    endpoints: (builder) => ({
        getAllProducts: builder.query<AllProductsResponse, void>({
            providesTags: (res) =>
                res ? [...res.results.map(({ slug }) =>
                    ({ type: 'Product' as const, id: slug })),
                { type: 'Product', id: 'LIST' },
                ] : [{ type: 'Product', id: 'LIST' }],
            query: () => ({
                url: '/product/',
                method: 'GET',
            }),
            async onQueryStarted(_, { dispatch, queryFulfilled }) {
                handleApiQuery(dispatch, queryFulfilled, storeProducts, "Error fetching product details!");
            }
        }),
        getProductDetails: builder.query<ProductDetailsResponse, string>({
            query: (slug) => ({
                url: `/product/${slug}/`,
                method: 'GET',
            }),
            async onQueryStarted(_, { dispatch, queryFulfilled }) {
                handleApiQuery(dispatch, queryFulfilled, storeSingleProduct, "Error fetching product details!");
            }
        }),
        addProductToWishlist: builder.mutation<void, PathString>({
            query: (slug) => ({
                url: `/product/${slug}/add-to-wishlist/`,
                method: 'POST',

            }),
            async onQueryStarted(_, { dispatch, queryFulfilled }) {
                showToastMessages(queryFulfilled, "Product is added to wishlisht.", "Error adding product to wishlist!");
            },

            invalidatesTags: (result, error, id) => {
                return [{ type: 'Product', id }]
            },
        }),

        removeProductFromWishlist: builder.mutation<void, PathString>({
            query: (slug) => ({
                url: `/product/${slug}/remove-from-wishlist/`,
                method: 'POST',

            }),
            async onQueryStarted(_, { dispatch, queryFulfilled }) {
                showToastMessages(queryFulfilled, "Product is removed from wishlist.", "Error removing product from wishlist!");
            },

            invalidatesTags: (result, error, id) => {
                return [{ type: 'Product', id }]
            },

        }),
    }),
});

export const { useGetAllProductsQuery, useGetProductDetailsQuery, useAddProductToWishlistMutation, useRemoveProductFromWishlistMutation } = productApi;