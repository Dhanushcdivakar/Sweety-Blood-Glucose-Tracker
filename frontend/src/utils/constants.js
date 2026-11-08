export const READING_SLOTS = [
  {
    id: "MORNING_FASTING",
    label: "Morning",
    shortLabel: "Fasting",
    color: "bg-amber-50 text-amber-700 border-amber-200",
    badgeColor: "bg-amber-100 text-amber-800",
  },
  {
    id: "AFTER_BREAKFAST",
    label: "After",
    shortLabel: "Breakfast",
    color: "bg-blue-50 text-blue-700 border-blue-200",
    badgeColor: "bg-blue-100 text-blue-800",
  },
  {
    id: "AFTER_LUNCH",
    label: "After",
    shortLabel: "Lunch",
    color: "bg-emerald-50 text-emerald-700 border-emerald-200",
    badgeColor: "bg-emerald-100 text-emerald-800",
  },
  {
    id: "AFTER_DINNER",
    label: "After",
    shortLabel: "Dinner",
    color: "bg-purple-50 text-purple-700 border-purple-200",
    badgeColor: "bg-purple-100 text-purple-800",
  },
];

export const GLUCOSE_RANGES = {
  LOW: { max: 69, label: "Low", color: "text-red-600 bg-red-50 border-red-200" },
  NORMAL: { min: 70, max: 140, label: "Normal", color: "text-emerald-700 bg-emerald-50 border-emerald-200" },
  ELEVATED: { min: 141, max: 180, label: "Elevated", color: "text-amber-700 bg-amber-50 border-amber-200" },
  HIGH: { min: 181, label: "High", color: "text-rose-700 bg-rose-50 border-rose-200" },
};

