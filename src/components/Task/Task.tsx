import React, {useState} from 'react';
import s from "./Task.module.css"
import TaskStatus from "../TaskStatus/TaskStatus";
import {DomainTask} from "../../bll/reducers/taskReducer";

type Props = {
    task: DomainTask
}

export const Task = ({task}: Props) => {
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
                {task.title}
            </span>
            <TaskStatus level={4} isDone={isDone}/>
        </div>
    );
};