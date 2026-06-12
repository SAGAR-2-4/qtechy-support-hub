import DashboardLayout from "../../layouts/DashboardLayout";

function AgentDashboard() {
  return (
    <DashboardLayout>
      <h1 className="text-3xl font-bold text-slate-900">Agent Dashboard</h1>
      <p className="text-slate-500 mt-1">
        Track assigned tickets and update customer support progress.
      </p>
    </DashboardLayout>
  );
}

export default AgentDashboard;