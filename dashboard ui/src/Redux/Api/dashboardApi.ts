import baseApi from "./baseApi";

const dashboardApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        dashboard: build.query({
            query: () => ({
                url: `dashboard/statistics`,
                method: "GET"
            }),
            providesTags: ["dasboard"],
            keepUnusedDataFor: 300,
        }),
        
    })
});

export const {useDashboardQuery} = dashboardApi

