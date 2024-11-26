import React from 'react';
import s from './Header.module.css'
import {useLogoutMutation} from "../../dal/api/authApi";
import {ResultCode} from "../../enums/enums";
import {useAppDispatch} from "../../app/store";
import {selectIsLoggedIn, setIsLoggedIn} from "../../app/appSlice";
import {baseApi} from "../../app/baseApi";
import {useSelector} from "react-redux";

export const Header = () => {
    const [logout] = useLogoutMutation()
    const dispatch = useAppDispatch()
    const isLoggedIn = useSelector(selectIsLoggedIn)

    const logoutHandler = () => {
        logout().then(res => {
            if(res.data?.resultCode === ResultCode.SUCCESS) {
                dispatch(setIsLoggedIn({isLoggedIn: false}))
                localStorage.removeItem('sn-token')
                dispatch(baseApi.util.resetApiState())
            }
        })
    }

    return (
        <header className={s.header}>
            {isLoggedIn && <button className={s.logOutButton} onClick={logoutHandler}>Log Out</button>}
        </header>
    );
};