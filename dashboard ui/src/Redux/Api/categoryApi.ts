import baseApi from "./baseApi";

const eventApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        category: build.query({
            query: ({ page, limit, status }) => ({
                url: `/categories?page=${page}&limit=${limit}&status=${status ? status : ""}`,
                method: "GET"
            }),
            providesTags: ["category"],
            keepUnusedDataFor: 300
        }),
        addcategory: build.mutation({
            query: (data) => ({
                url: `categories/create-category`,
                method: "POST",
                body:data
            }),
            invalidatesTags: ["category"]
        }),

        deleteCategory: build.mutation({
            query: (categoryId) => ({
                url: `categories/${categoryId}`,
                method: "DELETE",
            }),
            invalidatesTags: ["category"]
        }),
        
        editCategory: build.mutation({
            query: ({categoryId, data}) => ({
                url: `categories/${categoryId}`,
                method: "PATCH",
                body: data
            }),
            invalidatesTags: ["category"]
        })
    })
});

export const {useAddcategoryMutation, useCategoryQuery, useDeleteCategoryMutation, useEditCategoryMutation } = eventApi

