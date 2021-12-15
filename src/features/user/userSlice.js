import { createSlice } from "@reduxjs/toolkit";
import { login, getUserInfo } from './userAction';

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
            state.userObj = action.payload;
        },
        [getUserInfo.pending]: (state) => {
            state.loginLoading = true;
        },
        [getUserInfo.rejected]: (state, action) => {
            state.loginError = action.error;
            state.loginLoading = false;
        },
        [getUserInfo.fulfilled]: (state, action) => {
            state.loginLoading = false;
            state.userObj = action.payload;
        },
    }
});

export const { logOut } = userSlice.actions; 
export default userSlice.reducer;