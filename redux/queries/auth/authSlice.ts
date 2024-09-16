import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  message: "",
    user: "",
    token:""
};

const authSlice = createSlice({
    name : "auth",
    initialState,
    reducers:{
        // userRegistration : ( state, action: PayloadAction<{ message: string }>)=>{
        //     state.message = action.payload.message;
        // },
        userLoggedIn: (
          state: any,
          action: PayloadAction<{
            accessToken: string;
            // user: string;
            refreshToken: string;
            }>
          ) => {
            state.token = action.payload.accessToken;
            state.refreshToken = action.payload.refreshToken;
            // state.user = action.payload.user;
          },
          userLoggedOut: (state) => {
            state.token = "";
            state.user = "";
          },
    }
})

export const  {
  // userRegistration,
  userLoggedIn,userLoggedOut} = authSlice.actions;
export default authSlice.reducer;