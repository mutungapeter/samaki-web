import { apiSlice } from "@/redux/api/apiSlice";


export const categoriesApi= apiSlice.injectEndpoints({
    endpoints: (builder) =>({
        getAllCategories: builder.query({
            query: () => ({
              url: "categories",
              method: "GET",
            //   credentials: "include" as const,
            }),
          }),
          
    })
})

export const {  useGetAllCategoriesQuery } = categoriesApi;