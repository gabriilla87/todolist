import React, {useEffect, useRef, useState} from 'react';
import s from './Todolist.module.css'
import {CollapseArrow} from "../CollapseArrow/CollapseArrow";
import {AddItemForm} from "../AddItemForm/AddItemForm";
import {Task} from "../Task/Task";
import {CRUDButtons} from "../CRUDButtonsWrapper/CRUDButtons";
import {EditableSpan} from "../EditableSpan/EditableSpan";
import {DomainTodolist, useRemoveTodolistMutation, useUpdateTodolistTitleMutation} from "../../dal/api/todolistsApi";
import {tasksApi, useAddTaskMutation, useGetTasksQuery} from "../../dal/api/tasksApi";
import {useAppDispatch} from "../../bll/store";

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
    const {data: tasks} = useGetTasksQuery(todolistId)
    const [removeTodolist] = useRemoveTodolistMutation()
    const [updateTodolistTitle] = useUpdateTodolistTitleMutation()
    const [addTask] = useAddTaskMutation()
    const [isOpen, toggleIsOpen] = useState(false)
    const contentRef = useRef<HTMLDivElement>(null);
    const dispatch = useAppDispatch()

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

    useEffect(() => {
        if (contentRef.current) {
            // Плавный переход: когда контейнер раскрывается, устанавливаем максимальную высоту
            contentRef.current.style.maxHeight = isOpen ? `${contentRef.current.scrollHeight + 20}px` : '0';
        }
    }, [isOpen, tasks]);

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
                {tasks?.map(el => <Task key={el.id} task={el} changeTaskEditMode={changeTaskEditMode}/>)}
            </div>
        </div>
    );
};


