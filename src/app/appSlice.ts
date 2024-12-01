import { createSlice, isFulfilled, isPending, isRejected } from "@reduxjs/toolkit";
import { todolistsApi } from "../dal/api/todolistsApi";

type AppStatuses = "idle" | "loading" | "succeeded" | "failed"

export const appSlice = createSlice({
  name: "app",
  initialState: {
    isLoggedIn: false,
    isInitialized: false,
    status: "idle" as AppStatuses,
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
      state.isInitialized = action.payload.isInitialized
    })
  }),
  selectors: {
    selectIsLoggedIn: sliceState => sliceState.isLoggedIn,
    selectStatus: sliceState => sliceState.status,
    selectAppError: sliceState => sliceState.error,
    selectIsInitialized: sliceState => sliceState.isInitialized
  },
  extraReducers: builder =>
    builder
      .addMatcher(isPending, (state, action) => {
        console.log(action);
          state.status = "loading";
        }
      )
      .addMatcher(isFulfilled, state => {
          state.status = "succeeded";
        }
      )
      .addMatcher(isRejected, state => {
          state.status = "failed";
        }
      )
});

export const { setIsLoggedIn, setAppError, setIsInitialized } = appSlice.actions;
export const { selectIsLoggedIn, selectStatus, selectAppError, selectIsInitialized } = appSlice.selectors;
export const appReducer = appSlice.reducer;