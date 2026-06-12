import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Ticket,
  Clock,
  CheckCircle,
  AlertTriangle,
  Users,
  UserCog,
  Activity,
  ShieldCheck,
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
      <div className="mb-8 flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
        <div>
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
            <span className="h-2 w-2 rounded-full bg-emerald-500" />
            Live operations dashboard
          </div>

          <h1 className="text-3xl font-bold tracking-tight text-slate-900">
            Admin Dashboard
          </h1>

          <p className="mt-1 text-slate-500">
            Monitor tickets, team workload, and support activity in one place.
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white px-5 py-4 shadow-sm">
          <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
            System status
          </p>
          <div className="mt-2 flex items-center gap-2 text-sm font-semibold text-emerald-700">
            <ShieldCheck size={18} />
            All services operational
          </div>
        </div>
      </div>

      {error && (
        <div className="mb-5 rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-red-600">
          {error}
        </div>
      )}

      {loading ? (
        <div className="rounded-2xl border border-slate-200 bg-white p-6 text-slate-500 shadow-sm">
          Loading dashboard stats...
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
            <StatCard
              title="Total Tickets"
              value={stats?.totalTickets}
              icon={Ticket}
              helper="All support requests created in the system."
              trend="+18%"
              tone="blue"
            />

            <StatCard
              title="Open Tickets"
              value={stats?.openTickets}
              icon={Clock}
              helper="Tickets waiting for initial action."
              trend="+7%"
              tone="amber"
            />

            <StatCard
              title="In Progress"
              value={stats?.inProgressTickets}
              icon={Activity}
              helper="Tickets currently being handled by agents."
              trend="+11%"
              tone="blue"
            />

            <StatCard
              title="Resolved"
              value={stats?.resolvedTickets}
              icon={CheckCircle}
              helper="Tickets successfully completed."
              trend="+22%"
              tone="green"
            />

            <StatCard
              title="Unassigned"
              value={stats?.unassignedTickets}
              icon={AlertTriangle}
              helper="Tickets that still need an agent assignment."
              trend="+4%"
              tone="red"
            />

            <StatCard
              title="Urgent Tickets"
              value={stats?.urgentTickets}
              icon={AlertTriangle}
              helper="High-attention tickets requiring fast response."
              trend="+9%"
              tone="red"
            />

            <StatCard
              title="Total Users"
              value={stats?.totalUsers}
              icon={Users}
              helper="Registered customers using the support portal."
              trend="+15%"
              tone="slate"
            />

            <StatCard
              title="Total Agents"
              value={stats?.totalAgents}
              icon={UserCog}
              helper="Active support team members available."
              trend="+5%"
              tone="green"
            />
          </div>

          <div className="mt-8 grid grid-cols-1 gap-5 lg:grid-cols-3">
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm lg:col-span-2">
              <h2 className="text-lg font-semibold text-slate-900">
                Operational focus
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                Priority areas based on current ticket distribution.
              </p>

              <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-3">
                <div className="rounded-xl bg-amber-50 p-4">
                  <p className="text-sm font-medium text-amber-700">
                    Open queue
                  </p>
                  <p className="mt-2 text-2xl font-bold text-amber-900">
                    {stats?.openTickets ?? 0}
                  </p>
                  <p className="mt-1 text-xs text-amber-700">
                    Needs triage
                  </p>
                </div>

                <div className="rounded-xl bg-red-50 p-4">
                  <p className="text-sm font-medium text-red-700">
                    Urgent queue
                  </p>
                  <p className="mt-2 text-2xl font-bold text-red-900">
                    {stats?.urgentTickets ?? 0}
                  </p>
                  <p className="mt-1 text-xs text-red-700">
                    Needs fast response
                  </p>
                </div>

                <div className="rounded-xl bg-blue-50 p-4">
                  <p className="text-sm font-medium text-blue-700">
                    Agent capacity
                  </p>
                  <p className="mt-2 text-2xl font-bold text-blue-900">
                    {stats?.totalAgents ?? 0}
                  </p>
                  <p className="mt-1 text-xs text-blue-700">
                    Active support staff
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-lg font-semibold text-slate-900">
                Quick summary
              </h2>

              <div className="mt-5 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-500">Resolution rate</span>
                  <span className="font-semibold text-emerald-700">
                    {stats?.totalTickets
                      ? Math.round(
                          ((stats?.resolvedTickets || 0) /
                            stats.totalTickets) *
                            100
                        )
                      : 0}
                    %
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-500">Unassigned risk</span>
                  <span className="font-semibold text-red-600">
                    {stats?.unassignedTickets ?? 0}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-500">Support team</span>
                  <span className="font-semibold text-slate-900">
                    {stats?.totalAgents ?? 0} agents
                  </span>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </DashboardLayout>
  );
}

export default AdminDashboard;