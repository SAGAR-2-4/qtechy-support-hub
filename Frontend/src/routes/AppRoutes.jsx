import { Routes, Route } from "react-router-dom";

import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";

import AdminDashboard from "../pages/admin/AdminDashboard";
import AgentDashboard from "../pages/agent/AgentDashboard";
import UserDashboard from "../pages/user/UserDashboard";
import ProtectedRoute from "./ProtectedRoute";
import Tickets from "../pages/admin/Tickets";
import TicketDetails from "../pages/TicketDetails";
import CreateTicket from "../pages/user/CreateTicket";
import Users from "../pages/admin/Users";

function AppRoute() {
    return (
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route
                path="/admin/dashboard"
                element={
                    <ProtectedRoute allowedRoles={["admin"]}>
                        <AdminDashboard />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/agent/dashboard"
                element={
                    <ProtectedRoute allowedRoles={["agent"]}>
                        <AgentDashboard />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/user/dashboard"
                element={
                    <ProtectedRoute allowedRoles={["user"]}>
                        <UserDashboard />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/agent/dashboard/tickets"
                element={
                    <ProtectedRoute allowedRoles={["agent"]}>
                        <Tickets />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/user/dashboard/tickets"
                element={
                    <ProtectedRoute allowedRoles={["user"]}>
                        <Tickets />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/admin/dashboard/tickets"
                element={
                    <ProtectedRoute allowedRoles={["admin"]}>
                        <Tickets />
                    </ProtectedRoute>
                }

            />
            <Route
                path="/tickets/:ticketId"
                element={
                    <ProtectedRoute allowedRoles={["admin", "agent", "user"]}>
                        <TicketDetails />
                    </ProtectedRoute>
                }
            />
            <Route
                path="/user/dashboard/create-ticket"
                element={
                    <ProtectedRoute allowedRoles={["user", "admin", "agent"]}>
                        <CreateTicket />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/admin/dashboard/users"
                element={
                    <ProtectedRoute allowedRoles={["admin"]}>
                        <Users />
                    </ProtectedRoute>
                }
            />
        </Routes>

    );
}

export default AppRoute;