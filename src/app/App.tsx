import React, { useEffect } from "react";
import "./App.css";
import { Wrapper } from "../components/Wrapper/Wrapper";
import { Header } from "../components/Header/Header";
import { Container } from "../components/Container/Container";
import { useAppDispatch } from "./store";
import { Outlet } from "react-router-dom";
import { useMeQuery } from "../dal/api/authApi";
import { RESULT_CODE } from "../enums/enums";
import { selectIsInitialized, setIsInitialized, setIsLoggedIn } from "./appSlice";
import { CircularProgress } from "@mui/material";
import { useSelector } from "react-redux";
import { ErrorSnackbar } from "../components/ErrorSnackbar/ErrorSnackbar";

function App() {
  //hooks
  const dispatch = useAppDispatch()
  const isInitialized = useSelector(selectIsInitialized)
  const { data, isLoading } = useMeQuery();

  useEffect(() => {
    if (!isLoading) {
      dispatch(setIsInitialized({ isInitialized: true }));
      if (data?.resultCode === RESULT_CODE.SUCCESS) {
        dispatch(setIsLoggedIn({ isLoggedIn: true }));
      }
    }
  }, [dispatch, isLoading, data]);

  if(!isInitialized) {
    return (
      <div style={{position: "fixed", top: "40%", textAlign: "center", width: "100%"}}>
        <CircularProgress/>
      </div>
    )
  }

  return (
    <Wrapper>
      <Header />
      <Container>
        <Outlet />
      </Container>
      <ErrorSnackbar/>
    </Wrapper>
  );
}

export default App;