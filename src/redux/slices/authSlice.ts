import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { LoginAuthResponse } from "../interface";


const initialState: LoginAuthResponse = {
  otp_verified: false,
  email: "",
  accessToken: "",
  refreshToken: ""
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (_, action: PayloadAction<LoginAuthResponse>) => {
      return action.payload;
    }
  },
});

export const { setCredentials } = authSlice.actions;

export default authSlice.reducer;