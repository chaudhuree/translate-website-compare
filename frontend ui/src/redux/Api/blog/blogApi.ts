import baseApi from "../baseApi";

const blogApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getBlogPosts: build.query({
      query: () => ({
        url: "/blogs",
        method: "GET",
      }),
    }),
    getBlogPost: build.query({
      query: ({ id }) => ({
        url: `/blogs/${id}`,
        method: "GET",
        keepUnusedDataFor: 300,
      }),
    }),
  }),
});

export const { useGetBlogPostsQuery, useGetBlogPostQuery } = blogApi;
