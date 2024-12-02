import { createSlice, isFulfilled, isPending, isRejected } from "@reduxjs/toolkit";
import { todolistsApi } from "../dal/api/todolistsApi";
import { tasksApi } from "../dal/api/tasksApi";

type AppStatuses = "idle" | "loading" | "succeeded" | "failed"

export const initSlice = createSlice({
  name: "init",
  initialState: {
    status: "idle" as AppStatuses
  },
  selectors: {
    selectStatus: sliceState => sliceState.status
  },
  reducers: create => ({
    setInitStatus: create.reducer<{status: AppStatuses}>((state, action) => {
      state.status = action.payload.status
    })
  }),
  extraReducers: builder =>
    builder
      .addMatcher(isPending, (state, action) => {
          if(
            todolistsApi.endpoints.getTodolists.matchPending(action) ||
            tasksApi.endpoints.getTasks.matchPending(action) ||
            tasksApi.endpoints.addTask.matchPending(action)
          ) return
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
})

export const initReducer = initSlice.reducer
export const {selectStatus} = initSlice.selectors