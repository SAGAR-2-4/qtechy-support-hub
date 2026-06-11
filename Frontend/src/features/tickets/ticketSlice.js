import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../api/axiosInstance";

export const getTickets = createAsyncThunk(
  "tickets/getTickets",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/tickets");

      return response.data.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
        "Failed to fetch tickets"
      );
    }
  }
);

const initialState = {
  tickets: [],
  loading: false,
  error: null,
};

const ticketSlice = createSlice({
  name: "tickets",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getTickets.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getTickets.fulfilled, (state, action) => {
        state.loading = false;

        // Backend returns:
        // data: { tickets: [...], pagination: {...} }

        state.tickets = action.payload.ticket || [];
      })
      .addCase(getTickets.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default ticketSlice.reducer;