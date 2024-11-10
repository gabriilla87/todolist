import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {addTodolist, removeTodolist} from "./todolistReducer";

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
                addedDate: "",
                isEditMode: false,
            }
            state[todolistId].push(task)
        },
        changeTaskEditMode: (state, action: PayloadAction<{
            todolistId: string,
            taskId: string,
            isEditMode: boolean
        }>) => {
            const {todolistId, taskId, isEditMode} = action.payload
            const task = state[todolistId].find(t => t.id === taskId)
            if (task) task.isEditMode = isEditMode
        },
        changeTaskTitle: (state, action: PayloadAction<{ todolistId: string, taskId: string, title: string }>) => {
            const {todolistId, taskId, title} = action.payload
            const task = state[todolistId].find(t => t.id === taskId)
            if (task) task.title = title
        },
        removeTask: (state, action: PayloadAction<{ todolistId: string, taskId: string }>) => {
            const {todolistId, taskId} = action.payload
            const index = state[todolistId].findIndex(t => t.id === taskId)
            if (index !== -1) {
                state[todolistId].splice(index, 1)
            }
        }
    },
    extraReducers: builder => {
        builder
            .addCase(addTodolist, (state, action) => {
                state[action.payload.id] = []
            })
            .addCase(removeTodolist, (state, action) => {
               delete state[action.payload.todolistId]
            })
    }
})

export const {addTask, changeTaskEditMode, changeTaskTitle, removeTask} = taskSlice.actions
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
    isEditMode: boolean
}

export type TasksState = {
    [todolistId: string]: DomainTask[]
}