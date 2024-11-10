import {instance} from "./instance";
import {TodolistsResponse} from "../../bll/reducers/todolistReducer";

export const todolistApi = {
    getTodolists() {
        return instance.get<TodolistsResponse[]>('todo-lists')
    }
}