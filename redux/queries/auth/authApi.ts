
import { apiSlice } from "@/redux/api/apiSlice";
import { userLoggedIn, userLoggedOut } from "./authSlice";
import Cookies from "js-cookie";
import React from "react";


export const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({

    login: builder.mutation({
      query: ({ username, password }) => ({
        url: `users/login/`,
        method: "POST",
        body: {
        username,
        password,
        },
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          Cookies.set("accessToken", result.data.access);
          Cookies.set("refreshToken", result.data.refresh);
          dispatch(
            userLoggedIn({
              accessToken: result.data.access,
              refreshToken: result.data.refresh,
            })
          );
        } catch (error: any) {
          console.log(error);
        }
      },
    }),
    createAccount: builder.mutation({
      query: (data) => ({
        url: `users/register/`,
        method: "POST",
        body: data,
      }),
    }),
  }),
});
export const {
 
  useLoginMutation,
  useCreateAccountMutation,

} = authApi;
