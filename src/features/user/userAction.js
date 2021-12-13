import userApi from '../../api/userApi';
import { createAsyncThunk } from "@reduxjs/toolkit";

export const login = createAsyncThunk(
    'user/login',
    async (requestData) => {
        const res = await userApi.login(requestData);
        return res;
    }
)