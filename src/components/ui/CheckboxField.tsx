import React from 'react';
import { AlertCircleIcon } from 'lucide-react';

interface CheckboxFieldProps {
  id: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  label: React.ReactNode;
  description?: string;
  error?: string | null;
}

export function CheckboxField({ id, checked, onChange, label, description, error }: CheckboxFieldProps) {
  const descId = description ? `${id}-desc` : undefined;
  const errorId = error ? `${id}-error` : undefined;
  return (
    <div>
      <div className="flex items-start gap-3">
        <input
          id={id}
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          aria-invalid={error ? true : undefined}
          aria-describedby={[descId, errorId].filter(Boolean).join(' ') || undefined}
          className="mt-0.5 h-5 w-5 shrink-0 cursor-pointer rounded border-ink/30 accent-forest focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest focus-visible:ring-offset-2" />
        
        <div>
          <label htmlFor={id} className="cursor-pointer text-sm leading-snug text-ink">
            {label}
          </label>
          {description &&
          <p id={descId} className="mt-1 text-sm text-muted">
              {description}
            </p>
          }
        </div>
      </div>
      {error &&
      <p id={errorId} className="mt-2 flex items-start gap-1.5 text-sm font-medium text-danger">
          <AlertCircleIcon className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
          {error}
        </p>
      }
    </div>);

}