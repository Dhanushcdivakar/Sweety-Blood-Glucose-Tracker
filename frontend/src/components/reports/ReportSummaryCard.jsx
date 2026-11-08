import React from "react";
import { TrendingUp, ArrowDown, ArrowUp, Activity } from "lucide-react";
import StatCard from "../common/StatCard";
import EmptyState from "../common/EmptyState";

export function ReportSummaryCard({
  title,
  subtitle,
  reportData,
  periodName = "period",
}) {
  const { highest, lowest, average, count } = reportData || {};

  if (!reportData || count === 0) {
    return (
      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs">
        <div className="mb-4">
          <h3 className="text-base font-semibold text-slate-900">{title}</h3>
          {subtitle && <p className="text-xs text-slate-500">{subtitle}</p>}
        </div>
        <EmptyState
          title={`No readings for this ${periodName}`}
          description={`There are no glucose readings recorded in this ${periodName}. Add readings to see metrics.`}
        />
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs">
      <div className="mb-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
        <div>
          <h3 className="text-base font-semibold text-slate-900">{title}</h3>
          {subtitle && <p className="text-xs text-slate-500">{subtitle}</p>}
        </div>
        <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-slate-100 text-slate-700 w-fit">
          {count} {count === 1 ? "reading" : "readings"} recorded
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Average"
          value={average !== null ? Number(average).toFixed(1) : "—"}
          unit="mg/dl"
          subtitle="Mean glucose level"
          icon={Activity}
          colorScheme="primary"
        />
        <StatCard
          title="Highest"
          value={highest}
          unit="mg/dl"
          subtitle="Peak measurement"
          icon={ArrowUp}
          colorScheme="rose"
        />
        <StatCard
          title="Lowest"
          value={lowest}
          unit="mg/dl"
          subtitle="Trough measurement"
          icon={ArrowDown}
          colorScheme="emerald"
        />
        <StatCard
          title="Total Count"
          value={count}
          unit="readings"
          subtitle="Measurements logged"
          icon={TrendingUp}
          colorScheme="slate"
        />
      </div>
    </div>
  );
}

export default ReportSummaryCard;

