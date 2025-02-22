import baseApi from "../baseApi";

const productApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getProducts: build.query({
      query: () => ({
        url: "/products",
        method: "GET",
      }),
      keepUnusedDataFor: 300,
    }),
    getSingleProduct: build.query({
      query: (productId) => ({
        url: `/products/${productId}`,
        method: "GET",
      }),
      keepUnusedDataFor: 300,
    }),
  }),
});

export const { useGetProductsQuery,useGetSingleProductQuery  } = productApi;
