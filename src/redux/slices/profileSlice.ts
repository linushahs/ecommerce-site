import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserProfileResponse } from "../interface";
import { type ImageFileType } from "@/hooks/useFilehandler";

type UserProfileState = { data: Partial<UserProfileResponse>, files: { avatar: ImageFileType | null }, loading: boolean };
let initialState: UserProfileState = {
    data: {},
    files: { avatar: null },
    loading: false,
}

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
        updateProfile: (state, action: PayloadAction<any>) => {
            return { ...state, data: { ...state.data, ...action.payload } }
        },
        clearProfile: () => { },
    },
});

export const { setProfile, clearProfile, updateProfile, setProfileLoading } = profileSlice.actions;

export default profileSlice.reducer;
