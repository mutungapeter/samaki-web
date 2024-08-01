import { apiSlice } from "@/redux/api/apiSlice";


export const productsApi= apiSlice.injectEndpoints({
    endpoints: (builder) =>({
        getAllProducts: builder.query({
            query: () => ({
              url: "products",
              method: "GET",
            //   credentials: "include" as const,
            }),
          }),
          
    })
})

export const {  useGetAllProductsQuery } = productsApi;