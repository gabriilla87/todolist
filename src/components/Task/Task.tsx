import React, {useState} from 'react';
import s from "./Task.module.css"
import {CRUDButtons} from "../CRUDButtonsWrapper/CRUDButtons";
import {EditableSpan} from "../EditableSpan/EditableSpan";
import {Checkbox} from "@mui/material";
import {DomainTask, UpdateTaskModel, useRemoveTaskMutation, useUpdateTaskMutation} from "../../dal/api/tasksApi";
import {ChangeTaskEditMode} from "../Todolist/Todolist";

type Props = {
    task: DomainTask,
    changeTaskEditMode: (args: ChangeTaskEditMode) => void
}

export const Task = ({task, changeTaskEditMode}: Props) => {
    const {id: taskId, isEditMode, todoListId: todolistId} = task

    //hooks
    const [removeTask] = useRemoveTaskMutation()
    const [updateTask] = useUpdateTaskMutation()
    const [isDone, setIsDone] = useState(false);

    //handlers
    const switchIsStrikethrough = () => {
        setIsDone(prev => !prev)
    }
    const changeTaskEditModeHandler = (isEditMode: boolean) => {
        changeTaskEditMode({todolistId, taskId, isEditMode})
    }
    const changeTaskTitleHandler = (title: string) => {
        const model: UpdateTaskModel = {
            title,
            deadline: task.deadline,
            description: task.description,
            priority: task.priority,
            status: task.status,
            startDate: task.startDate
        }
        updateTask({todolistId, taskId, model})
    }
    const removeTaskHandler = () => {
        removeTask({todolistId, taskId})
    }

    return (
        <div className={`${s.taskWrapper} ${isDone ? s.strikethrough : ""}`}>
            <div className={s.checkboxAndTitleWrapper}>
                <Checkbox sx={{padding: 0}} color={"default"} onChange={switchIsStrikethrough} value={isDone}/>
                <EditableSpan
                    isEditMode={task.isEditMode}
                    title={task.title}
                    changeItemTitle={changeTaskTitleHandler}
                    changeItemEditMode={changeTaskEditModeHandler}
                    isDone={isDone}
                />
            </div>
            <CRUDButtons
                changeItemEditMode={changeTaskEditModeHandler}
                removeItem={removeTaskHandler}
                isEditMode={isEditMode}
            />
        </div>
    );
};