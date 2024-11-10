import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {addTodolist} from "./todolistReducer";

export const taskSlice = createSlice({
    name: 'tasks',
    initialState: {} as TasksState,
    reducers: {
        addTask: (state, action: PayloadAction<{
            todolistId: string,
            title: string,
            id: string
        }>) => {
            const {todolistId, title, id} = action.payload
            const task: DomainTask = {
                description: "",
                title,
                status: 1,
                priority: 1,
                startDate: "",
                deadline: "",
                id: id,
                todoListId: todolistId,
                order: 0,
                addedDate: ""
            }
            state[todolistId].push(task)
        }
    },
    extraReducers: builder => {
        builder.addCase(addTodolist, (state, action) => {
            state[action.payload.id] = []
        })
    }
})

export const {addTask} = taskSlice.actions
export const tasksReducer = taskSlice.reducer

export type DomainTask = {
    description: string
    title: string
    status: number
    priority: number
    startDate: string
    deadline: string
    id: string
    todoListId: string
    order: number
    addedDate: string
}

export type TasksState = {
    [todolistId: string]: DomainTask[]
}