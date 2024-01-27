import { storeProducts, storeSingleProduct } from "../slices/productSlice";
import { buildProductApiUrl, handleApiQuery, showToastMessages } from "./apiUtils";
import { baseApi } from "./baseApi";
import { AllProductsResponse, CategoryResponse, ProductDetailsResponse, ProductFilterOptions } from "./interface";

export const productApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getAllProducts: builder.query<AllProductsResponse, ProductFilterOptions>({
            providesTags: (res) =>
                res ? [...res.results.map(({ slug }) =>
                    ({ type: 'Product' as const, id: slug })),
                { type: 'Product', id: 'LIST' },
                ] : [{ type: 'Product', id: 'LIST' }],
            query: ({ category, query, order }) => ({
                url: buildProductApiUrl("/product", { category, query, order }),
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

        getCategories: builder.query<CategoryResponse[], void>({
            query: () => ({
                url: '/category/',
                method: 'GET',
            }),
            async onQueryStarted(_, { dispatch, queryFulfilled }) {
                showToastMessages(queryFulfilled, "Error fetching categories !");
            }
        }),

        // getFilteredProducts

        addProductToWishlist: builder.mutation<void, string>({
            query: (slug) => ({
                url: `/product/${slug}/add-to-wishlist/`,
                method: 'POST',

            }),
            async onQueryStarted(_, { dispatch, queryFulfilled }) {
                showToastMessages(queryFulfilled, "Product is added to wishlisht.", "Error adding product to wishlist!");
            },

            invalidatesTags: (result, error, id) => {
                return [{ type: 'Product', id }, 'Wishlist']
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
                return [{ type: 'Product', id }, 'Wishlist']
            },

        }),


    }),
});

export const { useGetAllProductsQuery, useGetProductDetailsQuery, useAddProductToWishlistMutation, useRemoveProductFromWishlistMutation, useGetCategoriesQuery } = productApi;