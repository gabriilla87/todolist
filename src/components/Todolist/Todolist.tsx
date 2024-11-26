import React, {useEffect, useRef, useState} from 'react';
import s from './Todolist.module.css'
import {CollapseArrow} from "../CollapseArrow/CollapseArrow";
import {AddItemForm} from "../AddItemForm/AddItemForm";
import {Task} from "../Task/Task";
import {CRUDButtons} from "../CRUDButtonsWrapper/CRUDButtons";
import {EditableSpan} from "../EditableSpan/EditableSpan";
import {DomainTodolist, useRemoveTodolistMutation, useUpdateTodolistTitleMutation} from "../../dal/api/todolistsApi";
import {
    DomainTask,
    tasksApi,
    useAddTaskMutation,
    useChangeTaskOrderMutation,
    useGetTasksQuery
} from "../../dal/api/tasksApi";
import {useAppDispatch} from "../../app/store";
import {arrayMove, SortableContext, verticalListSortingStrategy} from "@dnd-kit/sortable";
import {closestCorners, DndContext, DragEndEvent, useDroppable} from "@dnd-kit/core";

//types
type Props = {
    todolist: DomainTodolist
    changeTodolistEditMode: ({todolistId, isEditMode}: {todolistId: string, isEditMode: boolean}) => void
}
export type ChangeTaskEditMode = {
    todolistId: string
    taskId: string
    isEditMode: boolean
}

export const Todolist = ({todolist, changeTodolistEditMode}: Props) => {
    const {title, id: todolistId, isEditMode} = todolist

    //hooks
    const {data: tasks, isSuccess} = useGetTasksQuery(todolistId)
    const [changeTaskOrder] = useChangeTaskOrderMutation()
    const [removeTodolist] = useRemoveTodolistMutation()
    const [updateTodolistTitle] = useUpdateTodolistTitleMutation()
    const [addTask] = useAddTaskMutation()
    const { setNodeRef } = useDroppable({
        id: todolistId
    });
    const [isOpen, toggleIsOpen] = useState(false)
    const contentRef = useRef<HTMLDivElement>(null);
    const dispatch = useAppDispatch()
    const [preloadedTasks, setPreloadedTasks] = useState<DomainTask[]>()

    //handlers
    const toggleOpen = () => {
        toggleIsOpen(prev => !prev);
    };
    const addTaskHandler = (title: string) => {
        addTask({todolistId, title})
    }
    const removeTodolistHandler = () => {
        removeTodolist(todolistId)
    }
    const changeTodolistTitleHandler = (title: string) => {
        updateTodolistTitle({todolistId, title})
    }
    const changeTodolistEditModeHandler = (isEditMode: boolean) => {
        changeTodolistEditMode({todolistId, isEditMode})
    }
    const changeTaskEditMode = ({todolistId, taskId, isEditMode}: ChangeTaskEditMode) => {
        if (!tasks) return;
        const updatedTasks = tasks.map(t => t.id === taskId ? {...t, isEditMode: isEditMode} : t);
        dispatch(tasksApi.util.upsertQueryData('getTasks', todolistId, updatedTasks));
    }
    const findTaskIndex = (id: string) => preloadedTasks?.findIndex(el => el.id === id)
    const onDragEndHandler = (event: DragEndEvent) => {
        const {active, over} = event;
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
        changeTaskOrder({todolistId, taskId: `${active.id}`, putAfterTaskId});
    };


    useEffect(() => {
        if (contentRef.current) {
            // Плавный переход: когда контейнер раскрывается, устанавливаем максимальную высоту
            contentRef.current.style.maxHeight = isOpen ? `${contentRef.current.scrollHeight + 20}px` : '0';
        }
    }, [isOpen, tasks, preloadedTasks]);

    useEffect(() => {
        if (isSuccess) setPreloadedTasks(tasks)
    }, [isSuccess, tasks])

    return (
        <div className={s.todolistWrapper}>
            <div className={s.todosHeader} onClick={toggleOpen}>
                <div className={s.todosHeaderLeftSide}>
                    <div className={s.todosHeaderText}>
                        <EditableSpan
                            isEditMode={isEditMode}
                            title={title}
                            changeItemTitle={changeTodolistTitleHandler}
                            changeItemEditMode={changeTodolistEditModeHandler}
                        />
                        <span className={s.numOfTasks}>Tasks: {tasks?.length}</span>
                    </div>
                    <CRUDButtons
                        removeItem={removeTodolistHandler}
                        changeItemEditMode={changeTodolistEditModeHandler}
                        isEditMode={isEditMode}
                    />                </div>
                <CollapseArrow isOpen={isOpen}/>
            </div>
            <div
                className={s.openTodosBlock}
                ref={contentRef}
                style={{
                    opacity: isOpen ? 1 : 0,
                }}
            >
                <span className={s.underline} style={{margin: isOpen ? "0 auto 10px" : "0 auto"}}></span>
                <AddItemForm addItem={addTaskHandler} placeholder={"Task title"}/>
                <DndContext onDragEnd={onDragEndHandler} collisionDetection={closestCorners}>
                    <SortableContext items={preloadedTasks || []} strategy={verticalListSortingStrategy}>
                        <div ref={setNodeRef}>
                            {isSuccess ? preloadedTasks?.map(el => <Task key={el.id} task={el} changeTaskEditMode={changeTaskEditMode}/>) : ""}
                        </div>
                    </SortableContext>
                </DndContext>
            </div>
        </div>
    );
};


