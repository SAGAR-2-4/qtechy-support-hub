import DashboardLayout from "../../layouts/DashboardLayout";

function UserDashboard() {
  return (
    <DashboardLayout>
      <h1 className="text-3xl font-bold text-slate-900">User Dashboard</h1>
      <p className="text-slate-500 mt-1">
        Create and monitor your support requests.
      </p>
    </DashboardLayout>
  );
}

export default UserDashboard;