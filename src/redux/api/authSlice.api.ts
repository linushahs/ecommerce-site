// Need to use the React-specific entry point to allow generating React hooks
import { BASE_API_URL } from '@/constants/api.constants'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { RootState } from '../store'
import { LoginFormInputs, RegisterFormInputs } from '@/schemas/auth.schema'
import { LoginAuthResponse, RegisterAuthResponse } from '../interface'

// Define a service using a base URL and expected endpoints
export const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: fetchBaseQuery({
        baseUrl: BASE_API_URL,
        prepareHeaders: (headers, { getState }) => {
            // By default, if we have a token in the store, let's use that for authenticated requests
            const token = (getState() as RootState).auth.accessToken
            if (token) {
                headers.set('authorization', `Bearer ${token}`)
            }
            return headers
        },
    }),
    endpoints: (builder) => ({
        login: builder.mutation<LoginAuthResponse, LoginFormInputs>({
            query: (body) => ({
                url: "/auth/login/",
                method: "POST",
                body
            })
        }),
        register: builder.mutation<RegisterAuthResponse, RegisterFormInputs>({
            query: (body) => ({
                url: "/auth/",
                method: "POST",
                body
            })
        }),
        validateOtp: builder.mutation({
            query: (body) => ({
                url: "/auth/validate-otp/",
                method: "POST",
                body
            })
        }),
        generateOtp: builder.mutation({
            query: (body) => ({
                url: "/auth/generate-otp/",
                method: "POST",
                body
            })
        }),
        requestPwReset: builder.mutation({
            query: (body) => ({
                url: "/auth/request-password-reset/",
                method: "POST",
                body
            })
        })
    }),
})

// Export hooks for usage in function components, which are
// auto-generated based on the defined endpoints
export const { useLoginMutation, useRegisterMutation, useValidateOtpMutation, useGenerateOtpMutation, useRequestPwResetMutation } = authApi