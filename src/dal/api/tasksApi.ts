import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'
import {CommonResponse} from "./todolistsApi";

export type TaskResponse = {
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
export type GetTasksResponse = {
    items: TaskResponse[]
    totalCount: number
    error: string
}
export type DomainTask = TaskResponse & {
    isEditMode: boolean
}
export type UpdateTaskModel = Omit<TaskResponse, 'id' | 'todoListId' | 'order' | 'addedDate'>

export const tasksApi = createApi({
    reducerPath: 'tasksApi',
    tagTypes: ['tasks'],
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.REACT_APP_BASE_URL,
        prepareHeaders: headers => {
            headers.set('API-KEY', `${process.env.REACT_APP_API_KEY}`)
            headers.set('Authorization', `Bearer ${process.env.REACT_APP_AUTH_TOKEN}`)
        }
    }),
    endpoints: builder => ({
        getTasks: builder.query<DomainTask[], string>({
            query: (todolistId) => `todo-lists/${todolistId}/tasks?count=100`,
            transformResponse: (response: GetTasksResponse): DomainTask[] => {
                return response.items.map(t => ({...t, isEditMode: false}))
            },
            providesTags: ['tasks']
        }),
        addTask: builder.mutation<TaskResponse, { todolistId: string, title: string }>({
            query: ({todolistId, title}) => ({
                url: `todo-lists/${todolistId}/tasks`,
                method: 'POST',
                body: {title}
            }),
            invalidatesTags: ['tasks']
        }),
        removeTask: builder.mutation<CommonResponse, { todolistId: string, taskId: string }>({
            query: ({todolistId, taskId}) => ({
                url: `todo-lists/${todolistId}/tasks/${taskId}`,
                method: 'DELETE'
            }),
            invalidatesTags: ['tasks']
        }),
        updateTask: builder.mutation<CommonResponse<{ item: TaskResponse }>,
            { todolistId: string, taskId: string, model: UpdateTaskModel }>({
            query: ({todolistId, taskId, model}) => ({
                url: `todo-lists/${todolistId}/tasks/${taskId}`,
                method: 'PUT',
                body: {...model}
            }),
            invalidatesTags: ['tasks']
        })
    })
})

export const {useGetTasksQuery, useAddTaskMutation, useRemoveTaskMutation, useUpdateTaskMutation} = tasksApi