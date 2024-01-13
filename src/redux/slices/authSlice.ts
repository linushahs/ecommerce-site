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
      return { ...state, ...action.payload };
    }
  },
});

export const { setCredentials } = authSlice.actions;

export default authSlice.reducer;