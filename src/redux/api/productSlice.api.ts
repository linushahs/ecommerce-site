
import { createApi } from "@reduxjs/toolkit/query/react";
import { storeProducts, storeSingleProduct } from "../slices/productSlice";
import { baseQueryWithReauth, handleApiQuery, showToastMessages } from "./apiUtils";
import { AllProductsResponse, CartDetailsResponse, CartRequestBody, ProductDetailsResponse } from "./interface";

export const productApi = createApi({
    reducerPath: 'productApi',
    baseQuery: baseQueryWithReauth,
    tagTypes: ['Product', 'Cart'],
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
        addProductToWishlist: builder.mutation<void, string>({
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

        removeProductFromWishlist: builder.mutation<void, string>({
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

        getCartDetails: builder.query<CartDetailsResponse, void>({
            providesTags: (result) => (result ? [{ type: 'Cart', id: 'DETAILS' }] : []),
            query: () => ({
                url: '/cart/details/',
                method: 'GET',
            }),
            async onQueryStarted(_, { dispatch, queryFulfilled }) {
                showToastMessages(queryFulfilled, "Error fetching cart details!");
            },
        }),
        addToCart: builder.mutation<void, CartRequestBody>({
            query: (body) => ({
                url: `/cart/add-product/`,
                method: 'POST',
                body,
            }),
            async onQueryStarted(_, { dispatch, queryFulfilled }) {
                showToastMessages(queryFulfilled, "Error adding item to the cart!", "Item added to the cart.");
            },
            invalidatesTags: [{ type: 'Cart', id: 'DETAILS' }, { type: 'Product', id: "LIST" }],
        }),
        removeFromCart: builder.mutation<void, Pick<CartRequestBody, "product_id">>({
            query: (body) => ({
                url: `/cart/remove-product/`,
                method: 'POST',
                body,
            }),
            async onQueryStarted(_, { dispatch, queryFulfilled }) {
                showToastMessages(queryFulfilled, "Error removing item from the cart!", "Item removed from the cart.");
            },
            invalidatesTags: [{ type: 'Cart', id: 'DETAILS' }, { type: 'Product', id: "LIST" }],
        }),

        updateCart: builder.mutation<void, CartRequestBody>({
            query: (body) => ({
                url: `/cart/update-product/`,
                method: 'POST',
                body,
            }),
            async onQueryStarted(_, { dispatch, queryFulfilled }) {
                showToastMessages(queryFulfilled, "Error updating item from the cart!");
            },
            invalidatesTags: [{ type: 'Cart', id: 'DETAILS' }, { type: 'Product', id: "LIST" }],
        }),

        clearCart: builder.mutation<void, void>({
            query: () => ({
                url: `/cart/clear/`,
                method: 'POST',
            }),
            async onQueryStarted(_, { dispatch, queryFulfilled }) {
                showToastMessages(queryFulfilled, "Error clearing the cart!", "Items are cleared from the cart. ");
            },
            invalidatesTags: [{ type: 'Cart', id: 'DETAILS' }, { type: 'Product', id: "LIST" }],
        })
    }),
});

export const { useGetAllProductsQuery, useGetProductDetailsQuery, useAddProductToWishlistMutation, useRemoveProductFromWishlistMutation, useGetCartDetailsQuery, useAddToCartMutation, useRemoveFromCartMutation, useUpdateCartMutation, useClearCartMutation } = productApi;