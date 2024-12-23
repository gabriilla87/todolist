import React from 'react';
import {Button, SvgProps} from "../Button/Button";
import s from './CRUDButtons.module.css';

type Props = {
    removeItem: () => void
    changeItemEditMode: (isEditMode: boolean) => void
    isDisabled: boolean
}

export const CRUDButtons = ({changeItemEditMode, removeItem, isDisabled}: Props) => {
    const changeItemEditModeHandler = () => {
        changeItemEditMode(true)
    }

    const removeTaskHandler = () => {
        removeItem()
    }

    const svgObjs: SvgProps[] = [
        {
            id: "changeIcon",
            viewBox: "0 0 192 192",
            onClick: changeItemEditModeHandler
        },
        {
            id: "deleteIcon",
            viewBox: "0 0 24 24",
            onClick: removeTaskHandler,
        },
    ]

    return (
        <div className={s.buttonsWrapper}>
            {isDisabled && <div className={s.hideButtonsWrapper}/>}
            {svgObjs.map(o => <Button key={o.id} svgProps={o} disabled={isDisabled}/>)}
        </div>
    );
};