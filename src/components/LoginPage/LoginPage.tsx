import React, {useEffect} from 'react';
import s from './LoginPage.module.css'
import {FieldValues, SubmitHandler, useForm} from "react-hook-form";
import {useLoginMutation} from "../../dal/api/authApi";
import {RESULT_CODE} from "../../enums/enums";
import {useSelector} from "react-redux";
import {selectIsLoggedIn, setIsLoggedIn} from "../../app/appSlice";
import {Navigate} from "react-router-dom";
import {useAppDispatch} from "../../app/store";

export const LoginPage = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [loginIn, {data: loginData}] = useLoginMutation()
    const isLoggedIn = useSelector(selectIsLoggedIn)
    const dispatch = useAppDispatch()

    // const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    //     e.preventDefault();
    //     // Handle form submission logic here
    //     console.log({ login, password, rememberMe });
    // };

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        const {email, password, rememberMe} = data
        loginIn({email, password, rememberMe})
    };

    useEffect(() => {
        if (loginData && loginData.resultCode === RESULT_CODE.SUCCESS) {
            localStorage.setItem('sn-token', loginData.data.token)
            dispatch(setIsLoggedIn({isLoggedIn: true}))
        }
    }, [dispatch, loginData]);

    if (isLoggedIn) {
        return <Navigate to={'/'}/>
    }

    return (
        <div onSubmit={handleSubmit(onSubmit)} className={s.container}>
            <form className={s.form}>
                <h2 style={{marginBottom: "5px"}}>Авторизация</h2>
                <h6 style={{marginTop: 0}}>
                    Данные от тестового аккаунта:<br/>
                    Логин: free@samuraijs.com<br/>
                    Пароль: free
                </h6>
                <div className={s.inputGroup}>
                    <label htmlFor="email">Логин</label>
                    <input
                        className={s.input}
                        {...register("email", {required: true})}
                    />
                    {errors.email && <p className={s.validationError}>This field is required</p>}
                </div>
                <div className={s.inputGroup}>
                    <label htmlFor="password">Пароль</label>
                    <input
                        className={s.input}
                        {...register("password", {required: true})}
                    />
                    {errors.password && <p className={s.validationError}>This field is required</p>}
                </div>
                <div className={s.checkboxGroup}>
                    <input
                        className={s.checkbox}
                        type={'checkbox'}
                        {...register("rememberMe", {required: false})}
                    />
                    <label htmlFor="rememberMe">Запомнить меня</label>
                </div>
                <button type="submit" className={s.button}>Войти</button>
            </form>
        </div>
    );
}
