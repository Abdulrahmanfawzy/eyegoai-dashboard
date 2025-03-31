import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toastify } from "../../components/toast";

export const getEmployee = createAsyncThunk("fetchEmployee/getEmployee" , async(id , thunkApi)=>{
    try {
        const {data} = await axios.get(`http://localhost:3000/employees/${id}`);
        return data
    } catch (error) {
        const {rejectWithValue} = thunkApi;
        return rejectWithValue(error.message);
    }
});

export const updateEmployee = createAsyncThunk("fetchEmployee/updateEmployee" , async({values , id} , thunkApi)=>{
    try {
        const {data} = await axios.patch(`http://localhost:3000/employees/${id}` , values);
        toastify("Employee Updated","success");
        return data
    } catch (error) {
        const {rejectWithValue} = thunkApi;
        return rejectWithValue(error.message);
    }
});

export const addEmployee = createAsyncThunk("fetchEmployee/addEmployee" , async(values , thunkApi)=>{
    console.log(values);
    
    try {
        const {data} = await axios.post(`http://localhost:3000/employees` , values);
        console.log(data);
        toastify("Employee added","success");
        return data
    } catch (error) {
        const {rejectWithValue} = thunkApi;
        return rejectWithValue(error.message);
    }
});

export const deleteEmployee = createAsyncThunk("fetchEmployee/deleteEmployee" , async(id , thunkApi)=>{
    try {
        const {data} = await axios.delete(`http://localhost:3000/employees/${id}`);
        toastify("Employee deleted successfully","success");
        console.log(data);
        return data
    } catch (error) {
        const {rejectWithValue} = thunkApi;
        return rejectWithValue(error.message);
    }
});

export const employeeSlice = createSlice({
    name: "fetchEmployee",
    initialState: {loading: false, error: "" , btnLoading: false , data: {}},
    extraReducers: (builder)=>{
        builder.addCase(getEmployee.pending , (state , action)=>{
            state.loading = true;
            state.error = "";
        })
        builder.addCase(getEmployee.fulfilled , (state , action)=>{
            state.loading = false;
            state.error = "";
            state.data = action.payload
        })
        builder.addCase(getEmployee.rejected , (state , action)=>{
            state.loading = false;
            state.error = action.payload;
        })

        builder.addCase(updateEmployee.pending , (state , action)=>{
            state.loading = true;
            state.error = "";
            state.btnLoading = true;
        })
        builder.addCase(updateEmployee.fulfilled , (state , action)=>{
            state.loading = false;
            state.error = "";
            state.data = action.payload
            state.btnLoading = false;
        })
        builder.addCase(updateEmployee.rejected , (state , action)=>{
            state.loading = false;
            state.error = action.payload;
            state.btnLoading = false;
        })

        builder.addCase(deleteEmployee.pending , (state , action)=>{
            state.loading = true;
            state.error = "";
            state.btnLoading = true;
        })
        builder.addCase(deleteEmployee.fulfilled , (state , action)=>{
            state.loading = false;
            state.error = "";
            state.data = action.payload
            state.btnLoading = false;
        })
        builder.addCase(deleteEmployee.rejected , (state , action)=>{
            state.loading = false;
            state.error = action.payload;
            state.btnLoading = false;
        })
    }
});

export default employeeSlice.reducer;