import {configureStore} from "@reduxjs/toolkit";
import {productsApi} from './productsApi.ts'

export const store = configureStore({
    reducer: {
        [productsApi.reducerPath]: productsApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(productsApi.middleware),
});

export type RootState = ReturnType<typeof store.dispatch>;

export type AppDispatch = typeof store.dispatch;