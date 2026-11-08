import React from "react";
import { getSlotConfig } from "../../utils/formatters";

export function SlotBadge({ slot, className = "" }) {
  const config = getSlotConfig(slot);

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${config.color || config.badgeColor} ${className}`}
    >
      {config.label}
    </span>
  );
}

export default SlotBadge;

