type LoginAuthResponse = {
    otp_verified: boolean,
    email: string,
    access: string,
    refresh: string
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
    otp_verified: boolean,
    otp_id: number | undefined
}

type ValidateOTPInputs = {
    id: string;
    otp: number;
}

type ResetPasswordInputs = {
    password: string,
    otp_id: number,
    id: string
}



interface UserProfileResponse {
    id: string;
    email: string;
    date_joined: string;
    address_country: string;
    address_state: string;
    address_city: string;
    address_street1: string;
    address_street2: string;
    bio: string;
    occupation: string;
    date_of_birth: string;
    gender: string;
    full_name: string;
    phone_number: string;
    profile_picture: string;
}


export type { LoginAuthResponse, RegisterAuthResponse, AuthState, ValidateOTPInputs, UserProfileResponse, ResetPasswordInputs }
