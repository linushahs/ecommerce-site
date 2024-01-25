import { getValidAuthTokens } from "@/lib/cookies";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { deleteCookie } from "cookies-next";
import { AuthState } from "../api/interface";

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