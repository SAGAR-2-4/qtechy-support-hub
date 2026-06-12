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
                error.response?.data?.message || "Failed to fetch tickets"
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

export const createTicket = createAsyncThunk(
    "tickets/createTicket",
    async (ticketData, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.post("/tickets", ticketData);
            return response.data.data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || "Failed to create ticket"
            );
        }
    }
);

export const assignTicket = createAsyncThunk(
    "tickets/assignTicket",
    async ({ ticketId, agentId }, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.patch(
                `/tickets/${ticketId}/assign`,
                {
                    agentId,
                }
            );

            return response.data.data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || "Failed to assign ticket"
            );
        }
    }
);
export const editTicket = createAsyncThunk(
    "tickets/editTicket",
    async ({ ticketId, ticketData }, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.patch(
                `/tickets/${ticketId}`,
                ticketData
            );

            return response.data.data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message ||
                "Failed to update ticket"
            );
        }
    }
);

export const deleteTicket = createAsyncThunk(
    "tickets/deleteTicket",
    async (ticketId, { rejectWithValue }) => {
        try {
            await axiosInstance.delete(
                `/tickets/${ticketId}`
            );

            return ticketId;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message ||
                "Failed to delete ticket"
            );
        }
    }
);

const initialState = {
    tickets: [],
    selectedTicket: null,
    createdTicket: null,
    loading: false,
    error: null,
};

const ticketSlice = createSlice({
    name: "tickets",
    initialState,
    reducers: {
        clearCreatedTicket: (state) => {
            state.createdTicket = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getTickets.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getTickets.fulfilled, (state, action) => {
                state.loading = false;
                state.tickets = action.payload.ticket || action.payload.tickets || [];
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
            })

            .addCase(createTicket.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.createdTicket = null;
            })
            .addCase(createTicket.fulfilled, (state, action) => {
                state.loading = false;
                state.createdTicket = action.payload;
                state.tickets.unshift(action.payload);
            })
            .addCase(createTicket.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(assignTicket.pending, (state) => {
                state.loading = true;
            })
            .addCase(assignTicket.fulfilled, (state, action) => {
                state.loading = false;
                state.selectedTicket = action.payload;
            })
            .addCase(assignTicket.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(editTicket.fulfilled, (state, action) => {
                state.loading = false;
                state.selectedTicket = action.payload;
            })

            .addCase(deleteTicket.fulfilled, (state, action) => {
                state.loading = false;

                state.tickets = state.tickets.filter(
                    (ticket) => ticket._id !== action.payload
                );
            })
    },
});

export const { clearCreatedTicket } = ticketSlice.actions;
export default ticketSlice.reducer;