import React, { RefObject } from "react";
import s from "../Todolist.module.css";
import { AddItemForm } from "../../AddItemForm/AddItemForm";
import { closestCorners, DndContext, DragEndEvent, SensorDescriptor, SensorOptions } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { Task } from "../../Task/Task";
import { DomainTask, tasksApi } from "../../../dal/api/tasksApi";
import { ChangeTaskEditMode, ChangeTaskIsDisabled } from "../Todolist";
import { useAppDispatch } from "../../../app/store";

type Props = {
  onDragEnd: (event: DragEndEvent) => void
  setNodeRef: (element: HTMLElement | null) => void
  addTask: (title: string) => void
  contentRef: RefObject<HTMLDivElement>
  isOpen: boolean
  isSuccess: boolean
  sensors: SensorDescriptor<SensorOptions>[]
  preloadedTasks: DomainTask[] | undefined
  tasks: DomainTask[] | undefined
}

export const TodolistBody = (props: Props) => {
  const {
    onDragEnd,
    addTask,
    setNodeRef,
    contentRef,
    isOpen,
    sensors,
    preloadedTasks,
    isSuccess,
    tasks
  } = props

  const dispatch = useAppDispatch()

  const onDragEndHandler = (event: DragEndEvent) => {
    onDragEnd(event)
  }
  const addTaskHandler = (title: string) => {
    addTask(title)
  }
  const changeTaskIsDisabled = ({ todolistId, taskId, isDisabled }: ChangeTaskIsDisabled) => {
    if (!tasks) return;
    const updatedTasks = tasks.map(t => t.id === taskId ? { ...t, isDisabled } : t);
    dispatch(tasksApi.util.upsertQueryData("getTasks", todolistId, updatedTasks));
  };
  const changeTaskEditMode = ({ todolistId, taskId, isEditMode }: ChangeTaskEditMode) => {
    if (!tasks) return;
    const updatedTasks = tasks.map(t => t.id === taskId ? { ...t, isEditMode, isDisabled: isEditMode } : t);
    dispatch(tasksApi.util.upsertQueryData("getTasks", todolistId, updatedTasks));
  };

  return (
    <div
      className={s.openTodosBlock}
      ref={contentRef}
      style={{ opacity: isOpen ? 1 : 0 }}
    >
      <span className={s.underline} style={{ margin: isOpen ? "5px auto 10px" : "0 auto" }}></span>
      <AddItemForm addItem={addTaskHandler} placeholder={"Task title"} />
      <DndContext sensors={sensors} onDragEnd={onDragEndHandler} collisionDetection={closestCorners}>
        <SortableContext items={preloadedTasks || []} strategy={verticalListSortingStrategy}>
          <div ref={setNodeRef}>
            {isSuccess && preloadedTasks?.map(el => <Task
              key={el.id}
              task={el}
              changeTaskEditMode={changeTaskEditMode}
              changeTaskIsDisabled={changeTaskIsDisabled}
            />)}
          </div>
        </SortableContext>
      </DndContext>
    </div>
  );
};