
import { createApi } from "@reduxjs/toolkit/query/react";
import { toast } from "sonner";
import { storeProducts, storeSingleProduct } from "../slices/productSlice";
import { baseQueryWithReauth, handleApiQuery } from "./apiUtils";
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
        addProductToWishlist: builder.mutation<void, Record<string, string>>({
            query: ({ slug, token }) => ({
                url: `/product/${slug}/add-to-wishlist/`,
                method: 'POST',

            }),
            async onQueryStarted(_, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;
                    toast.success("Product is added to wishlisht.")

                } catch (err) {
                    console.error(err);
                    toast.error("Error adding product to wishlist!")
                }
            },

            invalidatesTags: (result, error, id) => {
                return [{ type: 'Product', id: id.slug }]
            },

        }),
    }),
});

export const { useGetAllProductsQuery, useGetProductDetailsQuery, useAddProductToWishlistMutation } = productApi;