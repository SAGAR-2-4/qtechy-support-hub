import {Routes, Route} from "react-router-dom";

import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";

import AdminDashboard from "../pages/admin/AdminDashboard";
import AgentDashboard from "../pages/agent/AgentDashboard";
import UserDashboard from "../pages/user/UserDashboard";

import ProtectedRoute from "./ProtectedRoute";

function AppRoute() {
    return(
        <Routes>
            <Route path = "/login" element={<Login/>}/>
            <Route path = "/register" element={<Register/>}/>

            <Route
                path="/admin/dashboard"
                element={
                    <ProtectedRoute allowedRoles={["admin"]}>
                        <AdminDashboard />
                    </ProtectedRoute>

                }
                />

                <Route 
                    path = "/agent/dashboard"
                    element= {
                        <ProtectedRoute allowedRoles={["agent"]}>
                            <AgentDashboard/>
                        </ProtectedRoute>
                    }
               />

               <Route 
                 path="/user/dashboard"
                 element={
                    <ProtectedRoute allowedRoles={["user"]}>
                        <UserDashboard/>
                    </ProtectedRoute>
                 }
                />
        </Routes>
    );
}

export default AppRoute;