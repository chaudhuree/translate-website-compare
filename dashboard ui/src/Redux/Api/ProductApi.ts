import baseApi from "./baseApi";

const eventApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        products: build.query({
            query: ({ page, limit }) => ({
                url: `/products?page=${page}&limit=${limit}`,
                method: "GET",
            }),
            providesTags: ["Proudcts"],
            keepUnusedDataFor: 300
        }),
        addProduct: build.mutation({
            query: (data) => ({
                url: `/products/create-product`,
                method: "POST",
                body:data
            }),
            invalidatesTags: ["Proudcts"]
        }),

        deleteProduct: build.mutation({
            query: (id) => ({
                url: `/products/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Proudcts"]
        }),

        updateProduct: build.mutation({
            query: ({id, data}) => ({
                url: `/products/${id}`,
                method: "PATCH",
                body: data
            }),
            invalidatesTags: ["Proudcts"]
        })
    })
});

export const { useProductsQuery,useAddProductMutation, useUpdateProductMutation, useDeleteProductMutation } = eventApi

