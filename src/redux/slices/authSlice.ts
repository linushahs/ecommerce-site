import { getValidAuthTokens, setAuthCookie } from "@/lib/cookies";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { deleteCookie } from "cookies-next";
import { authApi } from "../api/authSlice.api";
import { AuthState } from "../interface";

const initialState: Partial<AuthState> = {
  access: getValidAuthTokens("access"),
  refresh: getValidAuthTokens("refresh")
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action: PayloadAction<Partial<AuthState>>) => {
      return { ...state, ...action.payload };
    },
    logout: () => {
      deleteCookie("access_token");
      deleteCookie("refresh_token");
      return {};
    }
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(
        authApi.endpoints.login.matchFulfilled,
        (_state, { payload }) => {
          // set the token in the cookies
          setAuthCookie(payload.access, 'access_token');
          setAuthCookie(payload.refresh, 'refresh_token');

          return payload;
        }
      )
  }
});

export const { setCredentials, logout } = authSlice.actions;

export default authSlice.reducer;