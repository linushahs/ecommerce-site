import { CartDetailsResponse, CartRequestBody, } from "./interface"
import { baseApi } from "./baseApi";
import { showToastMessages } from "./apiUtils";

export const cartApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getCartDetails: builder.query<CartDetailsResponse, void>({
            providesTags: (_) => ["Cart"],
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
            invalidatesTags: ['Cart', { type: 'Product', id: "LIST" }],
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
            invalidatesTags: ['Cart', { type: 'Product', id: "LIST" }],
        }),

        updateCart: builder.mutation<void, CartRequestBody>({
            query: (body) => ({
                url: `/cart/update-product/`,
                method: 'PATCH',
                body,
            }),
            async onQueryStarted(_, { dispatch, queryFulfilled }) {
                showToastMessages(queryFulfilled, "Error updating item from the cart!");
            },
            invalidatesTags: ['Cart', { type: 'Product', id: "LIST" }],
        }),

        clearCart: builder.mutation<void, void>({
            query: () => ({
                url: `/cart/clear/`,
                method: 'POST',
            }),
            async onQueryStarted(_, { dispatch, queryFulfilled }) {
                showToastMessages(queryFulfilled, "Error clearing the cart!", "Items are cleared from the cart. ");
            },
            invalidatesTags: ['Cart', { type: 'Product', id: "LIST" }],
        })
    }),
});

export const { useGetCartDetailsQuery, useAddToCartMutation, useRemoveFromCartMutation, useUpdateCartMutation, useClearCartMutation } = cartApi