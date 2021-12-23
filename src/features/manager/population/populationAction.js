import userApi from '../../../api/userApi';

import { createAsyncThunk } from "@reduxjs/toolkit";

export const getListPopulation = createAsyncThunk(
    'population/get',
    async (requestData) => {
        const res = await userApi.getListPopulation(requestData);
        return res;
    }
);

export const getPersonInfo = createAsyncThunk(
    'population/getPersonInfo',
    async (requestData) => {
        const res = await userApi.viewPersonalInfo(requestData);
        return res;
    }
)