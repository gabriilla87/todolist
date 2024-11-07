import React from 'react';
import s from './Wrapper.module.css'

type Props = {
    children?: React.ReactNode
}

export const Wrapper = ({children}: Props) => {
    return (
        <div className={s.wrapper}>
            {children}
        </div>
    );
};