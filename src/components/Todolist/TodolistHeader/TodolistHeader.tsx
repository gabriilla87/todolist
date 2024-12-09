import React from 'react';
import s from "./TodolistHeader.module.css";
import { CollapseArrow } from "../../CollapseArrow/CollapseArrow";
import { EditableSpan } from "../../EditableSpan/EditableSpan";
import { DomainTodolist, useUpdateTodolistTitleMutation } from "../../../dal/api/todolistsApi";

type Props = {
  todolist: DomainTodolist
  isOpen: boolean
  numOfItems: number | undefined
  removeTodolist: () => void
  toggleIsOpen: () => void
  changeTodolistEditMode: () => void
}

export const TodolistHeader = (props: Props) => {
  const {
    removeTodolist,
    toggleIsOpen,
    changeTodolistEditMode,
    isOpen,
    todolist,
    numOfItems
  } = props

  const { title, id: todolistId, isEditMode, isDisabled } = todolist

  const [updateTodolistTitle] = useUpdateTodolistTitleMutation();

  const toggleOpen = () => {
    toggleIsOpen();
  };

  const changeTodolistTitleHandler = (title: string) => {
    updateTodolistTitle({ todolistId, title });
  };

  return (
    <>
      <div className={s.header} onClick={toggleOpen}>
        <div className={s.headerLeftSide}>
          <CollapseArrow isOpen={isOpen} />
          <div className={s.headerText}>
            <EditableSpan
              isEditMode={isEditMode}
              title={title}
              changeItemTitle={changeTodolistTitleHandler}
              changeItemEditMode={changeTodolistEditMode}
              removeItem={removeTodolist}
              isDisabled={isDisabled}
            />
            <span className={s.numOfItems}>Items: {numOfItems || "0"}</span>
          </div>
        </div>
      </div>
    </>
  );
};