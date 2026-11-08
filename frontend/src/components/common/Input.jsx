import React from "react";

export function Input({
  label,
  id,
  type = "text",
  error,
  helperText,
  className = "",
  containerClassName = "",
  required = false,
  ...props
}) {
  const inputId = id || props.name;

  return (
    <div className={`space-y-1.5 ${containerClassName}`}>
      {label && (
        <label
          htmlFor={inputId}
          className="block text-sm font-medium text-slate-700"
        >
          {label} {required && <span className="text-rose-500">*</span>}
        </label>
      )}
      <input
        id={inputId}
        type={type}
        className={`w-full px-3.5 py-2 text-sm bg-white border rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-offset-0 ${
          error
            ? "border-rose-400 focus:border-rose-500 focus:ring-rose-200 text-slate-900"
            : "border-slate-300 focus:border-primary-500 focus:ring-primary-200 text-slate-900"
        } ${className}`}
        {...props}
      />
      {error && <p className="text-xs text-rose-600 font-medium">{error}</p>}
      {helperText && !error && (
        <p className="text-xs text-slate-500">{helperText}</p>
      )}
    </div>
  );
}

export default Input;

