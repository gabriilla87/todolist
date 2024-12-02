import { MouseSensor, TouchSensor, useDroppable, useSensor, useSensors } from "@dnd-kit/core";
import { DomainTask, useAddTaskMutation, useChangeTaskOrderMutation, useGetTasksQuery } from "../dal/api/tasksApi";
import { useRemoveTodolistMutation } from "../dal/api/todolistsApi";
import { useRef, useState } from "react";

export const useTodolistData = (todolistId: string) => {
  const mouseSensor = useSensor(MouseSensor, { activationConstraint: { distance: 10 } });
  const touchSensor = useSensor(TouchSensor, { activationConstraint: { delay: 200, tolerance: 5 } });
  const sensors = useSensors(mouseSensor, touchSensor);
  const { data: tasks, isSuccess } = useGetTasksQuery(todolistId);
  const [changeTaskOrder] = useChangeTaskOrderMutation();
  const [removeTodolist, { isLoading: isTodolistRemoving }] = useRemoveTodolistMutation();
  const [addTask] = useAddTaskMutation();
  const { setNodeRef } = useDroppable({
    id: todolistId
  });
  const [isOpen, toggleIsOpen] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const [preloadedTasks, setPreloadedTasks] = useState<DomainTask[]>();

  return {
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
  }
}