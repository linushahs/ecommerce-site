
import { createApi } from '@reduxjs/toolkit/query/react';
import { setProfile } from '../slices/profileSlice';
import { baseQueryWithReauth, handleApiMutation, handleApiQuery } from './apiUtils';
import { UserProfileResponse } from './interface';


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
        })
    }),
});


export const { useGetUserProfileQuery, useUpdateUserProfileMutation } = profileApi;

