import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import type {Product} from "./types.ts";

export const productsApi = createApi({
    reducerPath: 'productsApi',
    baseQuery: fetchBaseQuery({baseUrl: 'https://fakestoreapi.com'}),
    tagTypes: ['Products', 'Product'],
    endpoints: (builder) => ({
        // все продукты
        getAllProducts: builder.query<Product[], void>({
            query: () => 'products',
            providesTags: ['Products']
        }),
        // продукт по id
        getProductById: builder.query<any, number>({
            query: (id) => `products/${id}`,
            providesTags: (_result, _error, id) => [{type: 'Product', id}]
        }),
        // новый продукт
        addNewProduct: builder.mutation<any, any>({
            query: (newProduct) => ({
                url: 'products',
                method: 'POST',
                body: newProduct
            }),
            invalidatesTags: ['Products']
        }),
        // изменение продукта
        updateProduct: builder.mutation<any, any>({
            query: (product) => ({
                url: `products/${product.id}`,
                method: 'PUT',
                body: product,
            }),
            invalidatesTags: (_result, _error, product) => [{type: 'Product', id: product.id}, 'Products'],
        }),
        // удалить продукт
        deleteProduct: builder.mutation<any, number>({
            query: (id) => ({
                url: `products/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: (_result, _error, id) => [{type: 'Product', id}, 'Products'],
        }),
    })
});

export const {
    useGetAllProductsQuery,
    useGetProductByIdQuery,
    useAddNewProductMutation,
    useUpdateProductMutation,
    useDeleteProductMutation,
} = productsApi;