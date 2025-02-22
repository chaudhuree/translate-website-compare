import baseApi from "./baseApi";

const eventApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        brands: build.query({
            query: ({ page, limit, status }) => ({
                url: `/brands`,
                method: "GET"
            }),
            providesTags: ["brand"],
            keepUnusedDataFor: 300,
        }),
        addBrand: build.mutation({
            query: (data) => ({
                url: `/brands/create-brand`,
                method: "POST",
                body:data
            }),
            invalidatesTags: ["brand"]
        }),

        deleteBrand: build.mutation({
            query: (brandId) => ({
                url: `/brands/${brandId}`,
                method: "DELETE",
            }),
            invalidatesTags: ["brand"]
        }),

        updateBrand: build.mutation({
            query: ({brandId, data}) => ({
                url: `/brands/${brandId}`,
                method: "PATCH",
                body: data
            }),
            invalidatesTags: ["brand"]
        })
    })
});

export const {useBrandsQuery,useAddBrandMutation, useDeleteBrandMutation, useUpdateBrandMutation} = eventApi

