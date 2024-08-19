"use client";
import { configureStore } from "@reduxjs/toolkit"
import { apiSlice } from "./api/apiSlice";
import cartReducer from './slices/Cart';
import authSlice from "./queries/auth/authSlice";
import addressReducer from "./slices/address"
export const makeStore = () => {
  return configureStore({
    reducer: {
      [apiSlice.reducerPath]: apiSlice.reducer,
      cart: cartReducer,
      auth: authSlice,
      address: addressReducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(apiSlice.middleware),
  })
}

export type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']  


