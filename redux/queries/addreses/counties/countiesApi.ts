import { apiSlice } from "@/redux/api/apiSlice";


export const countiesApi= apiSlice.injectEndpoints({
    endpoints: (builder) =>({
        getCounties: builder.query({
            query: () => ({
              url: "counties",
              method: "GET",
            }),
          }),
          
    })
})

export const {  useGetCountiesQuery } = countiesApi;