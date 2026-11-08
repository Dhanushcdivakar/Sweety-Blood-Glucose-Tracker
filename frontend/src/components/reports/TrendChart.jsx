import React from "react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ReferenceLine,
} from "recharts";
import { formatDate, getSlotLabel } from "../../utils/formatters";

export function TrendChart({ readings = [] }) {
  if (readings.length === 0) {
    return null;
  }

  // Sort readings chronologically (oldest to newest for the trend line)
  const chartData = [...readings]
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .map((r) => ({
      id: r.id,
      rawDate: r.date,
      dateLabel: formatDate(r.date),
      slot: getSlotLabel(r.slot),
      value: r.value,
    }));

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-slate-900 text-white text-xs rounded-lg p-3 shadow-lg space-y-1">
          <p className="font-semibold text-slate-200">{data.dateLabel}</p>
          <p className="text-primary-300">{data.slot}</p>
          <p className="text-base font-bold text-white">
            {data.value} <span className="text-xs font-normal text-slate-400">mg/dl</span>
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs">
      <div className="mb-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
        <div>
          <h3 className="text-base font-semibold text-slate-900">
            Glucose Trend Over Time
          </h3>
          <p className="text-xs text-slate-500">
            Chronological progression of blood glucose measurements (target range: 70–140 mg/dl)
          </p>
        </div>
        <div className="flex items-center gap-4 text-xs text-slate-500 pt-1 sm:pt-0">
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-primary-500 inline-block" />
            Reading (mg/dl)
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-0.5 bg-emerald-500 inline-block" />
            Target (70-140)
          </span>
        </div>
      </div>

      <div className="h-72 w-full pt-2">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={chartData}
            margin={{ top: 10, right: 10, left: -15, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
            <XAxis
              dataKey="dateLabel"
              tick={{ fontSize: 11, fill: "#64748b" }}
              tickMargin={8}
            />
            <YAxis
              domain={[40, "auto"]}
              tick={{ fontSize: 11, fill: "#64748b" }}
              tickMargin={8}
            />
            <Tooltip content={<CustomTooltip />} />
            {/* Clinical target reference lines */}
            <ReferenceLine
              y={70}
              stroke="#10b981"
              strokeDasharray="4 4"
              label={{
                value: "70 Min",
                position: "insideBottomLeft",
                fill: "#10b981",
                fontSize: 10,
              }}
            />
            <ReferenceLine
              y={140}
              stroke="#10b981"
              strokeDasharray="4 4"
              label={{
                value: "140 Max",
                position: "insideTopLeft",
                fill: "#10b981",
                fontSize: 10,
              }}
            />
            <Line
              type="monotone"
              dataKey="value"
              stroke="#0d9488"
              strokeWidth={2.5}
              dot={{ r: 4, fill: "#0d9488", stroke: "#ffffff", strokeWidth: 2 }}
              activeDot={{ r: 6, fill: "#0f766e" }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default TrendChart;

