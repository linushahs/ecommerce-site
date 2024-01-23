import { BASE_API_URL } from "@/constants/api.constants";
import { getValidAuthTokens } from "@/lib/cookies";
import { BaseQueryFn, FetchArgs, FetchBaseQueryError, fetchBaseQuery } from "@reduxjs/toolkit/query";
import { toast } from "sonner";
import { logout, setCredentials } from "../slices/authSlice";
import { setCookie } from "cookies-next";

const baseQuery = fetchBaseQuery({
    baseUrl: BASE_API_URL,
});

export const baseQueryWithReauth: BaseQueryFn<
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


const handleApiQuery = async<T>(dispatch: any,
    queryFn: Promise<{ data: T }>,
    onSuccess: (data: T) => void,
    onErrorMessage: string) => {
    try {
        const { data } = await queryFn;
        dispatch(onSuccess(data));
    } catch (err) {
        console.error(err);
        toast.error(onErrorMessage);
    }
};

const handleApiMutation = async<T>(dispatch: any,
    queryFn: Promise<{ data: T }>,
    onSuccess: (data: T) => void,
    onSuccessMessage: string,
    onErrorMessage: string) => {
    try {
        const { data } = await queryFn;
        dispatch(onSuccess(data));
        toast.success(onSuccessMessage);
    } catch (err) {
        console.error(err);
        toast.error(onErrorMessage);
    }
};

const showToastMessages = async (
    queryFulfilled: Promise<{ data: any }>,
    errorMessage: string,
    successMessage?: string,
) => {
    try {
        await queryFulfilled;
        successMessage && toast.success(successMessage || "Operation successful");
    } catch (err) {
        console.error(err);
        toast.error(errorMessage || "Error performing operation");
    }
};

export { handleApiMutation, handleApiQuery, showToastMessages };
