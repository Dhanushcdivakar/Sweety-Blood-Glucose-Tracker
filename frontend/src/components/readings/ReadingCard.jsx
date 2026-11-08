import React from "react";
import { Edit2, Trash2 } from "lucide-react";
import { formatDate } from "../../utils/formatters";
import SlotBadge from "./SlotBadge";
import GlucoseStatusBadge from "./GlucoseStatusBadge";

export function ReadingCard({ reading, onEdit, onDelete }) {
  return (
    <div className="p-4 bg-white rounded-xl border border-slate-200 shadow-xs space-y-3">
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold text-slate-500">
          {formatDate(reading.date)}
        </span>
        <SlotBadge slot={reading.slot} />
      </div>

      <div className="flex items-baseline justify-between">
        <div className="flex items-baseline gap-1.5">
          <span className="text-2xl font-bold text-slate-900">
            {reading.value}
          </span>
          <span className="text-xs font-medium text-slate-500">mg/dl</span>
        </div>
        <GlucoseStatusBadge value={reading.value} />
      </div>

      <div className="pt-2 border-t border-slate-100 flex items-center justify-end gap-2">
        <button
          onClick={() => onEdit(reading)}
          className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium text-slate-600 hover:text-primary-600 hover:bg-primary-50 rounded-md transition-colors"
        >
          <Edit2 className="w-3.5 h-3.5" />
          Edit
        </button>
        <button
          onClick={() => onDelete(reading)}
          className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium text-rose-600 hover:bg-rose-50 rounded-md transition-colors"
        >
          <Trash2 className="w-3.5 h-3.5" />
          Delete
        </button>
      </div>
    </div>
  );
}

export default ReadingCard;

