import React, { useEffect } from "react";
import s from "./Task.module.css"
import {CRUDButtons} from "../CRUDButtons/CRUDButtons";
import {EditableSpan} from "../EditableSpan/EditableSpan";
import {Checkbox} from "@mui/material";
import {
    DomainTask,
    UpdateTaskModel,
    useRemoveTaskMutation,
    useUpdateTaskMutation
} from "../../dal/api/tasksApi";
import { ChangeTaskEditMode, ChangeTaskIsDisabled } from "../Todolist/Todolist";
import {useSortable} from "@dnd-kit/sortable";
import {CSS} from "@dnd-kit/utilities";
import dragIcon from "../../assets/svg/dragIcon.svg"
import { TASK_STATUSES } from "../../enums/enums";

type Props = {
    task: DomainTask,
    changeTaskEditMode: (args: ChangeTaskEditMode) => void
    changeTaskIsDisabled: (args: ChangeTaskIsDisabled) => void
}

export const Task = ({task, changeTaskEditMode, changeTaskIsDisabled}: Props) => {
    const {id: taskId, isDisabled, todoListId: todolistId, status} = task
    const model: UpdateTaskModel = {
        title: task.title,
        deadline: task.deadline,
        description: task.description,
        priority: task.priority,
        status: task.status,
        startDate: task.startDate
    }

    //hooks
    const [removeTask, {isLoading: isTaskRemoving}] = useRemoveTaskMutation()
    const [updateTask, {isLoading: isTaskUpdating}] = useUpdateTaskMutation()

    const {attributes, listeners, setNodeRef, transform, transition} = useSortable({id: taskId})

    //handlers
    const changeTaskEditModeHandler = (isEditMode: boolean) => {
        changeTaskEditMode({todolistId, taskId, isEditMode})
    }
    const changeTaskIsDisabledHandler = (isDisabled: boolean) => {
        changeTaskIsDisabled({todolistId, taskId, isDisabled})
    }
    const changeTaskTitleHandler = (title: string) => {
        const changeTaskTitleModel: UpdateTaskModel = {...model, title}
        updateTask({todolistId, taskId, model: changeTaskTitleModel})
    }
    const changeTaskStatusHandler = () => {
        const updateTaskStatusModel = {
            ...model,
            status: status === TASK_STATUSES.ACTIVE ? TASK_STATUSES.DONE : TASK_STATUSES.ACTIVE
        }
        updateTask({todolistId, taskId, model: updateTaskStatusModel})
    }
    const removeTaskHandler = () => {
        removeTask({todolistId, taskId})
    }

    const style = {
        transition,
        transform: CSS.Transform.toString(transform)
    }

    useEffect(() => {
        changeTaskIsDisabledHandler(isTaskRemoving || isTaskUpdating)
    }, [isTaskRemoving, isTaskUpdating]);

    return (
        <div className={s.taskWrapper} ref={setNodeRef} style={style}>
            <div className={s.checkboxAndTitleWrapper}>
                <Checkbox
                    sx={{padding: 0}}
                    color={"default"}
                    onChange={changeTaskStatusHandler}
                    value={!!status}
                    checked={!!status}
                />
                <EditableSpan
                    isEditMode={task.isEditMode}
                    title={task.title}
                    changeItemTitle={changeTaskTitleHandler}
                    changeItemEditMode={changeTaskEditModeHandler}
                    removeItem={removeTaskHandler}
                    isDisabled={isDisabled}
                    isDone={!!status}
                />
            </div>
            <div className={s.buttonsAndIconsWrapper}>
                <div className={s.iconsWrapper} {...attributes} {...listeners}>
                    <img src={dragIcon} alt={"drag item"}/>
                </div>
            </div>
        </div>
    );
};