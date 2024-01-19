import { BASE_API_URL } from '@/constants/api.constants';
import { getValidAuthTokens } from '@/lib/cookies';
import { BaseQueryFn, FetchArgs, FetchBaseQueryError, createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { UserProfileResponse } from '../interface';
import { logout, setCredentials } from '../slices/authSlice';
import { setCookie } from 'cookies-next';
import { setProfile, setProfileLoading } from '../slices/profileSlice';
import { toast } from 'sonner';

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
                // `onStart` side-effect
                dispatch(setProfileLoading(true));
                try {
                    const { data } = await queryFulfilled
                    // `onSuccess` side-effect
                    dispatch(setProfile(data));
                    dispatch(setProfileLoading(false));
                } catch (err) {
                    // `onError` side-effect
                    toast.error('Error fetching profile!')
                }
            }
        }),
        updateUserProfile: builder.mutation<UserProfileResponse, { id: string, body: FormData }>({
            query: ({ id, body }) => ({
                url: `/user/${id}/`,
                method: "PATCH",
                body,
                formData: true
            }),
            async onQueryStarted(_, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled
                    // `onSuccess` side-effect
                    dispatch(setProfile(data));
                    toast.success('Successfully updated');
                } catch (err) {
                    console.error(err);
                    toast.error('Error updating profile!')
                }
            }
        })
    }),
});

export const { useGetUserProfileQuery, useUpdateUserProfileMutation } = profileApi;

export default profileApi;
