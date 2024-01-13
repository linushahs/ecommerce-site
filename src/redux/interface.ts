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


export type { LoginAuthResponse, RegisterAuthResponse }
