import React from "react";
import SlotBadge from "../readings/SlotBadge";
import GlucoseStatusBadge from "../readings/GlucoseStatusBadge";

export function DailyReadingsList({ readings = [] }) {
  if (readings.length === 0) {
    return (
      <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg text-center text-xs text-slate-500">
        No individual readings recorded for this day.
      </div>
    );
  }

  return (
    <div className="mt-6">
      <h4 className="text-sm font-semibold text-slate-900 mb-3">
        Readings for Selected Day ({readings.length}/4 slots filled)
      </h4>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {readings.map((reading) => (
          <div
            key={reading.id}
            className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2"
          >
            <div className="flex items-center justify-between">
              <SlotBadge slot={reading.slot} />
              <GlucoseStatusBadge value={reading.value} />
            </div>
            <div className="flex items-baseline gap-1.5 pt-1">
              <span className="text-2xl font-bold text-slate-900">
                {reading.value}
              </span>
              <span className="text-xs text-slate-500 font-medium">mg/dl</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default DailyReadingsList;

