import React from 'react';
import s from './ErrorPage.module.css'

export const ErrorPage = () => {
    const handleGoHome = () => {
        window.location.href = '/';
    };

    return (
        <div className={s.container}>
            <h1 className={s.heading}>404</h1>
            <p className={s.paragraph}>Страница не найдена</p>
            <button className={s.button} onClick={handleGoHome}>
                Вернуться на главную
            </button>
        </div>
    );
};