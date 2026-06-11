import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import DashboardLayout from "../../layouts/DashboardLayout";
import { getTickets } from "../../features/tickets/ticketSlice";
import Badge from "../../components/common/Badge";
function Tickets() {
    const dispatch = useDispatch();

    const { tickets, loading, error } = useSelector(
        (state) => state.tickets
    );

    useEffect(() => {
        dispatch(getTickets());
    }, [dispatch]);

    return (
        <DashboardLayout>
            <div className="mb-6">
                <h1 className="text-3xl font-bold">
                    Tickets
                </h1>

                <p className="text-slate-500 mt-1">
                    Manage and monitor support requests.
                </p>
            </div>

            <div className="mb-5 flex justify-between">
                <input
                    type="text"
                    placeholder="Search tickets..."
                    className="w-80 px-4 py-2 border rounded-lg bg-white"
                />

                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg">
                    Create Ticket
                </button>
            </div>

            {error && (
                <div className="bg-red-50 text-red-600 p-4 rounded-lg">
                    {error}
                </div>
            )}

            {loading ? (
                <p>Loading tickets...</p>
            ) : (
                <div className="bg-white rounded-xl shadow-sm border overflow-hidden">

                    <table className="w-full">
                        <thead className="bg-slate-100">
                            <tr>
                                <th className="text-left p-4">Ticket No</th>
                                <th className="text-left p-4">Title</th>
                                <th className="text-left p-4">Priority</th>
                                <th className="text-left p-4">Status</th>
                                <th className="text-left p-4">Created By</th>
                                <th className="text-left p-4">Action</th>
                            </tr>
                        </thead>

                        <tbody>
                            {tickets.length === 0 && (
                                <tr>
                                    <td colSpan="6" className="p-6 text-center text-slate-500">
                                        No tickets found.
                                    </td>
                                </tr>
                            )}
                            {tickets.map((ticket) => (
                                <tr
                                    key={ticket._id}
                                    className="border-t"
                                >
                                    <td className="p-4">
                                        {ticket.ticketNumber}
                                    </td>

                                    <td className="p-4">
                                        {ticket.title}
                                    </td>

                                    <td className="p-4">
                                        <Badge text={ticket.priority} />
                                    </td>

                                    <td className="p-4">
                                        <Badge text={ticket.status} />
                                    </td>

                                    <td className="p-4">
                                        {ticket.createdBy?.name}
                                    </td>

                                    <td className="p-4">
                                        <button className="px-3 py-2 bg-slate-900 text-white rounded-lg text-sm hover:bg-slate-800">
                                            View
                                        </button>
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

export default Tickets;