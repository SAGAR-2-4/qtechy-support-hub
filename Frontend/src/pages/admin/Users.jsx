import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import DashboardLayout from "../../layouts/DashboardLayout";
import { getUsers, updateUserRole } from "../../features/users/userSlice";

function Users() {
    const dispatch = useDispatch();

    const { users, loading, error } = useSelector(
        (state) => state.users
    );

    useEffect(() => {
        dispatch(getUsers());
    }, [dispatch]);

    const handleRoleChange = (userId, newRole, currentRole) => {
        if (newRole === currentRole) return;

        const confirmed = window.confirm(
            `Are you sure you want to change this user's role from ${currentRole} to ${newRole}?`
        );

        if (!confirmed) return;

        dispatch(
            updateUserRole({
                userId,
                role: newRole,
            })
        );
    };

    return (
        <DashboardLayout>
            <div className="mb-6">
                <h1 className="text-3xl font-bold">
                    User Management
                </h1>

                <p className="text-slate-500 mt-1">
                    Manage system users and roles.
                </p>
            </div>

            {error && (
                <div className="bg-red-50 text-red-600 p-4 rounded-lg mb-4">
                    {error}
                </div>
            )}

            {loading ? (
                <p>Loading users...</p>
            ) : (
                <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
                    <table className="w-full">
                        <thead className="bg-slate-100">
                            <tr>
                                <th className="text-left p-4">Name</th>
                                <th className="text-left p-4">Email</th>
                                <th className="text-left p-4">Role</th>
                                <th className="text-left p-4">Active</th>
                                <th className="text-left p-4">Action</th>
                            </tr>
                        </thead>

                        <tbody>
                            {users.map((user) => (
                                <tr
                                    key={user._id}
                                    className="border-t"
                                >
                                    <td className="p-4">
                                        {user.name}
                                    </td>

                                    <td className="p-4">
                                        {user.email}
                                    </td>

                                    <td className="p-4">
                                        {user.role}
                                    </td>

                                    <td className="p-4">
                                        {user.isActive ? "Yes" : "No"}
                                    </td>

                                    <td className="p-4">
                                        <select
                                            value={user.role}
                                            onChange={(e) =>
                                                handleRoleChange(user._id, e.target.value, user.role)
                                            }
                                            className="border rounded-lg px-3 py-2"
                                        >
                                            <option value="user">User</option>
                                            <option value="agent">Agent</option>
                                            <option value="admin">Admin</option>
                                        </select>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </DashboardLayout>
    );
}

export default Users;