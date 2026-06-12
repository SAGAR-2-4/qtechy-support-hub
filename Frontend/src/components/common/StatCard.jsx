function StatCard({
  title,
  value,
  icon: Icon,
  helper,
  trend = "+12%",
  tone = "blue",
}) {
  const toneStyles = {
    blue: {
      icon: "bg-blue-50 text-blue-600",
      trend: "bg-blue-50 text-blue-700",
      line: "from-blue-500 to-blue-300",
    },
    green: {
      icon: "bg-emerald-50 text-emerald-600",
      trend: "bg-emerald-50 text-emerald-700",
      line: "from-emerald-500 to-emerald-300",
    },
    amber: {
      icon: "bg-amber-50 text-amber-600",
      trend: "bg-amber-50 text-amber-700",
      line: "from-amber-500 to-amber-300",
    },
    red: {
      icon: "bg-red-50 text-red-600",
      trend: "bg-red-50 text-red-700",
      line: "from-red-500 to-red-300",
    },
    slate: {
      icon: "bg-slate-100 text-slate-700",
      trend: "bg-slate-100 text-slate-700",
      line: "from-slate-500 to-slate-300",
    },
  };

  const currentTone = toneStyles[tone] || toneStyles.blue;

  return (
    <div className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
      <div
        className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${currentTone.line}`}
      />

      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-slate-500">{title}</p>

          <div className="mt-3 flex items-end gap-3">
            <h3 className="text-4xl font-bold tracking-tight text-slate-900">
              {value ?? 0}
            </h3>

            <span
              className={`mb-1 rounded-full px-2.5 py-1 text-xs font-semibold ${currentTone.trend}`}
            >
              ↑ {trend}
            </span>
          </div>

          {helper && (
            <p className="mt-3 text-xs leading-relaxed text-slate-400">
              {helper}
            </p>
          )}
        </div>

        {Icon && (
          <div
            className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl ${currentTone.icon}`}
          >
            <Icon size={24} />
          </div>
        )}
      </div>

      <div className="mt-5 flex h-8 items-end gap-1">
        {[35, 55, 42, 70, 58, 82, 65].map((height, index) => (
          <div
            key={index}
            className="w-full rounded-t bg-slate-100"
            style={{ height: `${height}%` }}
          />
        ))}
      </div>
    </div>
  );
}

export default StatCard;