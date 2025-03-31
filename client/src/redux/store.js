import { configureStore } from "@reduxjs/toolkit";
import tokenSlice from "./reducers/tokenSlice";
import employeeSlice from "./reducers/employeeSlice";
import adminSlice from "./reducers/adminSlice";

export const store = configureStore({
    reducer:{
        token: tokenSlice,
        employee: employeeSlice,
        admin: adminSlice
    }
})