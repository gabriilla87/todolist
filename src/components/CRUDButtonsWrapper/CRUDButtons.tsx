import React from 'react';
import {Button} from "../DeleteButton/Button";
import DeleteButtonIcon from "../../assets/svg/delete-2-svgrepo-com.svg";
import RenameButtonIcon from "../../assets/svg/pencil-svgrepo-com.svg";
import s from './CRUDButtonsWrapper.module.css';

type Props = {
    removeItem: () => void
    changeItemEditMode: (isEditMode: boolean) => void
    isEditMode: boolean
}

export const CRUDButtons = ({changeItemEditMode, removeItem, isEditMode}: Props) => {
    const changeItemEditModeHandler = () => {
        changeItemEditMode(true)
    }

    const removeTaskHandler = () => {
        removeItem()
    }

    return (
        <div className={s.buttonsWrapper}>
            <Button onClick={changeItemEditModeHandler} imgSrc={RenameButtonIcon} disabled={isEditMode}/>
            <Button onClick={removeTaskHandler} imgSrc={DeleteButtonIcon} disabled={isEditMode}/>
        </div>
    );
};