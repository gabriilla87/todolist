import { createSlice } from "@reduxjs/toolkit";

export const appSlice = createSlice({
  name: "app",
  initialState: {
    isLoggedIn: false,
    isInitialized: false,
    error: null as null | string
  },
  reducers: create => ({
    setIsLoggedIn: create.reducer<{ isLoggedIn: boolean }>((state, action) => {
      state.isLoggedIn = action.payload.isLoggedIn;
    }),
    setAppError: create.reducer<{ error: string | null }>((state, action) => {
      state.error = action.payload.error;
    }),
    setIsInitialized: create.reducer<{ isInitialized: boolean }>((state, action) => {
      state.isInitialized = action.payload.isInitialized;
    }),
  }),
  selectors: {
    selectIsLoggedIn: sliceState => sliceState.isLoggedIn,
    selectAppError: sliceState => sliceState.error,
    selectIsInitialized: sliceState => sliceState.isInitialized
  },
});

export const { setIsLoggedIn, setAppError, setIsInitialized } = appSlice.actions;
export const { selectIsLoggedIn, selectAppError, selectIsInitialized } = appSlice.selectors;
export const appReducer = appSlice.reducer;