import baseApi from "./baseApi";

const benchmarkApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        benchmark: build.query({
            query: ({ page, limit, status }) => ({
                url: `/benchmarks?page=1&limit=10`,
                method: "GET"
            }),
            providesTags: ["banchmark"],
            keepUnusedDataFor: 300,
        }),
        addBenchmark: build.mutation({
            query: (data) => ({
                url: `benchmarks/create-benchmark`,
                method: "POST",
                body:data
            }),
            invalidatesTags: ["banchmark"]
        }),
        deleteBench: build.mutation({
            query: (id) => ({
                url: `/benchmarks/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["banchmark"]
        }),

        updateBench: build.mutation({
            query: ({id, data}) => ({
                url: `/benchmarks/${id}`,
                method: "PATCH",
                body:data
            }),
           
            invalidatesTags: ["banchmark"],
           

        })
    })
});

export const {useAddBenchmarkMutation,useBenchmarkQuery,useDeleteBenchMutation,useUpdateBenchMutation} = benchmarkApi

