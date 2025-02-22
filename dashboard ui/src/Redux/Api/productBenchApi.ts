import baseApi from "./baseApi";

const productBenchApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    prodcutBench: build.query({
      query: (productId) => ({
        url: `benchmarks/products/${productId}/benchmarks`,
        method: "GET",
      }),
      providesTags: ["productBench"],
      keepUnusedDataFor: 300,
    }),
    addProdcutBench: build.mutation({
      query: (data) => ({
        url: `benchmarks/products/${data.productId}/benchmark`, // Corrected URL
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["productBench"],
    }),

    deleteProdcutBench: build.mutation({
      query: ({ productId, benchmarkId }) => ({
        url: `benchmarks/products/${productId}/benchmark/${benchmarkId}`, // Corrected URL
        method: "DELETE",
      }),
      invalidatesTags: ["productBench"],
    }),

    editProdcutBench: build.mutation({
      query: ({ productId, data }) => ({
        url: `benchmarks/products/${productId}/benchmark/${data.benchmarkId}`, // Corrected URL
        method: "PATCH",
        body: {
          score: data.score,
          maxScore: data.maxScore,
        },
      }),
      invalidatesTags: ["productBench"],
    }),
  }),
});

export const {
  useAddProdcutBenchMutation,
  useDeleteProdcutBenchMutation,
  useEditProdcutBenchMutation,
  useProdcutBenchQuery,
} = productBenchApi;
