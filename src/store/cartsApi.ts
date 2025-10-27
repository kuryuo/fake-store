import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import type {Cart} from "./types.ts";

export const cartsApi = createApi({
    reducerPath: 'cartsApi',
    baseQuery: fetchBaseQuery({baseUrl: 'https://fakestoreapi.com'}),
    tagTypes: ['Carts', 'Cart'],
    endpoints: (builder) => ({
        getAllCarts: builder.query<Cart[], void>({
            query: () => 'carts',
            providesTags: ["Carts"]
        }),
        getCartById: builder.query<Cart, number>({
            query: (id) => `carts/${id}`,
            providesTags: (_result, _error, id) => [{type: 'Cart', id}]
        }),
        addNewCart: builder.mutation<Cart, Cart>({
            query: (newCart) => ({
                url: 'carts',
                method: 'POST',
                body: newCart
            }),
            invalidatesTags: ['Cart']
        }),
        updateCart: builder.mutation<any, any>({
            query: (cart) => ({
                url: `carts/${cart.id}`,
                method: 'PUT',
                body: cart
            }),
            invalidatesTags: (_result, _error, cart) => [{type: 'Cart', id: cart.id}, 'Carts']
        }),
        deleteCart: builder.mutation<any, number>({
            query: (id) => ({
                url: `carts/${id}`,
                method: 'DELETE'
            }),
            invalidatesTags: (_result, _error, id) => [{type: 'Cart', id}, 'Carts']
        }),
    })
})

export const {
    useGetAllCartsQuery,
    useGetCartByIdQuery,
    useAddNewCartMutation,
    useUpdateCartMutation,
    useDeleteCartMutation,
} = cartsApi;