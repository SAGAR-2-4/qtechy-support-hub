import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import DashboardLayout from "../../layouts/DashboardLayout";
import { getTickets } from "../../features/tickets/ticketSlice";
import Badge from "../../components/common/Badge";

function Tickets() {
    const dispatch = useDispatch();

    const { tickets, loading, error } = useSelector((state) => state.tickets);
    const { user } = useSelector((state) => state.auth);
    useEffect(() => {
        dispatch(getTickets());
    }, [dispatch]);

    return (
        <DashboardLayout>
            <div className="mb-6">
                <h1 className="text-3xl font-bold text-slate-900">Tickets</h1>
                <p className="text-slate-500 mt-1">
                    Manage and monitor support requests.
                </p>
            </div>

            <div className="mb-5 flex justify-between gap-4">
                <input
                    type="text"
                    placeholder="Search tickets..."
                    className="w-80 px-4 py-2 border border-slate-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

                {user?.role === "user" && (
                    <Link
                        to="/user/dashboard/create-ticket"
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                    >
                        Create Ticket
                    </Link>
                )}
            </div>

            {error && (
                <div className="mb-5 bg-red-50 text-red-600 p-4 rounded-lg">
                    {error}
                </div>
            )}

            {loading ? (
                <p className="text-slate-500">Loading tickets...</p>
            ) : (
                <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                    <table className="w-full">
                        <thead className="bg-slate-100">
                            <tr>
                                <th className="text-left p-4">Ticket No</th>
                                <th className="text-left p-4">Title</th>
                                <th className="text-center p-4">Priority</th>
                                <th className="text-center p-4">Status</th>
                                <th className="text-left p-4">Created By</th>
                                <th className="text-right p-4">Action</th>
                            </tr>
                        </thead>

                        <tbody>
                            {tickets.length === 0 ? (
                                <tr>
                                    <td colSpan="6" className="p-6 text-center text-slate-500">
                                        No tickets found.
                                    </td>
                                </tr>
                            ) : (
                                tickets.map((ticket) => (
                                    <tr key={ticket._id} className="border-t border-slate-200">
                                        <td className="p-4 font-medium text-slate-700">
                                            {ticket.ticketNumber}
                                        </td>

                                        <td className="p-4 text-slate-700">{ticket.title}</td>

                                        <td className="p-4 text-center">
                                            <Badge text={ticket.priority} />
                                        </td>

                                        <td className="p-4 text-center">
                                            <Badge text={ticket.status} />
                                        </td>

                                        <td className="p-4 text-slate-700">
                                            {ticket.createdBy?.name || "N/A"}
                                        </td>

                                        <td className="p-4 text-right">
                                            <Link
                                                to={`/tickets/${ticket._id}`}
                                                className="inline-flex px-3 py-2 bg-slate-900 text-white rounded-lg text-sm hover:bg-slate-800"
                                            >
                                                View
                                            </Link>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            )}
        </DashboardLayout>
    );
}

export default Tickets;