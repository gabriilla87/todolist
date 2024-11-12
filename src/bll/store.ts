import {configureStore} from '@reduxjs/toolkit'
import {useDispatch} from "react-redux";
import {tasksReducer} from "./reducers/tasksSlice";
import {todolistsReducer} from "./reducers/todolistsSlice";
import {todolistsApi} from "../dal/api/todolistsApi";
import {setupListeners} from "@reduxjs/toolkit/query";
import {tasksApi} from "../dal/api/tasksApi";

//store
export const store = configureStore({
    reducer: {
        [todolistsApi.reducerPath]: todolistsApi.reducer,
        [tasksApi.reducerPath]: tasksApi.reducer,
        tasks: tasksReducer,
        todolists: todolistsReducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware()
            .concat(todolistsApi.middleware)
            .concat(tasksApi.middleware)
})

//types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

//utils
export const useAppDispatch = useDispatch.withTypes<AppDispatch>()

setupListeners(store.dispatch)