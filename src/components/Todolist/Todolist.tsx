import React, {useEffect, useRef, useState} from 'react';
import s from './Todolist.module.css'
import {CollapseArrow} from "../CollapseArrow/CollapseArrow";
import {AddItemForm} from "../AddItemForm/AddItemForm";
import {RootState, useAppDispatch} from "../../bll/store";
import {useSelector} from "react-redux";
import {addTask, TasksState} from "../../bll/reducers/taskReducer";
import {Task} from "../Task/Task";
import {DomainTodolist} from "../../bll/reducers/todolistReducer";
import {v1} from "uuid";

type Props = {
    todolist: DomainTodolist
}

export const Todolist = ({todolist}: Props) => {
    const {title, id} = todolist

    const [isOpen, toggleIsOpen] = useState(false)
    const contentRef = useRef<HTMLDivElement>(null);

    const dispatch = useAppDispatch()
    const tasks = useSelector<RootState, TasksState>(state => state.tasks)

    const toggleOpen = () => {
        toggleIsOpen(prev => !prev);
    };

    useEffect(() => {
        if (contentRef.current) {
            // Плавный переход: когда контейнер раскрывается, устанавливаем максимальную высоту
            contentRef.current.style.maxHeight = isOpen ? `${contentRef.current.scrollHeight + 20}px` : '0';
        }
    }, [isOpen, tasks]);

    const addTaskHandler = (title: string) => {
        dispatch(addTask({todolistId: id, id: v1(), title}))
    }

    return (
        <div className={s.todolistWrapper}>
            <div className={s.todosHeader} onClick={toggleOpen}>
                <div className={s.todosHeaderText}>
                    <span className={s.todolistTitle}>{title || 1}</span>
                    <span className={s.numOfTasks}>Tasks: 5</span>
                </div>
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
                <AddItemForm addItem={addTaskHandler}/>
                {tasks[id].map(el => <Task task={el}/>)}
            </div>
        </div>
    );
};


