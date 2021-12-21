import userApi from '../../../api/userApi';

import { createAsyncThunk } from "@reduxjs/toolkit";

export const getListAccount = createAsyncThunk(
    'account/get',
    async (requestData) => {
        const res = await userApi.getListAccount(requestData);
        return res;
    }
);

export const changeAccountState = createAsyncThunk(
    'account/changeState',
    async (requestData) => {
        const res = await userApi.changeAccountState(requestData);
        return res;
    }
);