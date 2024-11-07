import React, {useEffect, useRef, useState} from 'react';
import s from './Todolist.module.css'
import {CollapseArrow} from "../CollapseArrow/CollapseArrow";
type Props = {
    children?: React.ReactNode
    todolistNumber?: number | string
}

export const Todolist = ({children, todolistNumber}: Props) => {
    const [isOpen, toggleIsOpen] = useState(false)
    const contentRef = useRef<HTMLDivElement>(null);

    const toggleOpen = () => {
        toggleIsOpen(prev => !prev);
    };

    useEffect(() => {
        if (contentRef.current) {
            // Плавный переход: когда контейнер раскрывается, устанавливаем максимальную высоту
            contentRef.current.style.maxHeight = isOpen ? `${contentRef.current.scrollHeight + 20}px` : '0';
        }
    }, [isOpen]);

    return (
        <div className={s.todolistWrapper}>
            <div className={s.todosHeader} onClick={toggleOpen}>
                <div className={s.todosHeaderText}>
                    <span className={s.todolistTitle}>Todolist {todolistNumber || 1}</span>
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
                {children}
            </div>
        </div>
    );
};


