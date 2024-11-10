import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {todolistApi} from "../../dal/api/todolistApi";

export const todolistsSlice = createSlice({
    name: 'todolists',
    initialState: [] as DomainTodolist[],
    reducers: {
        addTodolist: (state, action: PayloadAction<{title: string, id: string}>) => {
            const {title, id} = action.payload
            state.push({title, id, isEditMode: false, addedDate: "", order: 0})
            console.log(state)
        },
        removeTodolist: (state, action: PayloadAction<{todolistId: string}>) => {
            const index = state.findIndex(tl => tl.id === action.payload.todolistId)
            if (index !== -1) state.splice(index, 1)
        },
        changeTodolistTitle: (state, action: PayloadAction<{todolistId: string, title: string}>) => {
            const index = state.findIndex(tl => tl.id === action.payload.todolistId)
            if (index !== -1) state[index].title = action.payload.title
        },
        changeTodolistEditMode: (state, action: PayloadAction<{ todolistId: string, isEditMode: boolean }>) => {
            const index = state.findIndex(tl => tl.id === action.payload.todolistId)
            if (index !== -1) state[index].isEditMode = action.payload.isEditMode
        }
    },
    extraReducers: builder =>
        builder.addCase(fetchTodolists.fulfilled, (_, action) => {
            return action.payload.todolists.map(tl => ({...tl, isEditMode: false}))
        })
})

export const {addTodolist, removeTodolist, changeTodolistTitle, changeTodolistEditMode} = todolistsSlice.actions
export const todolistsReducer = todolistsSlice.reducer

export const fetchTodolists = createAsyncThunk<{todolists: TodolistsResponse[]}>('todolists/fetchTodolists', async () => {
    try {
        const res = await todolistApi.getTodolists()
        return {todolists: res.data}
    } finally {

    }
})

export type DomainTodolist = TodolistsResponse & {
    isEditMode: boolean
}

export type TodolistsResponse = {
    id: string
    addedDate: string
    order: number
    title: string
}