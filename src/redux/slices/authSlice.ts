import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { AppDispatch } from "../store";

interface AuthState {
  user: any; // Update the type accordingly
  isLogged: boolean;
  isAdmin: boolean;
}

const initialState: AuthState = {
  user: null,
  isLogged: false,
  isAdmin: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<any[]>) => {
      state.isLogged = true;
      state.user = action.payload;
    },
    logout: (state) => {
      state.isLogged = false;
    },
  },
});

export const { login, logout } = authSlice.actions;

// function for fetching user information
export const loginUser = (token: string) => async (dispatch: AppDispatch) => {
  try {
    const res = await axios.post("/user/login", {
      headers: { Authorization: token },
    });
    dispatch(login(res.data));
  } catch (error) {
    console.error(error);
  }
};

export default authSlice.reducer;
