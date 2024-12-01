import React, { useEffect } from "react";
import "./App.css";
import { Wrapper } from "../components/Wrapper/Wrapper";
import { Header } from "../components/Header/Header";
import { Container } from "../components/Container/Container";
import { useAppDispatch } from "./store";
import { Outlet } from "react-router-dom";
import { useMeQuery } from "../dal/api/authApi";
import { RESULT_CODE } from "../enums/enums";
import { selectAppError, selectIsInitialized, setAppError, setIsInitialized, setIsLoggedIn } from "./appSlice";
import { CircularProgress, IconButton, Snackbar } from "@mui/material";
import { useSelector } from "react-redux";
import CloseIcon from "@mui/icons-material/Close";

function App() {
  //hooks
  const dispatch = useAppDispatch()
  const isInitialized = useSelector(selectIsInitialized)
  const appError = useSelector(selectAppError);
  const { data, isLoading } = useMeQuery();

  const closeSnackbarHandler = (event: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === "clickaway") {
      return
    }

    dispatch(setAppError({ error: null }));
  };

  const action = (
    <>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={closeSnackbarHandler}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </>
  );

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
      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        open={!!appError}
        onClose={closeSnackbarHandler}
        autoHideDuration={6000}
        message={appError}
        action={action}
        sx={{
          "& .MuiPaper-root": {
            backgroundColor: "#d63b3b",
            color: "#fff"
          }
        }}
      />
    </Wrapper>
  );
}

export default App;