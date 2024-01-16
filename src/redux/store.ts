import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { composeWithDevTools } from 'redux-devtools-extension';
import { authApi } from "./api/authSlice.api";
import profileApi from "./api/profileSlice.api";
import { authReducer, basketReducer, productReducer, profileReducer } from "./slices";

const authPersistConfig = {
  key: 'auth',
  storage: storage,
  whitelist: ['access', 'refresh'],
};

const authPersitReducer = persistReducer<ReturnType<typeof authReducer>>(authPersistConfig, authReducer);

export const store = configureStore({
  reducer: {
    auth: authPersitReducer,
    product: productReducer,
    basket: basketReducer,
    profile: profileReducer,
    [authApi.reducerPath]: authApi.reducer,
    [profileApi.reducerPath]: profileApi.reducer
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).concat(authApi.middleware, profileApi.middleware),

  devTools: true,
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const persistor = persistStore(store);
