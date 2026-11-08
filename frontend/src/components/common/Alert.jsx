import React from "react";
import { AlertCircle, CheckCircle2, Info, AlertTriangle, X } from "lucide-react";

export function Alert({
  type = "error",
  title,
  message,
  onDismiss,
  className = "",
}) {
  if (!message && !title) return null;

  const config = {
    error: {
      container: "bg-rose-50 border-rose-200 text-rose-800",
      icon: AlertCircle,
      iconColor: "text-rose-500",
    },
    success: {
      container: "bg-emerald-50 border-emerald-200 text-emerald-800",
      icon: CheckCircle2,
      iconColor: "text-emerald-500",
    },
    warning: {
      container: "bg-amber-50 border-amber-200 text-amber-800",
      icon: AlertTriangle,
      iconColor: "text-amber-500",
    },
    info: {
      container: "bg-blue-50 border-blue-200 text-blue-800",
      icon: Info,
      iconColor: "text-blue-500",
    },
  };

  const current = config[type] || config.error;
  const Icon = current.icon;

  return (
    <div
      className={`flex items-start p-3.5 border rounded-lg text-sm ${current.container} ${className}`}
      role="alert"
    >
      <Icon className={`w-5 h-5 shrink-0 mr-3 mt-0.5 ${current.iconColor}`} />
      <div className="flex-1">
        {title && <h5 className="font-semibold">{title}</h5>}
        {message && <div className={title ? "mt-0.5 text-xs" : ""}>{message}</div>}
      </div>
      {onDismiss && (
        <button
          onClick={onDismiss}
          className="ml-3 -mr-1 p-1 hover:opacity-75 transition-opacity"
          aria-label="Dismiss alert"
        >
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  );
}

export default Alert;

