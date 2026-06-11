function StatCard({ title, value, icon: Icon, helper }) {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-slate-500">{title}</p>
          <h3 className="mt-2 text-3xl font-bold text-slate-900">
            {value ?? 0}
          </h3>
          {helper && (
            <p className="mt-2 text-xs text-slate-400">{helper}</p>
          )}
        </div>

        {Icon && (
          <div className="h-12 w-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
            <Icon size={24} />
          </div>
        )}
      </div>
    </div>
  );
}

export default StatCard;