import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { AuthState } from "../interface";

const initialState: AuthState = {
  id: "",
  email: "",
  access: "",
  refresh: "",
  otp_verified: false
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action: PayloadAction<Record<string, any>>) => {
      console.log({ ...action.payload });

      return { ...state, ...action.payload };
    },
    logout: () => {
      return initialState;
    }
  },
});

export const { setCredentials, logout } = authSlice.actions;

export default authSlice.reducer;