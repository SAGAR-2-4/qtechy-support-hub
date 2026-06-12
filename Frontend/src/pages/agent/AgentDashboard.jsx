import { Link } from "react-router-dom";
import { CheckCircle, Clock, MessageSquare, Ticket } from "lucide-react";
import DashboardLayout from "../../layouts/DashboardLayout";

function AgentDashboard() {
  return (
    <DashboardLayout>
      <div className="mb-8">
        <div className="mb-3 inline-flex rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
          Agent workspace
        </div>

        <h1 className="text-3xl font-bold text-slate-900">Agent Dashboard</h1>
        <p className="text-slate-500 mt-1">
          Track assigned tickets, respond to users, and update progress.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <Ticket className="text-blue-600" size={28} />
          <h3 className="mt-4 text-lg font-semibold text-slate-900">
            My Assigned Tickets
          </h3>
          <p className="mt-2 text-sm text-slate-500">
            View tickets assigned to you and manage support progress.
          </p>
          <Link
            to="/agent/dashboard/tickets"
            className="mt-5 inline-flex rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
          >
            Open Tickets
          </Link>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <MessageSquare className="text-emerald-600" size={28} />
          <h3 className="mt-4 text-lg font-semibold text-slate-900">
            Customer Replies
          </h3>
          <p className="mt-2 text-sm text-slate-500">
            Add clear updates and keep users informed through comments.
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <CheckCircle className="text-green-600" size={28} />
          <h3 className="mt-4 text-lg font-semibold text-slate-900">
            Resolve Issues
          </h3>
          <p className="mt-2 text-sm text-slate-500">
            Update ticket status when an issue is handled or completed.
          </p>
        </div>
      </div>

      <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex items-center gap-3">
          <Clock className="text-amber-600" size={24} />
          <div>
            <h2 className="text-lg font-semibold text-slate-900">
              Today’s focus
            </h2>
            <p className="text-sm text-slate-500">
              Start with high-priority assigned tickets, add progress comments,
              and move resolved cases forward.
            </p>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default AgentDashboard;


