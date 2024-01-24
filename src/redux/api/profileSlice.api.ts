
import { Product } from '../slices/interface';
import { setProfile } from '../slices/profileSlice';
import { handleApiMutation, handleApiQuery, showToastMessages } from './apiUtils';
import { baseApi } from './baseApi';
import { UserProfileResponse } from './interface';


export const profileApi = baseApi.injectEndpoints({
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
            providesTags: (_) => ['Wishlist'],
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

