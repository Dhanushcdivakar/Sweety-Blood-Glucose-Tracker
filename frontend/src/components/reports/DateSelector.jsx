import React from "react";
import { Calendar as CalendarIcon } from "lucide-react";
import { getTodayDateString } from "../../utils/formatters";

export function DateSelector({ selectedDate, onDateChange }) {
  const todayStr = getTodayDateString();

  return (
    <div className="flex flex-wrap items-center gap-2">
      <div className="relative inline-flex items-center">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
          <CalendarIcon className="w-4 h-4" />
        </div>
        <input
          type="date"
          value={selectedDate}
          max={todayStr}
          onChange={(e) => onDateChange(e.target.value)}
          className="pl-9 pr-3.5 py-1.5 text-sm bg-white border border-slate-300 rounded-lg shadow-2xs font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-primary-400"
        />
      </div>

      {selectedDate !== todayStr && (
        <button
          onClick={() => onDateChange(todayStr)}
          className="px-2.5 py-1.5 text-xs font-medium text-primary-700 bg-primary-50 hover:bg-primary-100 rounded-lg transition-colors border border-primary-200"
        >
          Reset to Today
        </button>
      )}
    </div>
  );
}

export default DateSelector;

