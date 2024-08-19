import { apiSlice } from "@/redux/api/apiSlice";

const pickupStationsApi=apiSlice.injectEndpoints({
    endpoints: (builder)=>({
        getPickupStations: builder.query({
            query: ({ ward__name, station_type }: { ward__name?: string; station_type?: string }) => {
                const params: Record<string, string> = {};
        
                if (ward__name) {
                  params.ward__name = ward__name;
                }
                if (station_type) {
                  params.station_type = station_type;
                }
        
                return {
                  url: "pickup-stations-list",
                  method: "GET",
                  params,
                };
              },
        }),
        
    })
})

export const { useGetPickupStationsQuery } = pickupStationsApi