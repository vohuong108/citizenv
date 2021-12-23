import { createSlice } from "@reduxjs/toolkit";
import { getListPopulation, getPersonInfo } from './populationAction';

const populationSlice = createSlice({
    name: 'population',
    initialState: {
        listPopulation: [],
        totalPage: 1,
        loading: false,
        error: false,
        currentPerson: null
    },
    reducers: {
        
    },
    extraReducers: {
        [getListPopulation.pending]: (state) => {
            state.loading = true;
        },
        [getListPopulation.rejected]: (state, action) => {
            state.error = action.error;
            state.loading = false;
        },
        [getListPopulation.fulfilled]: (state, action) => {
            state.loading = false;
            state.listPopulation = action.payload.peopleDtos;
            state.totalPage = action.payload.totalPage;
        },
        [getPersonInfo.pending]: (state) => {
            state.loading = true;
        },
        [getPersonInfo.rejected]: (state, action) => {
            state.error = action.error;
            state.loading = false;
        },
        [getPersonInfo.fulfilled]: (state, action) => {
            state.loading = false;
            state.currentPerson = action.payload;
        },
    }
});

export default populationSlice.reducer;