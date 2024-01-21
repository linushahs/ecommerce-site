
import { BASE_API_URL } from '@/constants/api.constants';
import { getValidAuthTokens } from '@/lib/cookies';
import { BaseQueryFn, FetchArgs, FetchBaseQueryError, createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { setCookie } from 'cookies-next';
import { logout, setCredentials } from '../slices/authSlice';
import { setProfile } from '../slices/profileSlice';
import { handleApiMutation, handleApiQuery } from './apiUtils';
import { UserProfileResponse } from './interface';

const baseQuery = fetchBaseQuery({
    baseUrl: BASE_API_URL,
});

const baseQueryWithReauth: BaseQueryFn<
    string | FetchArgs,
    unknown,
    FetchBaseQueryError
> = async (args, api, extraOptions) => {
    let result;

    const { data } = await baseQuery({
        url: '/token/refresh/',
        method: 'POST',
        body: { refresh: getValidAuthTokens('refresh') },

    }, api, extraOptions)

    if (data) {
        const token = (data as any).access;
        // store the new token
        api.dispatch(setCredentials(data))
        setCookie("access_token", token);

        //set headers with new access token
        const updatedHeaders = {
            'Authorization': `Bearer ${token}`,
        };

        result = await baseQuery(
            { ...args as FetchArgs, headers: updatedHeaders },
            api,
            extraOptions
        );
    } else {
        api.dispatch(logout())
        result = await baseQuery(args, api, extraOptions);
    }

    return result
}

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

