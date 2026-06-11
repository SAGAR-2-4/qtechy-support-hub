import { LayoutDashboard, Ticket, Users, LogOut } from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../features/auth/authSlice";

function Sidebar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  const dashboardPath =
    user?.role === "admin"
      ? "/admin/dashboard"
      : user?.role === "agent"
      ? "/agent/dashboard"
      : "/user/dashboard";

  const ticketsPath =
    user?.role === "admin"
      ? "/admin/dashboard/tickets"
      : user?.role === "agent"
      ? "/agent/dashboard/tickets"
      : "/user/dashboard/tickets";

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <aside className="w-64 bg-slate-900 text-white flex flex-col">
      <div className="p-6 border-b border-slate-800">
        <h1 className="text-xl font-bold">QTechy</h1>
        <p className="text-sm text-slate-400">Support Hub</p>
      </div>

      <nav className="flex-1 p-4 space-y-2">
        <NavLink
          to={dashboardPath}
          className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-slate-800"
        >
          <LayoutDashboard size={18} />
          Dashboard
        </NavLink>

        <NavLink
          to={ticketsPath}
          className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-slate-800"
        >
          <Ticket size={18} />
          Tickets
        </NavLink>

        {user?.role === "admin" && (
          <NavLink
            to="/admin/dashboard/users"
            className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-slate-800"
          >
            <Users size={18} />
            Users
          </NavLink>
        )}
      </nav>

      <div className="p-4 border-t border-slate-800">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-red-500/20 text-red-400"
        >
          <LogOut size={18} />
          Logout
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;