import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface AuthState {
  otp_verified: boolean,
  email: string,
  accessToken: string,
  refreshToken: string
}

const initialState: AuthState = {
  otp_verified: false,
  email: "",
  accessToken: "",
  refreshToken: ""
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (_, action: PayloadAction<AuthState>) => {
      return action.payload;
    }
  },
});

export const { setCredentials } = authSlice.actions;

export default authSlice.reducer;