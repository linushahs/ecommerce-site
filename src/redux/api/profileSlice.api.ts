
import { createApi } from '@reduxjs/toolkit/query/react';
import { setProfile } from '../slices/profileSlice';
import { baseQueryWithReauth, handleApiMutation, handleApiQuery, showToastMessages } from './apiUtils';
import { AllProductsResponse, UserProfileResponse } from './interface';
import { Product } from '../slices/interface';


export const profileApi = createApi({
    reducerPath: 'profileApi',
    baseQuery: baseQueryWithReauth,
    endpoints: (builder) => ({
        getUserProfile: builder.query<UserProfileResponse, void>({
            query: () => ({
                url: '/user/me/',
                method: 'GET',
            }),
            async onQueryStarted(_, { dispatch, queryFulfilled }) {
                handleApiQuery(dispatch, queryFulfilled, setProfile, "Error fetching profile!");
            }
        }),
        updateUserProfile: builder.mutation<UserProfileResponse, { id: string, body: FormData }>({
            query: ({ id, body }) => ({
                url: `/user/${id}/`,
                method: "PATCH",
                body,
                formData: true
            }),
            onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
                handleApiMutation(dispatch, queryFulfilled, setProfile, "Successfully updated", "Error updating profile!");
            }
        }),

        getUserWishlist: builder.query<Product[], void>({
            query: () => ({
                url: '/user/wishlist/',
                method: 'GET',
            }),
            async onQueryStarted(_, { dispatch, queryFulfilled }) {
                showToastMessages(queryFulfilled, "Error fetching user wishlist!");
            }
        }),
    }),
});


export const { useGetUserProfileQuery, useUpdateUserProfileMutation, useGetUserWishlistQuery } = profileApi;

