import React, {useEffect, useState} from 'react';
import s from './TaskStatus.module.css';

type Props = {
    level: number
    isDone: boolean
}

const TaskStatus = ({level, isDone}: Props) => {
    const totalBars = 5;

    const [taskStatus, setTaskStatus] = useState<number>(isDone ? 0 : level)

    const getBarColor = (index: number) => {
        if (index < taskStatus) {
            switch (taskStatus) {
                case 1:
                    return '#b3ffb3'; // Light green
                case 2:
                    return '#66ff66'; // Green
                case 3:
                    return '#ffff66'; // Yellow
                case 4:
                    return '#ff9966'; // Orange
                case 5:
                    return '#ff6666'; // Red
                default:
                    return '#ccc';    // Default gray
            }
        }
        return '#ccc'; // Inactive bar color
    };

    const changeTaskStatus = (index: number) => {
        if (!isDone) setTaskStatus(index === taskStatus ? 0 : index)
    }

    useEffect(() => {
        setTaskStatus(isDone ? 0 : 3)
    }, [isDone]);

    return (
        <div className={s.taskStatus}>
            {[...Array(totalBars)].map((_, index) => (
                <div
                    key={index}
                    className={s.bar}
                    style={{
                        backgroundColor: getBarColor(index),
                    }}
                    onClick={() => changeTaskStatus(index + 1)}
                />
            ))}
        </div>
    );
};

export default TaskStatus;