import React from "react";
import s from "./Header.module.css";
import { useLogoutMutation } from "../../dal/api/authApi";
import { RESULT_CODE } from "../../enums/enums";
import { useAppDispatch } from "../../app/store";
import { selectIsLoggedIn, setIsLoggedIn } from "../../app/appSlice";
import { baseApi } from "../../app/baseApi";
import { useSelector } from "react-redux";
import { LinearProgress } from "@mui/material";
import { selectStatus } from "../../app/initSlice";

export const Header = () => {
  const [logout] = useLogoutMutation();
  const dispatch = useAppDispatch();
  const appStatus = useSelector(selectStatus);
  const isLoggedIn = useSelector(selectIsLoggedIn);

  const logoutHandler = () => {
    logout().then(res => {
      if (res.data?.resultCode === RESULT_CODE.SUCCESS) {
        dispatch(setIsLoggedIn({ isLoggedIn: false }));
        localStorage.removeItem("sn-token");
        dispatch(baseApi.util.resetApiState());
      }
    });
  };

  return (
    <header className={s.header}>
      <h2 className={s.appVersion}>v1.0</h2>
      { isLoggedIn && <button className={s.glowOnHover} onClick={logoutHandler}>Log Out</button> }
      {appStatus === "loading" && <LinearProgress sx={{ position: "absolute", left: "0", right: "0", bottom: "0" }} />}
    </header>
  );
};