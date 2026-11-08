import React from "react";

export function StatCard({
  title,
  value,
  unit = "mg/dl",
  subtitle,
  icon: Icon,
  trend,
  colorScheme = "primary", // primary, amber, rose, slate
}) {
  const schemeStyles = {
    primary: {
      bg: "bg-teal-50/70 border-teal-200/80",
      iconBg: "bg-teal-100 text-teal-700",
      value: "text-teal-900",
    },
    emerald: {
      bg: "bg-emerald-50/70 border-emerald-200/80",
      iconBg: "bg-emerald-100 text-emerald-700",
      value: "text-emerald-900",
    },
    amber: {
      bg: "bg-amber-50/70 border-amber-200/80",
      iconBg: "bg-amber-100 text-amber-700",
      value: "text-amber-900",
    },
    rose: {
      bg: "bg-rose-50/70 border-rose-200/80",
      iconBg: "bg-rose-100 text-rose-700",
      value: "text-rose-900",
    },
    slate: {
      bg: "bg-slate-50 border-slate-200",
      iconBg: "bg-slate-200 text-slate-700",
      value: "text-slate-900",
    },
  };

  const current = schemeStyles[colorScheme] || schemeStyles.primary;

  return (
    <div
      className={`p-5 rounded-xl border transition-all hover:shadow-xs bg-white ${current.bg}`}
    >
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
          {title}
        </span>
        {Icon && (
          <div className={`p-2 rounded-lg ${current.iconBg}`}>
            <Icon className="w-4 h-4" />
          </div>
        )}
      </div>

      <div className="mt-3 flex items-baseline gap-1.5">
        <span className={`text-2xl font-bold tracking-tight ${current.value}`}>
          {value !== null && value !== undefined ? value : "—"}
        </span>
        {value !== null && value !== undefined && unit && (
          <span className="text-xs font-medium text-slate-500">{unit}</span>
        )}
      </div>

      {subtitle && (
        <p className="mt-1 text-xs text-slate-500 font-medium">{subtitle}</p>
      )}
    </div>
  );
}

export default StatCard;

