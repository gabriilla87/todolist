import {configureStore} from '@reduxjs/toolkit'
import {useDispatch} from "react-redux";
import {setupListeners} from "@reduxjs/toolkit/query";
import {baseApi} from "./baseApi";
import { appReducer, appSlice } from "./appSlice";
import { initReducer, initSlice } from "./initSlice";

//store
export const store = configureStore({
    reducer: {
        [baseApi.reducerPath]: baseApi.reducer,
        [initSlice.name]: initReducer,
        [appSlice.name]: appReducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(baseApi.middleware)
})

//types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

//utils
export const useAppDispatch = useDispatch.withTypes<AppDispatch>()

setupListeners(store.dispatch)