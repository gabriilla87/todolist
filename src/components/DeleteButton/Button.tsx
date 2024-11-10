import React, {MouseEvent} from 'react';
import s from './DeleteButton.module.css'

type Props = {
    onClick: () => void
    imgSrc: string
    disabled?: boolean
}

export const Button = ({ onClick, imgSrc, disabled = false }: Props) => {
    const onClickHandler = (e: MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation()
        onClick()
    }

    return (
        <button onClick={onClickHandler} className={s.button} disabled={disabled}>
            <img src={imgSrc} alt={"Button"}/>
        </button>
    )
};
