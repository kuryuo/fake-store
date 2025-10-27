import {configureStore} from "@reduxjs/toolkit";
import {productsApi} from './productsApi.ts'
import {cartsApi} from "./cartsApi.ts";

export const store = configureStore({
    reducer: {
        [productsApi.reducerPath]: productsApi.reducer,
        [cartsApi.reducerPath]: cartsApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(productsApi.middleware).concat(cartsApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;