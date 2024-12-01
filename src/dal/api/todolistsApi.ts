import {baseApi} from "../../app/baseApi";

export type CommonResponse<T = {}> = {
    data: T
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
    isDisabled: boolean
}


export const todolistsApi = baseApi.injectEndpoints({
    endpoints: builder => ({
        getTodolists: builder.query<DomainTodolist[], void>({
            query: () => 'todo-lists',
            transformResponse(todolists: TodolistsResponse[]): DomainTodolist[] {
                return todolists.map(tl => ({...tl, isEditMode: false, isDisabled: false}))
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