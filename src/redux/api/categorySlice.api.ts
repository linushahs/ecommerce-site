
import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery, showToastMessages } from "./apiUtils";
import { CategoryResponse } from "./interface";

export const categoryApi = createApi({
    reducerPath: 'categoryApi',
    baseQuery,
    tagTypes: ['Category'],
    endpoints: (builder) => ({
        getCategories: builder.query<CategoryResponse[], void>({
            query: () => ({
                url: '/category/',
                method: 'GET',
            }),
            async onQueryStarted(_, { dispatch, queryFulfilled }) {
                showToastMessages(queryFulfilled, "Error fetching categories !");
            }
        }),


    }),
});

export const { useGetCategoriesQuery } = categoryApi;