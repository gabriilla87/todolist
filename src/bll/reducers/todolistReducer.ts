import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export const todolistsSlice = createSlice({
    name: 'todolists',
    initialState: [] as DomainTodolist[],
    reducers: {
        addTodolist: (state, action: PayloadAction<{title: string, id: string}>) => {
            const {title, id} = action.payload
            state.push({title, id, isEditMode: false})
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
    }
})

export const {addTodolist, removeTodolist, changeTodolistTitle, changeTodolistEditMode} = todolistsSlice.actions
export const todolistsReducer = todolistsSlice.reducer

export type DomainTodolist = {
    title: string
    id: string
    isEditMode: boolean
}