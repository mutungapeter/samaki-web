import { apiSlice } from "@/redux/api/apiSlice";

export const addressesApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAddresses: builder.query({
      query: () => ({
        url: "customer-addresses",
        method: "GET",
      }),
    }),
    createAddress: builder.mutation({
      query: ({
        name,
        phone_number,
        id_number,
        county,
        sub_county,
        ward,
        pickup_station,
        description,
        town,
      }: {
        name: string;
        phone_number: string;
        id_number: string;
        county: number;
        sub_county: number;
        ward: number;
        pickup_station?: number;
        description?: string;
        town: string;
      }) => ({
        url: `customer-addresses/`,
        method: "POST",
        body: {
          name,
          phone_number,
          id_number,
          county,
          sub_county,
          ward,
          pickup_station,
          description,
          town,
        },
      }),
    }),
    deleteAddress: builder.mutation({
      query: (id) => ({
        url: `customer-addresses/${id}/`,
        method: "DELETE",
      }),
    }),
    editAddress: builder.mutation({
      query: (
      payload: {
          id:number;
          name: string;
          phone_number: string;
          id_number: string;
          county: number;
          sub_county: number;
          ward: number;
          pickup_station?: number;
          description?: string;
          town: string;
        }
      ) => ({
        url: `customer-addresses/${payload.id}/`,
        method: "PUT",
        body: payload,
      }),
    }),
    
  }),
});

export const { useGetAddressesQuery, useCreateAddressMutation, useDeleteAddressMutation, useEditAddressMutation } = addressesApi;
