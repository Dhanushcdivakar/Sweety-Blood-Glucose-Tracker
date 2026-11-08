import React from "react";
import { getGlucoseStatus } from "../../utils/formatters";

export function GlucoseStatusBadge({ value }) {
  const status = getGlucoseStatus(value);
  if (!status) return null;

  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 rounded text-[11px] font-semibold border ${status.color}`}
    >
      {status.label}
    </span>
  );
}

export default GlucoseStatusBadge;

