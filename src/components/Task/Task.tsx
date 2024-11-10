import React, {useState} from 'react';
import s from "./Task.module.css"
import {changeTaskEditMode, changeTaskTitle, DomainTask, removeTask} from "../../bll/reducers/taskReducer";
import {CRUDButtons} from "../CRUDButtonsWrapper/CRUDButtons";
import {EditableSpan} from "../EditableSpan/EditableSpan";
import {useAppDispatch} from "../../bll/store";
import {Checkbox} from "@mui/material";

type Props = {
    task: DomainTask
    todolistId: string
}

export const Task = ({task, todolistId}: Props) => {
    const {id: taskId, isEditMode} = task

    const [isDone, setIsDone] = useState(false);

    const dispatch = useAppDispatch()

    const switchIsStrikethrough = () => {
        setIsDone(prev => !prev)
    }

    const changeTaskTitleHandler = (title: string) => {
        dispatch(changeTaskTitle({todolistId, taskId, title}))
    }

    const changeTaskEditModeHandler = (isEditMode: boolean) => {
        dispatch(changeTaskEditMode({todolistId, taskId, isEditMode}))
    }

    const removeTaskHandler = () => {
        dispatch(removeTask({todolistId, taskId}))
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