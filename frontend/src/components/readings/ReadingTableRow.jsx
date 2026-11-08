import React from "react";
import { Edit2, Trash2 } from "lucide-react";
import { formatDate } from "../../utils/formatters";
import SlotBadge from "./SlotBadge";
import GlucoseStatusBadge from "./GlucoseStatusBadge";

export function ReadingTableRow({ reading, onEdit, onDelete }) {
  return (
    <tr className="hover:bg-slate-50/80 transition-colors border-b border-slate-100 last:border-b-0">
      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-800">
        {formatDate(reading.date)}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm">
        <SlotBadge slot={reading.slot} />
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm">
        <div className="flex items-center gap-2">
          <span className="font-semibold text-slate-900 text-base">
            {reading.value}
          </span>
          <span className="text-xs text-slate-500">mg/dl</span>
          <GlucoseStatusBadge value={reading.value} />
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
        <div className="flex items-center justify-end gap-1.5">
          <button
            onClick={() => onEdit(reading)}
            className="p-1.5 text-slate-500 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors"
            title="Edit reading"
          >
            <Edit2 className="w-4 h-4" />
          </button>
          <button
            onClick={() => onDelete(reading)}
            className="p-1.5 text-slate-500 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
            title="Delete reading"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </td>
    </tr>
  );
}

export default ReadingTableRow;

