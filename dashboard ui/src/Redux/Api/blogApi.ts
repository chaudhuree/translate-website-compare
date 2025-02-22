import baseApi from "./baseApi";

const blogApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        blog: build.query({
            query: () => ({
                url: `/blogs`,
                method: "GET"
            }),
            providesTags: ["blog"],
            keepUnusedDataFor: 300,
        }),
        addblog: build.mutation({
            query: (data) => ({
                url: `/blogs/create-blog`,
                method: "POST",
                body:data
            }),
            invalidatesTags: ["blog"]
        }),

        deleteBlog: build.mutation({
            query: (id) => ({
                url: `/blogs/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["blog"]
        }),

        updateBlog: build.mutation({
            query: ({id, data}) => ({
                url: `/blogs/${id}`,
                method: "PATCH",
                body:data
            }),
            invalidatesTags: ["blog"]
        })
    })
});

export const {useBlogQuery,useAddblogMutation, useDeleteBlogMutation, useUpdateBlogMutation} = blogApi

