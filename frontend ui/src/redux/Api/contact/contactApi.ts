import baseApi from "../baseApi";

const blogApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createCon: build.mutation({
      query: (data) => ({
        url: "/contacts/create-contact",
        method: "POST",
        body:data
      }),
    }),
   
  
  }),
});

export const { useCreateConMutation } = blogApi;
