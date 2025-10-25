import type { TextareaHTMLAttributes } from "react";

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  error?: string;
  rows?: number;
}

export function Textarea({
  label,
  error,
  id,
  rows = 4,
  ...props
}: TextareaProps) {
  return (
    <div className="w-full">
      <label
        htmlFor={id}
        className="mb-1 block text-sm font-medium text-gray-700"
      >
        {label}
      </label>
      <textarea
        id={id}
        rows={rows}
        {...props}
        className={`resize-vertical w-full rounded-lg border px-4 py-2 transition outline-none focus:border-transparent focus:ring-2 focus:ring-blue-500 ${
          error ? "border-red-500" : "border-gray-300"
        }`}
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-error` : undefined}
      />
      {error && (
        <p id={`${id}-error`} className="mt-1 text-sm text-red-600">
          {error}
        </p>
      )}
    </div>
  );
}
