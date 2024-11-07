import React from 'react';
import s from './CollapseArrow.module.css'

type Props = {
    isOpen: boolean
}

export const CollapseArrow = ({isOpen}: Props) => {
    return (
        <div className={`${s.arrow} ${isOpen ? s.open : ''}`}>
            <span className={s.arrowLeft}></span>
            <span className={s.arrowRight}></span>
        </div>
    );
};