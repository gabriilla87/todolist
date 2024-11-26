import React from 'react';
import s from "./Task.module.css"
import {CRUDButtons} from "../CRUDButtonsWrapper/CRUDButtons";
import {EditableSpan} from "../EditableSpan/EditableSpan";
import {Checkbox} from "@mui/material";
import {
    DomainTask,
    UpdateTaskModel,
    useRemoveTaskMutation,
    useUpdateTaskMutation
} from "../../dal/api/tasksApi";
import {ChangeTaskEditMode} from "../Todolist/Todolist";
import {useSortable} from "@dnd-kit/sortable";
import {CSS} from "@dnd-kit/utilities";
import dragIcon from "../../assets/svg/dragIcon.svg"

type Props = {
    task: DomainTask,
    changeTaskEditMode: (args: ChangeTaskEditMode) => void
}

export const Task = ({task, changeTaskEditMode}: Props) => {
    const {id: taskId, isEditMode, todoListId: todolistId, status} = task
    const model: UpdateTaskModel = {
        title: task.title,
        deadline: task.deadline,
        description: task.description,
        priority: task.priority,
        status: task.status,
        startDate: task.startDate
    }

    const TaskStatuses = {
        done: 1,
        active: 0
    } as const

    //hooks
    const [removeTask] = useRemoveTaskMutation()
    const [updateTask] = useUpdateTaskMutation()

    const {attributes, listeners, setNodeRef, transform, transition} = useSortable({id: taskId})

    //handlers
    const changeTaskEditModeHandler = (isEditMode: boolean) => {
        changeTaskEditMode({todolistId, taskId, isEditMode})
    }
    const changeTaskTitleHandler = (title: string) => {
        const changeTaskTitleModel: UpdateTaskModel = {...model, title}
        updateTask({todolistId, taskId, model: changeTaskTitleModel})
    }
    const changeTaskStatusHandler = () => {
        const updateTaskStatusModel = {
            ...model,
            status: status === TaskStatuses.active ? TaskStatuses.done : TaskStatuses.active
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
                    isDone={!!status}
                />
            </div>
            <div className={s.buttonsAndIconsWrapper}>
                <CRUDButtons
                    changeItemEditMode={changeTaskEditModeHandler}
                    removeItem={removeTaskHandler}
                    isEditMode={isEditMode}
                />
                <div className={s.iconsWrapper} {...attributes} {...listeners}>
                    <img src={dragIcon} alt={"drag item"}/>
                </div>
            </div>
        </div>
    );
};