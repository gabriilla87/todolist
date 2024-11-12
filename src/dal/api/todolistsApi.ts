import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'

export type CommonResponse<T = {}> = {
    data?: T
    resultCode: number
    messages: string[]
}

export type TodolistsResponse = {
    id: string
    addedDate: string
    order: number
    title: string
}

export type DomainTodolist = TodolistsResponse & {
    isEditMode: boolean
}

export const todolistsApi = createApi({
    reducerPath: 'todolistsApi',
    tagTypes: ['Todolist'],
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.REACT_APP_BASE_URL,
        prepareHeaders: headers => {
            headers.set('API-KEY', `${process.env.REACT_APP_API_KEY}`)
            headers.set('Authorization', `Bearer ${process.env.REACT_APP_AUTH_TOKEN}`)
        },
    }),
    endpoints: builder => ({
        getTodolists: builder.query<DomainTodolist[], void>({
            query: () => 'todo-lists',
            transformResponse(todolists: TodolistsResponse[]): DomainTodolist[] {
                return todolists.map(tl => ({...tl, isEditMode: false}))
            },
            providesTags: ['Todolist']
        }),
        addTodolist: builder.mutation<CommonResponse<{ item: TodolistsResponse }>, string>({
            query: (title) => ({
                url: "todo-lists",
                method: "POST",
                body: {title}
            }),
            invalidatesTags: ['Todolist']
        }),
        removeTodolist: builder.mutation<CommonResponse, string>({
            query: (todolistId) => ({
                url: `todo-lists/${todolistId}`,
                method: "DELETE",
            }),
            invalidatesTags: ['Todolist']
        }),
        updateTodolistTitle: builder.mutation<CommonResponse, { todolistId: string, title: string }>({
            query: ({todolistId, title}) => ({
                url: `todo-lists/${todolistId}`,
                method: "PUT",
                body: {title}
            }),
            invalidatesTags: ['Todolist']
        })
    }),
})

export const {
    useGetTodolistsQuery,
    useAddTodolistMutation,
    useRemoveTodolistMutation,
    useUpdateTodolistTitleMutation
} = todolistsApi