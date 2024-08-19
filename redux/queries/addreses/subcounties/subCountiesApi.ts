import { apiSlice } from "@/redux/api/apiSlice";


export const subCountiesApi=apiSlice.injectEndpoints({
    endpoints:(builder)=>({
        getSubCounties:builder.query({
            query:({ county__name }: { county__name?: string })=>({
                url:"sub-counties",
                method: "GET",
                params: county__name ? { county__name } : {},

            }),
        }),
    })
})
export const { useGetSubCountiesQuery } = subCountiesApi;