import { READING_SLOTS, GLUCOSE_RANGES } from "./constants";

/**
 * Returns today's date formatted as YYYY-MM-DD in local time
 */
export function getTodayDateString() {
  const d = new Date();
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

/**
 * Formats an ISO string or date into a user-friendly format (e.g. "15 Oct 2026")
 */
export function formatDate(dateInput) {
  if (!dateInput) return "—";
  // If YYYY-MM-DD or ISO date string
  const dateStr = typeof dateInput === "string" ? dateInput.slice(0, 10) : "";
  const parts = dateStr.split("-");

  if (parts.length === 3) {
    const year = parseInt(parts[0], 10);
    const month = parseInt(parts[1], 10) - 1;
    const day = parseInt(parts[2], 10);
    const date = new Date(year, month, day);
    return date.toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  }

  const d = new Date(dateInput);
  if (isNaN(d.getTime())) return "—";
  return d.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

/**
 * Extracts YYYY-MM-DD from an ISO string or Date
 */
export function toDateInputValue(dateInput) {
  if (!dateInput) return getTodayDateString();
  if (typeof dateInput === "string") {
    return dateInput.slice(0, 10);
  }
  return dateInput.toISOString().slice(0, 10);
}

/**
 * Gets human-readable slot label
 */
export function getSlotLabel(slotId) {
  const slot = READING_SLOTS.find((s) => s.id === slotId);
  return slot ? slot.label : slotId;
}

/**
 * Gets slot object
 */
export function getSlotConfig(slotId) {
  return (
    READING_SLOTS.find((s) => s.id === slotId) || {
      id: slotId,
      label: slotId,
      badgeColor: "bg-gray-100 text-gray-800",
    }
  );
}

/**
 * Returns clinical glucose status classification
 */
export function getGlucoseStatus(value) {
  const val = Number(value);
  if (isNaN(val)) return null;

  if (val <= GLUCOSE_RANGES.LOW.max) {
    return GLUCOSE_RANGES.LOW;
  }
  if (val <= GLUCOSE_RANGES.NORMAL.max) {
    return GLUCOSE_RANGES.NORMAL;
  }
  if (val <= GLUCOSE_RANGES.ELEVATED.max) {
    return GLUCOSE_RANGES.ELEVATED;
  }
  return GLUCOSE_RANGES.HIGH;
}

