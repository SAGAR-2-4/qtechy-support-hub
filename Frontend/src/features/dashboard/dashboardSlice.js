import {createSlice , createAsyncThunk} from "@reduxjs/toolkit";
import axiosInstance from "../../api/axiosInstance";

export const getDashboardStats = createAsyncThunk(
    "dashboard/getDashboard",
    async (_,{rejectWithValue}) => {
        try{
            const response = await axiosInstance.get("/dashboard/stats");
            return response.data.data;

        }catch(error) {
            return rejectWithValue(
                error.response?.data?.message ||
                "Failed to fetch dashboard stats"
            );

        }
        }
    
);
 
const initialState = {
    stats: null,
    loading :false,
    error: null,
};


const dashboardSlice = createSlice({
    name:"dashboard",
    initialState,
    reducer: {},
    extraReducers: (builder) => {
        builder
            .addCase(getDashboardStats.pending, (state) => {
                state.loading = true;
            })
            .addCase(getDashboardStats.fulfilled, (state,action) => {
                state.loading = false;
                state.stats = action.payload;
            })
            .addCase(getDashboardStats.rejected,(state,action) => {
                state.loading = false;
                state.error = action.payload
            });


    }
});

export default dashboardSlice.reducer;