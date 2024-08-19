import { apiSlice } from "@/redux/api/apiSlice";

export const orderApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
   
    createOrder: builder.mutation({
      query: (data) => ({
        url: `place-order/`,
        method: "POST",
        body: data,
      }),
    }),
  
    
  }),
});

export const { useCreateOrderMutation } = orderApi;
