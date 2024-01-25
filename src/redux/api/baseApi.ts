import { FetchArgs, createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getValidAuthTokens } from "@/lib/cookies";
import { logout, setCredentials } from "../slices/authSlice";
import { setCookie } from "cookies-next";
import { BASE_API_URL } from "@/constants/api.constants";


export const baseQuery = fetchBaseQuery({
    baseUrl: BASE_API_URL,
});

export const baseApi = createApi({
    reducerPath: 'baseApi',
    baseQuery: async (args, api, extraOptions) => {
        let result;

        try {
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
        } catch (err) {
            throw new Error("Error refreshing token!");
        }

        return result
    },
    tagTypes: ["Product", "Cart", "Wishlist"],
    endpoints: () => ({}),
});

