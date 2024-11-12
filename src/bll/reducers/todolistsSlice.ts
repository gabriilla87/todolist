import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {TodolistsResponse} from "../../dal/api/todolistsApi";


const todolistsSlice = createSlice({
    name: 'todolist',
    initialState: [] as DomainTodolist[],
    reducers: {
        addTodolist: (state, action: PayloadAction<{ title: string, id: string }>) => {
            const {title, id} = action.payload
            state.push({title, id, isEditMode: false, addedDate: "", order: 0})
            console.log(state)
        },
        removeTodolist: (state, action: PayloadAction<{ todolistId: string }>) => {
            const index = state.findIndex(tl => tl.id === action.payload.todolistId)
            if (index !== -1) state.splice(index, 1)
        },
        changeTodolistTitle: (state, action: PayloadAction<{ todolistId: string, title: string }>) => {
            const index = state.findIndex(tl => tl.id === action.payload.todolistId)
            if (index !== -1) state[index].title = action.payload.title
        },
        changeTodolistEditMode: (state, action: PayloadAction<{ todolistId: string, isEditMode: boolean }>) => {
            const index = state.findIndex(tl => tl.id === action.payload.todolistId)
            if (index !== -1) state[index].isEditMode = action.payload.isEditMode
        }
    },
    // extraReducers: builder =>
    //     builder
    //         .addCase(fetchTodolists.fulfilled, (_, action) => {
    //             return action.payload.todolists.map(tl => ({...tl, isEditMode: false}))
    //         })
    //         .addCase(addTodolist.fulfilled, (state, action) => {
    //             state.unshift({...action.payload.todolist, isEditMode: false})
    //         })
})

export const {removeTodolist, changeTodolistTitle, changeTodolistEditMode} = todolistsSlice.actions
export const todolistsReducer = todolistsSlice.reducer











//types
export type DomainTodolist = TodolistsResponse & {
    isEditMode: boolean
}