import {createSlice} from "@reduxjs/toolkit";

const tokenSlice = createSlice({
    name: "token",
    initialState: window.localStorage.getItem("adminId") || "",
    reducers: {
        getToken: (state,action)=>{
            if(window.localStorage.getItem("adminId")){
                state = true;
                return state;
            }else{
                state = false;
                return state;
            }
        },
        setTokenInStorage: (state,action)=>{
            window.localStorage.setItem("adminEmail" , action.payload.email);
            window.localStorage.setItem("adminId" , action.payload.id);
            state = true;
            return state
        }
    }
})

export const {setTokenInStorage , getToken} = tokenSlice.actions;
export default tokenSlice.reducer;
