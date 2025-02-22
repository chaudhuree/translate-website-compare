import baseApi from "../baseApi";

const brandApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getBrands: build.query({
      query: () => ({
        url: "/brands",
        method: "GET",
      }),
      keepUnusedDataFor: 300,
    }),
    getCategory: build.query({
        query: () => ({
          url: "/categories",
          method: "GET",
        }),
        keepUnusedDataFor: 300,
      }),
      getFilter: build.query({
        query: ({ categoryId, minPrice, maxPrice, brandId }) => {
          let url = '/products?';
      
        
          if (categoryId) url += `categoryId=${categoryId}&`;
          if (minPrice) url += `minPrice=${minPrice}&`;
          if (maxPrice) url += `maxPrice=${maxPrice}&`;
          if (brandId) url += `brandId=${brandId}&`;
      
          // Remove trailing '&' if present
          url = url.endsWith('&') ? url.slice(0, -1) : url;
      
          return { url, method: 'GET' };
        },
        keepUnusedDataFor: 300, // Optional: Cache the data for 300 seconds
      }),
      
  }),
});

export const { useGetBrandsQuery,useGetCategoryQuery,useGetFilterQuery } = brandApi;
