import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";

import DashboardLayout from "../layouts/DashboardLayout";
import Badge from "../components/common/Badge";
import {
    getTicketById,
    addTicketComment,
    updateTicketStatus,
} from "../features/tickets/ticketSlice";

function TicketDetails() {
    const { ticketId } = useParams();
    const dispatch = useDispatch();

    const { user } = useSelector((state) => state.auth);
    const { selectedTicket, loading, error } = useSelector(
        (state) => state.tickets
    );

    const [comment, setComment] = useState("");

    const [status, setStatus] = useState("");
    const [note, setNote] = useState("");

    useEffect(() => {
        dispatch(getTicketById(ticketId));
    }, [dispatch, ticketId]);

    const handleAddComment = (e) => {
        e.preventDefault();

        if (!comment.trim()) return;

        dispatch(
            addTicketComment({
                ticketId,
                comment,
            })
        );

        setComment("");
    };

    const handleUpdateStatus = (e) => {
        e.preventDefault();

        if (!status) return;

        dispatch(
            updateTicketStatus({
                ticketId,
                status,
                note,
            })
        );

        setStatus("");
        setNote("");
    };
    const backPath =
        user?.role === "admin"
            ? "/admin/dashboard/tickets"
            : user?.role === "agent"
                ? "/agent/dashboard/tickets"
                : "/user/dashboard/tickets";

    return (
        <DashboardLayout>
            <Link to={backPath} className="text-blue-600 text-sm">
                ← Back to tickets
            </Link>

            {loading && <p className="mt-6 text-slate-500">Loading ticket...</p>}

            {error && (
                <div className="mt-6 bg-red-50 text-red-600 p-4 rounded-lg">
                    {error}
                </div>
            )}

            {selectedTicket && (
                <div className="mt-6 space-y-6">
                    <div className="bg-white rounded-2xl border p-6 shadow-sm">
                        <div className="flex justify-between items-start gap-4">
                            <div>
                                <p className="text-sm text-slate-500">
                                    {selectedTicket.ticketNumber}
                                </p>
                                <h1 className="text-3xl font-bold text-slate-900 mt-1">
                                    {selectedTicket.title}
                                </h1>
                                <p className="text-slate-600 mt-4">
                                    {selectedTicket.description}
                                </p>
                            </div>

                            <div className="flex items-start gap-2 shrink-0">
                                <Badge text={selectedTicket.priority} />
                                <Badge text={selectedTicket.status} />
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        <div className="lg:col-span-2 bg-white rounded-2xl border p-6 shadow-sm">
                            <h2 className="font-semibold text-lg mb-4">Comments</h2>

                            <form onSubmit={handleAddComment} className="mb-5">
                                <textarea
                                    value={comment}
                                    onChange={(e) => setComment(e.target.value)}
                                    placeholder="Write a comment..."
                                    className="w-full border border-slate-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    rows="3"
                                />

                                <button
                                    type="submit"
                                    className="mt-3 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                                >
                                    Add Comment
                                </button>
                            </form>

                            {selectedTicket.comments?.length === 0 ? (
                                <p className="text-slate-500">No comments yet.</p>
                            ) : (
                                <div className="space-y-4">
                                    {selectedTicket.comments.map((item) => (
                                        <div key={item._id} className="border rounded-xl p-4">
                                            <p className="text-slate-700">{item.comment}</p>
                                            <p className="text-xs text-slate-400 mt-2">
                                                {item.commentedBy?.name || "User"} •{" "}
                                                {new Date(item.createdAt).toLocaleString()}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        <div className="space-y-6">
                            <div className="bg-white rounded-2xl border p-6 shadow-sm">
                                <h2 className="font-semibold text-lg mb-4">People</h2>

                                <p className="text-sm text-slate-500">Created By</p>
                                <p className="font-medium">{selectedTicket.createdBy?.name}</p>

                                <p className="text-sm text-slate-500 mt-4">Assigned Agent</p>
                                <p className="font-medium">
                                    {selectedTicket.assignedTo?.name || "Unassigned"}
                                </p>
                            </div>
                            {user?.role !== "user" && (
                                <div className="bg-white rounded-2xl border p-6 shadow-sm">
                                    <h2 className="font-semibold text-lg mb-4">Update Status</h2>

                                    <form onSubmit={handleUpdateStatus} className="space-y-3">
                                        <select
                                            value={status}
                                            onChange={(e) => setStatus(e.target.value)}
                                            className="w-full border border-slate-300 rounded-lg px-3 py-2"
                                        >
                                            <option value="">Select status</option>
                                            <option value="Open">Open</option>
                                            <option value="In Progress">In Progress</option>
                                            <option value="Resolved">Resolved</option>
                                            <option value="Closed">Closed</option>
                                        </select>

                                        <textarea
                                            value={note}
                                            onChange={(e) => setNote(e.target.value)}
                                            placeholder="Add status note..."
                                            rows="3"
                                            className="w-full border border-slate-300 rounded-lg px-3 py-2"
                                        />

                                        <button
                                            type="submit"
                                            className="w-full bg-slate-900 text-white py-2 rounded-lg hover:bg-slate-800"
                                        >
                                            Update Status
                                        </button>
                                    </form>
                                </div>
                            )}

                            <div className="bg-white rounded-2xl border p-6 shadow-sm">
                                <h2 className="font-semibold text-lg mb-4">Status History</h2>

                                <div className="space-y-4">
                                    {selectedTicket.statusHistory?.map((item) => (
                                        <div
                                            key={item._id}
                                            className="border-l-2 border-blue-500 pl-4"
                                        >
                                            <p className="font-medium">{item.status}</p>
                                            <p className="text-sm text-slate-500">{item.note}</p>
                                            <p className="text-xs text-slate-400 mt-1">
                                                {item.changedBy?.name} •{" "}
                                                {new Date(item.createdAt).toLocaleString()}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </DashboardLayout>
    );
}

export default TicketDetails;