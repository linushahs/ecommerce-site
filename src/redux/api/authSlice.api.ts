import { BASE_API_URL } from '@/constants/api.constants'
import { LoginFormInputs, RegisterFormInputs } from '@/schemas/auth.schema'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { LoginAuthResponse, RegisterAuthResponse, ResetPasswordInputs, ValidateOTPInputs } from './interface'
import { setAuthCookie } from '@/lib/cookies'
import { toast } from 'sonner'
import { LOGIN_SUCESS } from '@/constants'
import { setCredentials } from '../slices/authSlice'

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
            }),
            async onQueryStarted(_, { queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;

                    setAuthCookie(data.access, 'access_token');
                    setAuthCookie(data.refresh, 'refresh_token');
                    setCredentials(data);
                    toast.success(LOGIN_SUCESS);

                } catch (err) {
                    toast.error((err as any).data.detail)
                }
            }
        }),
        register: builder.mutation<RegisterAuthResponse, RegisterFormInputs>({
            query: (body) => ({
                url: "/auth/",
                method: "POST",
                body
            }),
            async onQueryStarted(_, { queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;
                    setAuthCookie(data.id, "id");
                } catch (err) {
                    throw new Error("Error while registering!!");
                }
            }
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
        resetPassword: builder.mutation<LoginAuthResponse, ResetPasswordInputs>({
            query: (body) => ({
                url: `/auth/${body.id}/reset-password/`,
                method: "POST",
                body
            })
        }),
    }),
})

// Export hooks for usage in function components, which are
// auto-generated based on the defined endpoints
export const { useLoginMutation, useRegisterMutation, useValidateOtpMutation, useGenerateOtpMutation, useRequestPwResetMutation, useResetPasswordMutation } = authApi