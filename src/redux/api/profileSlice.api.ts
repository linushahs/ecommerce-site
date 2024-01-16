import { BASE_API_URL } from '@/constants/api.constants';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from '../store';
import { UserProfile } from '../interface';

export const profileApi = createApi({
    reducerPath: 'profileApi',
    baseQuery: fetchBaseQuery({
        baseUrl: BASE_API_URL,
        prepareHeaders: (headers, { getState }) => {
            const token = (getState() as RootState).auth.access;
            if (token) {
                headers.set('authorization', `Bearer ${token}`);
            }
            return headers;
        },
    }),
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
