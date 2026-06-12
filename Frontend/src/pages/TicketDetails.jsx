import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link, useNavigate } from "react-router-dom";

import { getAgents } from "../features/users/userSlice";
import DashboardLayout from "../layouts/DashboardLayout";
import Badge from "../components/common/Badge";

import {
  getTicketById,
  addTicketComment,
  updateTicketStatus,
  editTicket,
  deleteTicket,
  assignTicket,
} from "../features/tickets/ticketSlice";

function TicketDetails() {
  const { ticketId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.auth);
  const { agents } = useSelector((state) => state.users);
  const { selectedTicket, loading, error } = useSelector(
    (state) => state.tickets
  );

  const [agentId, setAgentId] = useState("");
  const [comment, setComment] = useState("");
  const [status, setStatus] = useState("");
  const [note, setNote] = useState("");

  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    title: "",
    description: "",
    category: "",
    priority: "",
  });

  useEffect(() => {
    dispatch(getTicketById(ticketId));
  }, [dispatch, ticketId]);

  useEffect(() => {
    if (user?.role === "admin") {
      dispatch(getAgents());
    }
  }, [dispatch, user]);

  const backPath =
    user?.role === "admin"
      ? "/admin/dashboard/tickets"
      : user?.role === "agent"
      ? "/agent/dashboard/tickets"
      : "/user/dashboard/tickets";

  const canEdit =
    user?.role === "admin" ||
    (user?.role === "user" &&
      selectedTicket?.createdBy?._id === user?._id &&
      selectedTicket?.status === "Open");

  const canDelete = user?.role === "admin";

  const startEdit = () => {
    setEditData({
      title: selectedTicket.title,
      description: selectedTicket.description,
      category: selectedTicket.category,
      priority: selectedTicket.priority,
    });

    setIsEditing(true);
  };

  const handleEditChange = (e) => {
    setEditData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();

    const ticketData =
      user?.role === "admin"
        ? {
            category: editData.category,
            priority: editData.priority,
          }
        : editData;

    dispatch(
      editTicket({
        ticketId,
        ticketData,
      })
    );

    setIsEditing(false);
  };

  const handleDelete = () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this ticket? This action cannot be undone."
    );

    if (!confirmed) return;

    dispatch(deleteTicket(ticketId));
    navigate(backPath);
  };

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

  const handleAssignTicket = (e) => {
    e.preventDefault();

    if (!agentId) return;

    dispatch(
      assignTicket({
        ticketId,
        agentId,
      })
    );

    setAgentId("");
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
            {!isEditing ? (
              <>
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

                {(canEdit || canDelete) && (
                  <div className="flex gap-3 mt-6">
                    {canEdit && (
                      <button
                        onClick={startEdit}
                        className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
                      >
                        Edit Ticket
                      </button>
                    )}

                    {canDelete && (
                      <button
                        onClick={handleDelete}
                        className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700"
                      >
                        Delete Ticket
                      </button>
                    )}
                  </div>
                )}
              </>
            ) : (
              <form onSubmit={handleEditSubmit} className="space-y-4">
                {user?.role !== "admin" && (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-slate-700">
                        Title
                      </label>
                      <input
                        type="text"
                        name="title"
                        value={editData.title}
                        onChange={handleEditChange}
                        className="mt-1 w-full border border-slate-300 rounded-lg px-4 py-2"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-700">
                        Description
                      </label>
                      <textarea
                        name="description"
                        value={editData.description}
                        onChange={handleEditChange}
                        rows="4"
                        className="mt-1 w-full border border-slate-300 rounded-lg px-4 py-2"
                      />
                    </div>
                  </>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700">
                      Category
                    </label>
                    <select
                      name="category"
                      value={editData.category}
                      onChange={handleEditChange}
                      className="mt-1 w-full border border-slate-300 rounded-lg px-4 py-2"
                    >
                      <option value="Bug">Bug</option>
                      <option value="Feature Request">Feature Request</option>
                      <option value="Technical Issue">Technical Issue</option>
                      <option value="Payment Issue">Payment Issue</option>
                      <option value="Account Issue">Account Issue</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700">
                      Priority
                    </label>
                    <select
                      name="priority"
                      value={editData.priority}
                      onChange={handleEditChange}
                      className="mt-1 w-full border border-slate-300 rounded-lg px-4 py-2"
                    >
                      <option value="Low">Low</option>
                      <option value="Medium">Medium</option>
                      <option value="High">High</option>
                      <option value="Urgent">Urgent</option>
                    </select>
                  </div>
                </div>

                <div className="flex gap-3">
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
                  >
                    Save Changes
                  </button>

                  <button
                    type="button"
                    onClick={() => setIsEditing(false)}
                    className="px-4 py-2 rounded-lg border border-slate-300 text-slate-700 hover:bg-slate-50"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            )}
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
              {user?.role === "admin" && (
                <div className="bg-white rounded-2xl border p-6 shadow-sm">
                  <h2 className="font-semibold text-lg mb-4">Assign Agent</h2>

                  <form onSubmit={handleAssignTicket} className="space-y-3">
                    <select
                      value={agentId}
                      onChange={(e) => setAgentId(e.target.value)}
                      className="w-full border border-slate-300 rounded-lg px-3 py-2"
                    >
                      <option value="">Select agent</option>
                      {agents.map((agent) => (
                        <option key={agent._id} value={agent._id}>
                          {agent.name} — {agent.email}
                        </option>
                      ))}
                    </select>

                    <button
                      type="submit"
                      className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
                    >
                      Assign Ticket
                    </button>
                  </form>
                </div>
              )}

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