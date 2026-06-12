import { LayoutDashboard, Ticket, Users, LogOut, X } from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../features/auth/authSlice";

function Sidebar({ mobileSidebarOpen, setMobileSidebarOpen, desktopCollapsed }) {
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

  const linkClass = ({ isActive }) =>
    `flex items-center gap-3 rounded-xl transition ${
      desktopCollapsed ? "justify-center px-3 py-3" : "px-4 py-3"
    } ${
      isActive
        ? "bg-blue-50 text-blue-700 border border-blue-100"
        : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
    }`;

  return (
    <aside
      className={`fixed lg:static inset-y-0 left-0 z-40 bg-white border-r border-slate-200 text-slate-900 flex flex-col transform transition-all duration-300 ${
        desktopCollapsed ? "lg:w-20" : "lg:w-72"
      } ${
        mobileSidebarOpen ? "translate-x-0 w-72" : "-translate-x-full lg:translate-x-0"
      }`}
    >
      <div className="h-20 px-5 flex items-center justify-between border-b border-slate-200">
        {!desktopCollapsed && (
          <div>
            <h1 className="text-xl font-bold tracking-tight text-slate-900">
              QTechy
            </h1>
            <p className="text-sm text-slate-500">Support Hub</p>
          </div>
        )}

        {desktopCollapsed && (
          <div className="hidden lg:flex h-10 w-10 rounded-xl bg-blue-600 text-white items-center justify-center font-bold">
            Q
          </div>
        )}

        <button
          onClick={() => setMobileSidebarOpen(false)}
          className="lg:hidden p-2 rounded-lg hover:bg-slate-100"
        >
          <X size={20} />
        </button>
      </div>

      <nav className="flex-1 p-4 space-y-2">
        <NavLink to={dashboardPath} end className={linkClass}>
          <LayoutDashboard size={18} />
          {!desktopCollapsed && <span>Dashboard</span>}
        </NavLink>

        <NavLink to={ticketsPath} className={linkClass}>
          <Ticket size={18} />
          {!desktopCollapsed && <span>Tickets</span>}
        </NavLink>

        {user?.role === "admin" && (
          <NavLink to="/admin/dashboard/users" className={linkClass}>
            <Users size={18} />
            {!desktopCollapsed && <span>Users</span>}
          </NavLink>
        )}
      </nav>

      <div className="p-4 border-t border-slate-200 mt-auto">
        <button
          onClick={handleLogout}
          className={`w-full flex items-center gap-3 rounded-xl bg-red-50 text-red-600 hover:bg-red-100 transition ${
            desktopCollapsed ? "justify-center px-3 py-3" : "justify-center px-4 py-3"
          }`}
        >
          <LogOut size={18} />
          {!desktopCollapsed && <span>Logout</span>}
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;