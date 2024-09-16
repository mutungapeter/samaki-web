import { apiSlice } from "@/redux/api/apiSlice";

export const productsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllProducts: builder.query({
      query: ({ page = 1, categoryNames = [] }: { page?: number; categoryNames?: string[] }) => {
        const queryParams = new URLSearchParams();
        queryParams.append("page", page.toString());
        if (categoryNames.length > 0) {
          queryParams.append("categories", categoryNames.join(","));
        }
        return {
          url: `products/?${queryParams.toString()}`,
          method: "GET",
        };
      }
      
    }),
    getProductDetails: builder.query({
      query: (id: any) => ({
        url: `products/${id}`,
        method: "GET",
      
      }),
    }),
  }),
});

export const { useGetAllProductsQuery, useGetProductDetailsQuery } = productsApi;
