import { BASE_API_URL } from "@/constants/api.constants";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query";

export const profileApi = createApi({
    reducerPath: 'profileApi',
    baseQuery: fetchBaseQuery({ baseUrl: BASE_API_URL }),
    endpoints: (builder) => ({
        getAllProducts: builder.query<unknown, void>({
            query: () => ({
                url: '/product/',
                method: 'GET',
            }),
        }),
    }),
});