import React, {useEffect, useRef, useState} from 'react';
import s from './Todolist.module.css'
import {CollapseArrow} from "../CollapseArrow/CollapseArrow";
import {AddItemForm} from "../AddItemForm/AddItemForm";
import {RootState, useAppDispatch} from "../../bll/store";
import {useSelector} from "react-redux";
import {addTask, DomainTask} from "../../bll/reducers/taskReducer";
import {Task} from "../Task/Task";
import {
    changeTodolistEditMode,
    changeTodolistTitle,
    DomainTodolist,
    removeTodolist
} from "../../bll/reducers/todolistReducer";
import {v1} from "uuid";
import {CRUDButtons} from "../CRUDButtonsWrapper/CRUDButtons";
import {EditableSpan} from "../EditableSpan/EditableSpan";

type Props = {
    todolist: DomainTodolist
}

export const Todolist = ({todolist}: Props) => {
    const {title, id: todolistId, isEditMode} = todolist

    const [isOpen, toggleIsOpen] = useState(false)
    const contentRef = useRef<HTMLDivElement>(null);

    const dispatch = useAppDispatch()
    const tasks = useSelector<RootState, DomainTask[]>(state => state.tasks[todolistId])

    const toggleOpen = () => {
        toggleIsOpen(prev => !prev);
    };

    const addTaskHandler = (title: string) => {
        dispatch(addTask({todolistId, id: v1(), title}))
    }

    const removeTodolistHandler = () => {
        dispatch(removeTodolist({todolistId}))
    }

    const changeTodolistTitleHandler = (title: string) => {
        dispatch(changeTodolistTitle({todolistId, title}))
    }

    const changeTodolistEditModeHandler = (isEditMode: boolean) => {
        dispatch(changeTodolistEditMode({todolistId, isEditMode}))
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
                        <span className={s.numOfTasks}>Tasks: 0</span>
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
                {tasks?.map(el => <Task task={el} todolistId={todolistId}/>)}
            </div>
        </div>
    );
};


