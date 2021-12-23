import { createSlice } from "@reduxjs/toolkit";
import { getListAccount, changeAccountState } from './accountAction';

const accountSlice = createSlice({
    name: 'account',
    initialState: {
        listAccount: [],
        loading: false,
        error: false
    },
    reducers: {
        
    },
    extraReducers: {
        [getListAccount.pending]: (state) => {
            state.loading = true;
        },
        [getListAccount.rejected]: (state, action) => {
            state.error = action.error;
            state.loading = false;
        },
        [getListAccount.fulfilled]: (state, action) => {
            state.loading = false;
            state.listAccount = action.payload;
        },
    }
});

export default accountSlice.reducer;