import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import DashboardLayout from "../../layouts/DashboardLayout";
import {
    createTicket,
    clearCreatedTicket,
} from "../../features/tickets/ticketSlice";

function CreateTicket() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { loading, error, createdTicket } = useSelector(
        (state) => state.tickets
    );

    const [formData, setFormData] = useState({
        title: "",
        description: "",
        category: "Technical Issue",
        priority: "Medium",
    });

    useEffect(() => {
        if (createdTicket?._id) {
            dispatch(clearCreatedTicket());
            navigate(`/tickets/${createdTicket._id}`);
        }
    }, [createdTicket, dispatch, navigate]);

    const handleChange = (e) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(createTicket(formData));
    };

    return (
        <DashboardLayout>
            <div className="max-w-3xl">
                <div className="mb-6">
                    <h1 className="text-3xl font-bold text-slate-900">
                        Create Ticket
                    </h1>
                    <p className="text-slate-500 mt-1">
                        Submit a new support request for the team to review.
                    </p>
                </div>

                <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
                    {error && (
                        <div className="mb-5 rounded-lg bg-red-50 text-red-600 px-4 py-3">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div>
                            <label className="block text-sm font-medium text-slate-700">
                                Ticket Title
                            </label>
                            <input
                                type="text"
                                name="title"
                                value={formData.title}
                                onChange={handleChange}
                                placeholder="Example: Unable to login"
                                className="mt-1 w-full rounded-lg border border-slate-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-700">
                                Description
                            </label>
                            <textarea
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                placeholder="Describe the issue clearly..."
                                rows="5"
                                className="mt-1 w-full rounded-lg border border-slate-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            <div>
                                <label className="block text-sm font-medium text-slate-700">
                                    Category
                                </label>
                                <select
                                    name="category"
                                    value={formData.category}
                                    onChange={handleChange}
                                    className="mt-1 w-full rounded-lg border border-slate-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                                    value={formData.priority}
                                    onChange={handleChange}
                                    className="mt-1 w-full rounded-lg border border-slate-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                    <option value="Low">Low</option>
                                    <option value="Medium">Medium</option>
                                    <option value="High">High</option>
                                    <option value="Urgent">Urgent</option>
                                </select>
                            </div>
                        </div>

                        <div className="flex items-center gap-3 pt-2">
                            <button
                                type="submit"
                                disabled={loading}
                                className="px-5 py-2.5 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 disabled:opacity-60"
                            >
                                {loading ? "Creating..." : "Create Ticket"}
                            </button>

                            <button
                                type="button"
                                onClick={() => navigate("/user/dashboard/tickets")}
                                className="px-5 py-2.5 rounded-lg border border-slate-300 text-slate-700 hover:bg-slate-50"
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </DashboardLayout>
    );
}

export default CreateTicket;