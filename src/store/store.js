import { configureStore } from "@reduxjs/toolkit";
import userSlice from "../features/user/userSlice";
import accountSlice from "../features/manager/account/accountSlice";
import populationSlice from "../features/manager/population/populationSlice";

const store = configureStore({
    reducer: {
        user: userSlice,
        account: accountSlice,
        population: populationSlice
    }
})

export default store;