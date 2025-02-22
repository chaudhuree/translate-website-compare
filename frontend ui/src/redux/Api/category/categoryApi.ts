import baseApi from "../baseApi";

const categoryApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    categories: build.query({
      query: () => ({
        url: "/categories",
        method: "GET",
       
      }),
    }),
    brand: build.query({
      query: () => ({
        url: "/brands",
        method: "GET",
       
      }),
    }),
   
  
  }),
});

export const { useCategoriesQuery,useBrandQuery } = categoryApi;
