import React, {useState} from 'react';
import s from "./Task.module.css"
import TaskStatus from "../TaskStatus/TaskStatus";

export const Task = () => {
    const [isDone, setIsDone] = useState(false);

    const switchIsStrikethrough = () => {
        setIsDone(prev => !prev)
    }

    return (
        <div className={`${s.taskWrapper} ${isDone ? s.strikethrough : ""}`}>
            <span
                className={`${s.taskText} ${isDone ? s.isDone : ""}`}
                onClick={switchIsStrikethrough}
            >
                default text
            </span>
            <TaskStatus level={4} isDone={isDone}/>
        </div>
    );
};