type LoginAuthResponse = {
    otp_verified: boolean,
    email: string,
    accessToken: string,
    refreshToken: string
}

type RegisterAuthResponse = {
    id: string;
    email: string
}

type AuthState = {
    id: string | undefined,
    email: string | undefined,
    access: string | undefined,
    refresh: string | undefined,
    otp_verified: boolean
}

type ValidateOTPInputs = {
    id: string;
    otp: number;
}


export type { LoginAuthResponse, RegisterAuthResponse, AuthState, ValidateOTPInputs }
