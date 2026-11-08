import React from "react";

export function Select({
  label,
  id,
  options = [],
  error,
  helperText,
  className = "",
  containerClassName = "",
  placeholder = "Select an option",
  required = false,
  ...props
}) {
  const selectId = id || props.name;

  return (
    <div className={`space-y-1.5 ${containerClassName}`}>
      {label && (
        <label
          htmlFor={selectId}
          className="block text-sm font-medium text-slate-700"
        >
          {label} {required && <span className="text-rose-500">*</span>}
        </label>
      )}
      <select
        id={selectId}
        className={`w-full px-3.5 py-2 text-sm bg-white border rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-offset-0 ${
          error
            ? "border-rose-400 focus:border-rose-500 focus:ring-rose-200 text-slate-900"
            : "border-slate-300 focus:border-primary-500 focus:ring-primary-200 text-slate-900"
        } ${className}`}
        {...props}
      >
        {placeholder && (
          <option value="" disabled>
            {placeholder}
          </option>
        )}
        {options.map((opt) => (
          <option key={opt.value ?? opt.id} value={opt.value ?? opt.id}>
            {opt.label}
          </option>
        ))}
      </select>
      {error && <p className="text-xs text-rose-600 font-medium">{error}</p>}
      {helperText && !error && (
        <p className="text-xs text-slate-500">{helperText}</p>
      )}
    </div>
  );
}

export default Select;

