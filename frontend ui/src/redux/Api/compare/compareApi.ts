import baseApi from "../baseApi";

const compareApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getCompare: build.mutation({
      query: (data) => ({
        url: "/benchmarks/compare",
        method: "Post",
        body:data
      }),
    }),
  }),
});

export const { useGetCompareMutation } = compareApi;
