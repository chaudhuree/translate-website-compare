import baseApi from "../Api/baseApi";

const productsApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getProducts: build.query({
      query: () => ({
        url: "/products",
        method: "GET",
      }),
    }),

    getProductsDetails: build.query({
      query: (productId) => ({
        url: `/products/${productId}`,
        method: "GET",
      }),
    }),

    getProductsBenchmark: build.query({
      query: (productId) => ({
        url: `/benchmarks/products/${productId}/benchmarks`,
        method: "GET",
      }),
    }),
  }),
});

export const { useGetProductsQuery, useGetProductsDetailsQuery, useGetProductsBenchmarkQuery } = productsApi;
