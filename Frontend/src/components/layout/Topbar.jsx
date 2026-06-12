import { Menu, PanelLeftClose, PanelLeftOpen } from "lucide-react";
import { useSelector } from "react-redux";

function Topbar({
  setMobileSidebarOpen,
  desktopCollapsed,
  setDesktopCollapsed,
}) {
  const { user } = useSelector((state) => state.auth);

  return (
    <header className="h-20 bg-white border-b border-slate-200 flex items-center justify-between px-4 md:px-6 lg:px-8">
      <div className="flex items-center gap-4">
        <button
          onClick={() => setMobileSidebarOpen(true)}
          className="lg:hidden p-2 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-100"
        >
          <Menu size={22} />
        </button>

        <button
          onClick={() => setDesktopCollapsed((prev) => !prev)}
          className="hidden lg:inline-flex p-2 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-100"
        >
          {desktopCollapsed ? (
            <PanelLeftOpen size={22} />
          ) : (
            <PanelLeftClose size={22} />
          )}
        </button>

        <div>
          <h2 className="text-slate-900 font-semibold text-lg">
            Welcome back
          </h2>
          <p className="text-slate-500 text-sm hidden sm:block">
            Manage support operations efficiently.
          </p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <span className="hidden sm:inline-flex items-center rounded-full bg-emerald-50 text-emerald-700 px-3 py-1 text-xs font-semibold border border-emerald-100">
          Live
        </span>

        <div className="text-right">
          <p className="text-slate-900 font-medium text-sm">{user?.name}</p>
          <p className="text-slate-500 text-xs capitalize">{user?.role}</p>
        </div>

        <div className="h-10 w-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold">
          {user?.name?.charAt(0)?.toUpperCase() || "U"}
        </div>
      </div>
    </header>
  );
}

export default Topbar;