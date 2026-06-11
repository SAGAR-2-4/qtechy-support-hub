import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Ticket,
  Clock,
  CheckCircle,
  AlertTriangle,
  Users,
  UserCog,
} from "lucide-react";

import DashboardLayout from "../../layouts/DashboardLayout";
import StatCard from "../../components/common/StatCard";
import { getDashboardStats } from "../../features/dashboard/dashboardSlice";

function AdminDashboard() {
  const dispatch = useDispatch();
  const { stats, loading, error } = useSelector((state) => state.dashboard);

  useEffect(() => {
    dispatch(getDashboardStats());
  }, [dispatch]);

  return (
    <DashboardLayout>
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-slate-900">Admin Dashboard</h1>
        <p className="text-slate-500 mt-1">
          Monitor tickets, workload, and support activity.
        </p>
      </div>

      {error && (
        <div className="mb-5 rounded-lg bg-red-50 text-red-600 px-4 py-3">
          {error}
        </div>
      )}

      {loading ? (
        <p className="text-slate-500">Loading dashboard stats...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">
          <StatCard
            title="Total Tickets"
            value={stats?.totalTickets}
            icon={Ticket}
            helper="All support requests"
          />

          <StatCard
            title="Open Tickets"
            value={stats?.openTickets}
            icon={Clock}
            helper="Awaiting action"
          />

          <StatCard
            title="Resolved Tickets"
            value={stats?.resolvedTickets}
            icon={CheckCircle}
            helper="Successfully completed"
          />

          <StatCard
            title="Unassigned Tickets"
            value={stats?.unassignedTickets}
            icon={AlertTriangle}
            helper="Need agent assignment"
          />

          <StatCard
            title="Urgent Tickets"
            value={stats?.urgentTickets}
            icon={AlertTriangle}
            helper="High attention required"
          />

          <StatCard
            title="In Progress"
            value={stats?.inProgressTickets}
            icon={Clock}
            helper="Currently being handled"
          />

          <StatCard
            title="Total Users"
            value={stats?.totalUsers}
            icon={Users}
            helper="Registered customers"
          />

          <StatCard
            title="Total Agents"
            value={stats?.totalAgents}
            icon={UserCog}
            helper="Support team members"
          />
        </div>
      )}
    </DashboardLayout>
  );
}

export default AdminDashboard;