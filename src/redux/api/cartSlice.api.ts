import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth, showToastMessages } from "./apiUtils";
import { CartDetailsResponse, CartRequestBody } from "./interface";

export const cartApi = createApi({
    reducerPath: 'cartApi',
    baseQuery: baseQueryWithReauth,
    tagTypes: ['Cart'],
    endpoints: (builder) => ({
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
            invalidatesTags: [{ type: 'Cart', id: 'DETAILS' }],
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
            invalidatesTags: [{ type: 'Cart', id: 'DETAILS' }],
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
            invalidatesTags: [{ type: 'Cart', id: 'DETAILS' }],
        }),

        clearCart: builder.mutation<void, void>({
            query: () => ({
                url: `/cart/clear/`,
                method: 'POST',
            }),
            async onQueryStarted(_, { dispatch, queryFulfilled }) {
                showToastMessages(queryFulfilled, "Error clearing the cart!", "Items are cleared from the cart. ");
            },
            invalidatesTags: [{ type: 'Cart', id: 'DETAILS' }],
        })
    }),
});

export const { useGetCartDetailsQuery, useAddToCartMutation, useRemoveFromCartMutation, useUpdateCartMutation } = cartApi;
