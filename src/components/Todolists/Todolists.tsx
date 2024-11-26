import {AddItemForm} from "../AddItemForm/AddItemForm";
import {Todolist} from "../Todolist/Todolist";
import React from 'react';
import {todolistsApi, useAddTodolistMutation, useGetTodolistsQuery} from "../../dal/api/todolistsApi";
import {useAppDispatch} from "../../app/store";
import {Navigate} from "react-router-dom";
import {useSelector} from "react-redux";
import {selectIsLoggedIn} from "../../app/appSlice";

export const Todolists = () => {
    //hooks
    const [addTodolist] = useAddTodolistMutation()
    const dispatch = useAppDispatch()
    const isLoggedIn = useSelector(selectIsLoggedIn)
    const {data: todolists} = useGetTodolistsQuery(undefined, {skip: !isLoggedIn})

    //handlers
    const addTodolistHandler = (title: string) => {
        addTodolist(title)
    }
    const changeTodolistEditModeHandler = ({todolistId, isEditMode}: { todolistId: string, isEditMode: boolean }) => {
        if (!todolists) return;
        const updatedTodolists = todolists.map(tl => tl.id === todolistId ? {...tl, isEditMode: isEditMode} : tl);
        dispatch(todolistsApi.util.upsertQueryData('getTodolists', undefined, updatedTodolists));
    }

    if (!isLoggedIn) {
        return <Navigate to={"/login"} />;
    }

    return (
        <>
            <AddItemForm addItem={addTodolistHandler} placeholder={"Todolist title"}/>
            {todolists?.map(tl => {
                return (
                    <Todolist
                        key={tl.id}
                        todolist={tl}
                        changeTodolistEditMode={changeTodolistEditModeHandler}
                    />
                )
            })}
        </>
    );
};

