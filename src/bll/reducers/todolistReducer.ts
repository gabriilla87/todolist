import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export const todolistsSlice = createSlice({
    name: 'todolists',
    initialState: [] as DomainTodolist[],
    reducers: {
        addTodolist(state, action: PayloadAction<{title: string, id: string}>) {
            const {title, id} = action.payload
            state.push({title, id})
            console.log(state)
        }
    }
})

export const {addTodolist} = todolistsSlice.actions
export const todolistsReducer = todolistsSlice.reducer

export type DomainTodolist = {
    title: string,
    id: string
}