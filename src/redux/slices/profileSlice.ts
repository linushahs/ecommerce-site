import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserProfileResponse } from "../api/interface";
import { type ImageFileType } from "@/hooks/useFilehandler";

type UserProfileState = { data: Partial<UserProfileResponse>, files: { avatar: ImageFileType | null } };
let initialState: UserProfileState = {
    data: {},
    files: { avatar: null },
}

const profileSlice = createSlice({
    name: "profile",
    initialState,
    reducers: {
        setProfile: (state, action: PayloadAction<UserProfileResponse>) => {
            return { ...state, data: { ...action.payload } };
        },

        updateProfile: (state, action: PayloadAction<any>) => {
            return { ...state, data: { ...state.data, ...action.payload } }
        },
        clearProfile: () => { },
    },
});

export const { setProfile, clearProfile, updateProfile } = profileSlice.actions;

export default profileSlice.reducer;
