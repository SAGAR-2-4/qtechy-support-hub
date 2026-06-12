import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import DashboardLayout from "../../layouts/DashboardLayout";
import { getTickets } from "../../features/tickets/ticketSlice";
import Badge from "../../components/common/Badge";

function Tickets() {
    const dispatch = useDispatch();

    const { tickets, loading, error } = useSelector((state) => state.tickets);
    const { user } = useSelector((state) => state.auth);
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState("");
    const [priorityFilter, setPriorityFilter] = useState("");
    useEffect(() => {
        dispatch(getTickets());
    }, [dispatch]);
    const filteredTickets = tickets.filter((ticket) => {
        const matchesSearch =
            ticket.title
                ?.toLowerCase()
                .includes(searchTerm.toLowerCase()) ||
            ticket.ticketNumber
                ?.toLowerCase()
                .includes(searchTerm.toLowerCase());

        const matchesStatus =
            !statusFilter ||
            ticket.status === statusFilter;

        const matchesPriority =
            !priorityFilter ||
            ticket.priority === priorityFilter;

        return (
            matchesSearch &&
            matchesStatus &&
            matchesPriority
        );
    });

    return (
        <DashboardLayout>
            <div className="mb-6">
                <h1 className="text-3xl font-bold text-slate-900">Tickets</h1>
                <p className="text-slate-500 mt-1">
                    Manage and monitor support requests.
                </p>
            </div>
            <div className="mb-5 flex flex-wrap gap-3 justify-between">
                <div className="flex flex-wrap gap-3">

                    <input
                        type="text"
                        placeholder="Search ticket..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-64 px-4 py-2 border border-slate-300 rounded-lg bg-white"
                    />

                    <select
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                        className="px-4 py-2 border border-slate-300 rounded-lg bg-white"
                    >
                        <option value="">All Status</option>
                        <option value="Open">Open</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Resolved">Resolved</option>
                        <option value="Closed">Closed</option>
                    </select>

                    <select
                        value={priorityFilter}
                        onChange={(e) => setPriorityFilter(e.target.value)}
                        className="px-4 py-2 border border-slate-300 rounded-lg bg-white"
                    >
                        <option value="">All Priority</option>
                        <option value="Low">Low</option>
                        <option value="Medium">Medium</option>
                        <option value="High">High</option>
                        <option value="Urgent">Urgent</option>
                    </select>

                    <button
                        onClick={() => {
                            setSearchTerm("");
                            setStatusFilter("");
                            setPriorityFilter("");
                        }}
                        className="px-4 py-2 border border-slate-300 rounded-lg hover:bg-slate-50"
                    >
                        Clear
                    </button>

                </div>

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
                            {filteredTickets.length === 0 ? (
                                <tr>
                                    <td colSpan="6" className="p-6 text-center text-slate-500">
                                        No tickets found.
                                    </td>
                                </tr>
                            ) : (
                                filteredTickets.map((ticket) => (
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