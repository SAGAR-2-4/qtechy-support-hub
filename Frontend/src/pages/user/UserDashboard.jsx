import { Link } from "react-router-dom";
import { FilePlus, MessageCircle, Search, Ticket } from "lucide-react";
import DashboardLayout from "../../layouts/DashboardLayout";

function UserDashboard() {
  return (
    <DashboardLayout>
      <div className="mb-8">
        <div className="mb-3 inline-flex rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
          Customer support portal
        </div>

        <h1 className="text-3xl font-bold text-slate-900">User Dashboard</h1>
        <p className="text-slate-500 mt-1">
          Create new support requests and track progress from one place.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <FilePlus className="text-blue-600" size={28} />
          <h3 className="mt-4 text-lg font-semibold text-slate-900">
            Create Ticket
          </h3>
          <p className="mt-2 text-sm text-slate-500">
            Submit a new request with category, priority, and description.
          </p>
          <Link
            to="/user/dashboard/create-ticket"
            className="mt-5 inline-flex rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
          >
            New Ticket
          </Link>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <Ticket className="text-emerald-600" size={28} />
          <h3 className="mt-4 text-lg font-semibold text-slate-900">
            My Tickets
          </h3>
          <p className="mt-2 text-sm text-slate-500">
            View your submitted tickets, current status, and assigned agent.
          </p>
          <Link
            to="/user/dashboard/tickets"
            className="mt-5 inline-flex rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-800"
          >
            View Tickets
          </Link>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <MessageCircle className="text-purple-600" size={28} />
          <h3 className="mt-4 text-lg font-semibold text-slate-900">
            Follow Updates
          </h3>
          <p className="mt-2 text-sm text-slate-500">
            Add comments and follow status history until your issue is resolved.
          </p>
        </div>
      </div>

      <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex items-center gap-3">
          <Search className="text-amber-600" size={24} />
          <div>
            <h2 className="text-lg font-semibold text-slate-900">
              Quick tip
            </h2>
            <p className="text-sm text-slate-500">
              Use search and filters inside My Tickets to quickly find open,
              urgent, or resolved requests.
            </p>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default UserDashboard;