import React from "react";
import ReadingTableRow from "./ReadingTableRow";
import ReadingCard from "./ReadingCard";
import EmptyState from "../common/EmptyState";

export function ReadingTable({
  readings = [],
  onEdit,
  onDelete,
  onAddNew,
  emptyMessage = "No blood glucose readings found.",
}) {
  if (readings.length === 0) {
    return (
      <EmptyState
        title="No readings yet"
        description={emptyMessage}
        actionLabel={onAddNew ? "Add First Reading" : undefined}
        onAction={onAddNew}
      />
    );
  }

  return (
    <div>
      {/* Desktop Table View */}
      <div className="hidden sm:block overflow-x-auto bg-white rounded-xl border border-slate-200 shadow-xs">
        <table className="min-w-full divide-y divide-slate-200">
          <thead className="bg-slate-50/75">
            <tr>
              <th
                scope="col"
                className="px-6 py-3.5 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider"
              >
                Date
              </th>
              <th
                scope="col"
                className="px-6 py-3.5 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider"
              >
                Slot
              </th>
              <th
                scope="col"
                className="px-6 py-3.5 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider"
              >
                Glucose Value
              </th>
              <th
                scope="col"
                className="px-6 py-3.5 text-right text-xs font-semibold text-slate-500 uppercase tracking-wider"
              >
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-slate-100">
            {readings.map((reading) => (
              <ReadingTableRow
                key={reading.id}
                reading={reading}
                onEdit={onEdit}
                onDelete={onDelete}
              />
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Card View */}
      <div className="sm:hidden space-y-3">
        {readings.map((reading) => (
          <ReadingCard
            key={reading.id}
            reading={reading}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))}
      </div>
    </div>
  );
}

export default ReadingTable;

