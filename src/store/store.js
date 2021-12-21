import { configureStore } from "@reduxjs/toolkit";
import userSlice from "../features/user/userSlice";
import accountSlice from "../features/manager/account/accountSlice";

const store = configureStore({
    reducer: {
        user: userSlice,
        account: accountSlice,
    }
})

export default store;