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

export const getTicketById = createAsyncThunk(
    "tickets/getTicketById",
    async (ticketId, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get(`/tickets/${ticketId}`);
            return response.data.data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || "Failed to fetch ticket"
            );
        }
    }
);

export const addTicketComment = createAsyncThunk(
    "tickets/addTicketComment",
    async ({ ticketId, comment }, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.post(`/tickets/${ticketId}/comments`, {
                comment,
            });

            return response.data.data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || "Failed to add comment"
            );
        }
    }
);

export const updateTicketStatus = createAsyncThunk(
    "tickets/updateTicketStatus",
    async ({ ticketId, status, note }, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.patch(`/tickets/${ticketId}/status`, {
                status,
                note,
            });

            return response.data.data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || "Failed to update ticket status"
            );
        }
    }
);

const initialState = {
    tickets: [],
    selectedTicket: null,
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

            })

            .addCase(getTicketById.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getTicketById.fulfilled, (state, action) => {
                state.loading = false;
                state.selectedTicket = action.payload;
            })
            .addCase(getTicketById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(addTicketComment.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(addTicketComment.fulfilled, (state, action) => {
                state.loading = false;
                state.selectedTicket = action.payload;
            })
            .addCase(addTicketComment.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(updateTicketStatus.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateTicketStatus.fulfilled, (state, action) => {
                state.loading = false;
                state.selectedTicket = action.payload;
            })
            .addCase(updateTicketStatus.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });

    },
});

export default ticketSlice.reducer;