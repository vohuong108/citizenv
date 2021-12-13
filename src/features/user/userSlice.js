import { createSlice } from "@reduxjs/toolkit";
import { login } from './userAction';

const userSlice = createSlice({
    name: 'user',
    initialState: {
        userObj: null,
        loginLoading: false,
        loginError: false
    },
    reducers: {
        logOut: (state) => {
            state.userObj = null;
        }
    },
    extraReducers: {
        [login.pending]: (state) => {
            state.loginLoading = true;
        },
        [login.rejected]: (state, action) => {
            state.loginError = action.error;
            state.loginLoading = false;
        },
        [login.fulfilled]: (state, action) => {
            state.loginLoading = false;
        },
    }
});

export default userSlice.reducer;