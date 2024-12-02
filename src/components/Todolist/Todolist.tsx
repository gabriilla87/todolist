import React, { useEffect } from "react";
import s from "./Todolist.module.css";
import { DomainTodolist } from "../../dal/api/todolistsApi";
import { DomainTask } from "../../dal/api/tasksApi";
import { arrayMove } from "@dnd-kit/sortable";
import { DragEndEvent } from "@dnd-kit/core";
import { TodolistHeader } from "./TodolistHeader/TodolistHeader";
import { useTodolistData } from "../../hooks/useTodolistData";
import { TodolistBody } from "./TodolistBody/TodolistBody";

//types
type Props = {
  todolist: DomainTodolist
  changeTodolistEditMode: ({ todolistId, isEditMode }: { todolistId: string, isEditMode: boolean }) => void
  changeTodolistIsDisabled: ({ todolistId, isDisabled }: { todolistId: string, isDisabled: boolean }) => void
}
export type ChangeTaskEditMode = {
  todolistId: string
  taskId: string
  isEditMode: boolean
}
export type ChangeTaskIsDisabled = Omit<ChangeTaskEditMode, "isEditMode"> & {
  isDisabled: boolean
}

export const Todolist = ({ todolist, changeTodolistEditMode, changeTodolistIsDisabled }: Props) => {
  const { title, id: todolistId, isEditMode, isDisabled } = todolist;

  //hooks
  const {
    sensors,
    tasks,
    isSuccess,
    changeTaskOrder,
    removeTodolist,
    isTodolistRemoving,
    addTask,
    setNodeRef,
    isOpen,
    toggleIsOpen,
    contentRef,
    preloadedTasks,
    setPreloadedTasks
  } = useTodolistData(todolistId);

  //handlers
  const toggleIsOpenHandler = () => {
    toggleIsOpen(prev => !prev);
  };
  const removeTodolistHandler = () => {
    removeTodolist(todolistId);
  };
  const changeTodolistEditModeHandler = () => {
    changeTodolistEditMode({ todolistId, isEditMode });
  };
  const changeTodolistIsDisabledHandler = (isDisabled: boolean) => {
    changeTodolistIsDisabled({ todolistId, isDisabled });
  };
  const findTaskIndex = (id: string) => preloadedTasks?.findIndex(el => el.id === id);
  const onDragEndHandler = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) {
      return;
    }

    const originalPos = findTaskIndex(`${active.id}`);
    const newPos = findTaskIndex(`${over.id}`);

    // Прерываем, если элемент остаётся на той же позиции
    if (originalPos === newPos) {
      return;
    }

    // Определяем идентификатор для API: null, если перемещаем на верх
    const putAfterTaskId = newPos === 0 ? null : `${over.id}`;

    setPreloadedTasks(tasks => arrayMove(tasks as DomainTask[], originalPos as number, newPos as number));
    changeTaskOrder({ todolistId, taskId: `${active.id}`, putAfterTaskId });
  };
  const addTaskHandler = (title: string) => {
    addTask({ todolistId, title });
  };

  useEffect(() => {
    if (contentRef.current) {
      contentRef.current.style.maxHeight = isOpen ? `${contentRef.current.scrollHeight + 20}px` : "0";
    }
  }, [isOpen, tasks, preloadedTasks, contentRef]);

  useEffect(() => {
    if (isSuccess) setPreloadedTasks(tasks);
  }, [isSuccess, tasks]);

  useEffect(() => {
    changeTodolistIsDisabledHandler(isTodolistRemoving);
  }, [isTodolistRemoving]);

  return (
    <div className={s.todolistWrapper}>
      <TodolistHeader
        title={title}
        isDisabled={isDisabled}
        isEditMode={isEditMode}
        isOpen={isOpen}
        todolistId={todolistId}
        numOfItems={tasks?.length}
        toggleIsOpen={toggleIsOpenHandler}
        removeTodolist={removeTodolistHandler}
        changeTodolistEditMode={changeTodolistEditModeHandler}
      />
      <TodolistBody
        onDragEnd={onDragEndHandler}
        addTask={addTaskHandler}
        setNodeRef={setNodeRef}
        contentRef={contentRef}
        sensors={sensors}
        preloadedTasks={preloadedTasks}
        tasks={tasks}
        isOpen={isOpen}
        isSuccess={isSuccess}
      />
    </div>
  );
};


