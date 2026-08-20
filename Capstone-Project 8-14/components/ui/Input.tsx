import { forwardRef } from "react";
import type { InputHTMLAttributes, TextareaHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  hint?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, hint, id, className = "", ...props }, ref) => {
    const inputId = id ?? props.name;
    return (
      <div className="flex flex-col gap-1.5">
        <label htmlFor={inputId} className="text-sm font-medium text-ink-900">
          {label}
        </label>
        <input
          ref={ref}
          id={inputId}
          className={`rounded-md border bg-paper-panel px-3 py-2 text-sm text-ink-900 outline-none transition-colors placeholder:text-ink-400/60 focus:border-ink-900 ${
            error ? "border-debit" : "border-paper-rule"
          } ${className}`}
          aria-invalid={!!error}
          aria-describedby={error ? `${inputId}-error` : hint ? `${inputId}-hint` : undefined}
          {...props}
        />
        {error ? (
          <p id={`${inputId}-error`} className="text-xs text-debit">
            {error}
          </p>
        ) : hint ? (
          <p id={`${inputId}-hint`} className="text-xs text-ink-400">
            {hint}
          </p>
        ) : null}
      </div>
    );
  }
);
Input.displayName = "Input";

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  error?: string;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, id, className = "", ...props }, ref) => {
    const inputId = id ?? props.name;
    return (
      <div className="flex flex-col gap-1.5">
        <label htmlFor={inputId} className="text-sm font-medium text-ink-900">
          {label}
        </label>
        <textarea
          ref={ref}
          id={inputId}
          rows={3}
          className={`rounded-md border bg-paper-panel px-3 py-2 text-sm text-ink-900 outline-none transition-colors placeholder:text-ink-400/60 focus:border-ink-900 ${
            error ? "border-debit" : "border-paper-rule"
          } ${className}`}
          aria-invalid={!!error}
          {...props}
        />
        {error ? <p className="text-xs text-debit">{error}</p> : null}
      </div>
    );
  }
);
Textarea.displayName = "Textarea";

export default Input;
