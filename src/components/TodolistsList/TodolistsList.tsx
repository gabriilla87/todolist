import { AddItemForm } from "../AddItemForm/AddItemForm";
import { Todolist } from "../Todolist/Todolist";
import React from "react";
import { todolistsApi, useAddTodolistMutation, useGetTodolistsQuery } from "../../dal/api/todolistsApi";
import { useAppDispatch } from "../../app/store";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectIsLoggedIn } from "../../app/appSlice";
import { TodolistSkeleton } from "../Todolist/TodolistSkeleton/TodolistSkeleton";
import { AddItemFormSkeleton } from "../AddItemForm/AddItemFormSkeleton";

export const TodolistsList = () => {
  //hooks
  const [addTodolist] = useAddTodolistMutation();
  const dispatch = useAppDispatch();
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const { data: todolists, isLoading: isFetchingTodolists } = useGetTodolistsQuery(undefined, { skip: !isLoggedIn });

  //handlers
  const addTodolistHandler = (title: string) => {
    addTodolist(title);
  };
  const changeTodolistEditModeHandler = ({ todolistId, isEditMode }: { todolistId: string, isEditMode: boolean }) => {
    if (!todolists) return;
    const updatedTodolists = todolists.map(tl => tl.id === todolistId ? {
      ...tl,
      isEditMode: isEditMode,
      isDisabled: isEditMode
    } : tl);
    dispatch(todolistsApi.util.upsertQueryData("getTodolists", undefined, updatedTodolists));
  };
  const changeTodolistIsDisabledHandler = ({ todolistId, isDisabled }: { todolistId: string, isDisabled: boolean }) => {
    if (!todolists) return;
    const updatedTodolists = todolists.map(tl => tl.id === todolistId ? { ...tl, isDisabled } : tl);
    dispatch(todolistsApi.util.upsertQueryData("getTodolists", undefined, updatedTodolists));
  };


  if (!isLoggedIn) {
    return <Navigate to={"/login"} />;
  }

  return (
    <>
      {isFetchingTodolists
        ?
        <>
          <AddItemFormSkeleton/>
          {Array(6).fill(null).map((_, id) => <TodolistSkeleton key={id}/>)}
        </>
        :
        <>
          <AddItemForm addItem={addTodolistHandler} placeholder={"Todolist title"} />
          {todolists?.map(tl => {
            return (
              <Todolist
                key={tl.id}
                todolist={tl}
                changeTodolistEditMode={changeTodolistEditModeHandler}
                changeTodolistIsDisabled={changeTodolistIsDisabledHandler}
              />
            );
          })}
        </>
      }

    </>
  );
};

