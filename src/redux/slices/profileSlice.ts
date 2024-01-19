import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserProfileResponse } from "../interface";

type UserProfileState = { data: Partial<UserProfileResponse>, loading: boolean };
let initialState: Partial<UserProfileState> = {}

const profileSlice = createSlice({
    name: "profile",
    initialState,
    reducers: {
        setProfile: (state, action: PayloadAction<UserProfileResponse>) => {
            return { ...state, data: { ...action.payload } };
        },
        setProfileLoading: (state, action: PayloadAction<boolean>) => {
            return { ...state, loading: action.payload }
        },
        clearProfile: () => { },
    },
});

export const { setProfile, clearProfile, setProfileLoading } = profileSlice.actions;

export default profileSlice.reducer;
