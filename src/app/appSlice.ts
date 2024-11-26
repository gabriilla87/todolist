import {createSlice} from "@reduxjs/toolkit";

const appSlice = createSlice({
    name: 'app',
    initialState: {
        isLoggedIn: false
    },
    reducers: create => ({
        setIsLoggedIn: create.reducer<{isLoggedIn: boolean}>((state, action) => {
            state.isLoggedIn = action.payload.isLoggedIn
        })
    }),
    selectors: {
        selectIsLoggedIn: sliceState => sliceState.isLoggedIn
    }
})

export const appReducer = appSlice.reducer
export const {setIsLoggedIn} = appSlice.actions
export const {selectIsLoggedIn} = appSlice.selectors