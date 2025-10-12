import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import type {Product} from "./types.ts";

export const api = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({baseUrl: 'https://fakestoreapi.com'}),
    tagTypes: ['Products', 'Product'],
    endpoints: (builder) => ({
        getAllProducts: builder.query<Product[], void>({
            query: () => 'products',
            providesTags: ['Products']
        }),
        getProductById: builder.query<any, number>({
            query: (id) => `products/${id}`,
            providesTags: (_result, _error, id) => [{type: 'Product', id}]
        }),
        addNewProduct: builder.mutation<any, any>({
            query: (newProduct) => ({
                url: 'products',
                method: 'POST',
                body: newProduct
            }),
            invalidatesTags: ['Products']
        }),
        updateProduct: builder.mutation<any, any>({
            query: ({id, ...body}) => ({
                url: `products/${id}`,
                method: 'PUT',
                body,
            }),
            invalidatesTags: (_result, _error, {id}) => [{type: 'Product', id}, 'Products'],
        }),
        deleteProduct: builder.mutation<any, number>({
            query: (id) => ({
                url: `products/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Products']
        }),
    })
});

export const {
    useGetAllProductsQuery,
    useGetProductByIdQuery,
    useAddNewProductMutation,
    useUpdateProductMutation,
    useDeleteProductMutation,
} = api;