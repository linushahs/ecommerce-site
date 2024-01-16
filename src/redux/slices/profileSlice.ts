
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ProfileState } from "../interface";

const initialState: ProfileState = {
    fullname: "Sunil Shah",
    email: "sunil2004@gmail.com",
    address: "Kathmandu",
    mobile: { value: "9102812123" },
    dateJoined: null,
    avatar: "",
    banner: "",
};

const profileSlice = createSlice({
    name: "profile",
    initialState,
    reducers: {
        setProfile: (state, action: PayloadAction<ProfileState>) => {
            return { ...state, ...action.payload };
        },
        clearProfile: () => initialState,
    },
});

export const { setProfile, clearProfile } = profileSlice.actions;

export default profileSlice.reducer;
