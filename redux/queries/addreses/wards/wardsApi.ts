import { apiSlice } from "@/redux/api/apiSlice";


export const wardsApi=apiSlice.injectEndpoints({
    endpoints:(builder)=>({
        getWards:builder.query({
            query:({ sub_county__name }: { sub_county__name?: string })=>({
                url:"wards",
                method: "GET",
                params: sub_county__name ? { sub_county__name } : {},
            }),
        }),
    })
})
export const { useGetWardsQuery } = wardsApi;