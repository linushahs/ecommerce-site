import { BASE_API_URL } from '@/constants/api.constants';
import { getValidAuthTokens } from '@/lib/cookies';
import { BaseQueryFn, FetchArgs, FetchBaseQueryError, createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { UserProfile } from '../interface';
import { logout, setCredentials } from '../slices/authSlice';
import { setCookie } from 'cookies-next';

const baseQuery = fetchBaseQuery({
    baseUrl: BASE_API_URL,
});

const baseQueryWithReauth: BaseQueryFn<
    string | FetchArgs,
    unknown,
    FetchBaseQueryError
> = async (args, api, extraOptions) => {
    let result = await baseQuery(args, api, extraOptions)
    if (result.error && result.error.status === 401) {

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
        }
    }
    return result
}

export const profileApi = createApi({
    reducerPath: 'profileApi',
    baseQuery: baseQueryWithReauth,
    endpoints: (builder) => ({
        getUserProfile: builder.query<UserProfile, void>({
            query: () => ({
                url: '/user/me/',
                method: 'GET',

            }),
        }),
    }),
});

export const { useGetUserProfileQuery } = profileApi;

export default profileApi;
