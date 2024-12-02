import React from "react";
import { IconButton, Snackbar } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { selectAppError, setAppError } from "../../app/appSlice";
import { useAppDispatch } from "../../app/store";
import { useSelector } from "react-redux";

export const ErrorSnackbar = () => {
  const dispatch = useAppDispatch()
  const appError = useSelector(selectAppError);

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

  return (
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
  );
};