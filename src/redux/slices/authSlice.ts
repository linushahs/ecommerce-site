import { getValidAuthTokens, setAuthCookie } from "@/lib/cookies";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { deleteCookie } from "cookies-next";
import { authApi } from "../api/authSlice.api";
import { AuthState } from "../interface";

const initialState: Partial<AuthState> = {};

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

          return { ..._state, ...payload };
        }
      ).addMatcher(
        authApi.endpoints.register.matchFulfilled, (_state, { payload }) => {
          setAuthCookie(payload.id, "id");

          return { ..._state, ...payload }
        }
      )
  }
});


// Async action creator for initializing tokens
export const initializeAuthTokens = createAsyncThunk(
  'auth/initializeAuthTokens',
  async (_, { dispatch }) => {
    const access = getValidAuthTokens("access");
    const refresh = getValidAuthTokens("refresh");

    if (access && refresh) {
      dispatch(authSlice.actions.setCredentials({ access, refresh }));
    }
  }
);


export const { setCredentials, logout } = authSlice.actions;

export default authSlice.reducer;