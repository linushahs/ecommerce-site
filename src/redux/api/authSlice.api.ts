import { BASE_API_URL } from '@/constants/api.constants'
import { LoginFormInputs, RegisterFormInputs } from '@/schemas/auth.schema'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { LoginAuthResponse, RegisterAuthResponse, ValidateOTPInputs } from '../interface'

// Define a service using a base URL and expected endpoints
export const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: fetchBaseQuery({ baseUrl: BASE_API_URL }),
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
        validateOtp: builder.mutation<LoginAuthResponse, ValidateOTPInputs>({
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
        }),

    }),
})

// Export hooks for usage in function components, which are
// auto-generated based on the defined endpoints
export const { useLoginMutation, useRegisterMutation, useValidateOtpMutation, useGenerateOtpMutation, useRequestPwResetMutation } = authApi