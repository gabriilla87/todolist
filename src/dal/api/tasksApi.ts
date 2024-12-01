import {CommonResponse} from "./todolistsApi";
import {baseApi} from "../../app/baseApi";

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
    isDisabled: boolean
}
export type UpdateTaskModel = Omit<TaskResponse, 'id' | 'todoListId' | 'order' | 'addedDate'>

export const tasksApi = baseApi.injectEndpoints({
    endpoints: builder => ({
        getTasks: builder.query<DomainTask[], string>({
            query: (todolistId) => `todo-lists/${todolistId}/tasks?count=100`,
            transformResponse: (response: GetTasksResponse): DomainTask[] => {
                return response.items.map(t => ({...t, isEditMode: false, isDisabled: false}))
            },
            providesTags: ['Task']
        }),
        addTask: builder.mutation<TaskResponse, { todolistId: string, title: string }>({
            query: ({todolistId, title}) => ({
                url: `todo-lists/${todolistId}/tasks`,
                method: 'POST',
                body: {title}
            }),
            invalidatesTags: ['Task']
        }),
        removeTask: builder.mutation<CommonResponse, { todolistId: string, taskId: string }>({
            query: ({todolistId, taskId}) => ({
                url: `todo-lists/${todolistId}/tasks/${taskId}`,
                method: 'DELETE'
            }),
            invalidatesTags: ['Task']
        }),
        updateTask: builder.mutation<CommonResponse<{ item: TaskResponse }>,
            { todolistId: string, taskId: string, model: UpdateTaskModel }>({
            query: ({todolistId, taskId, model}) => ({
                url: `todo-lists/${todolistId}/tasks/${taskId}`,
                method: 'PUT',
                body: {...model}
            }),
            invalidatesTags: ['Task']
        }),
        changeTaskOrder: builder.mutation<CommonResponse, { todolistId: string, taskId: string, putAfterTaskId: string | null }>({
            query: ({todolistId, taskId, putAfterTaskId}) => ({
                url: `todo-lists/${todolistId}/tasks/${taskId}/reorder`,
                method: 'PUT',
                body: {
                    putAfterItemId: putAfterTaskId
                }
            }),
            invalidatesTags: ['Task']
        })
    })})

export const {
    useGetTasksQuery,
    useAddTaskMutation,
    useRemoveTaskMutation,
    useUpdateTaskMutation,
    useChangeTaskOrderMutation
} = tasksApi