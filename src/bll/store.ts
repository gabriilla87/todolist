import {combineReducers, configureStore} from '@reduxjs/toolkit'
import {useDispatch} from "react-redux";
import {tasksReducer} from "./reducers/taskReducer";
import {todolistsReducer} from "./reducers/todolistReducer";


const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todolistsReducer
})
export type RootState = ReturnType<typeof rootReducer>

export const store = configureStore({reducer: rootReducer})

export type AppDispatch = typeof store.dispatch
export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
