import React from 'react';
import { AlertCircleIcon, ChevronDownIcon } from 'lucide-react';
import { cn } from '../../utils/cn';

interface SelectOption {
  value: string;
  label: string;
}

interface SelectFieldProps extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, 'id'> {
  id: string;
  label: string;
  options: SelectOption[];
  placeholder?: string;
  hint?: string;
  error?: string | null;
  optional?: boolean;
}

export function SelectField({ id, label, options, placeholder, hint, error, optional, className, ...rest }: SelectFieldProps) {
  const hintId = hint ? `${id}-hint` : undefined;
  const errorId = error ? `${id}-error` : undefined;
  return (
    <div className={cn('flex flex-col', className)}>
      <label htmlFor={id} className="text-sm font-medium text-muted">
        {label}
        {optional && <span className="font-normal"> (optional)</span>}
      </label>
      <div className="relative">
        <select
          id={id}
          aria-invalid={error ? true : undefined}
          aria-describedby={[hintId, errorId].filter(Boolean).join(' ') || undefined}
          className={cn(
            'w-full appearance-none border-0 border-b bg-transparent px-0 pb-2.5 pr-8 pt-2 text-base outline-none transition-[border-color,box-shadow] duration-150 ease-snappy focus:ring-0',
            rest.value ? 'text-ink' : 'text-muted/80',
            error ?
            'border-danger focus:shadow-[0_1px_0_0_#B42318]' :
            'border-ink/25 hover:border-ink/45 focus:border-ink focus:shadow-[0_1px_0_0_#1B1B19]'
          )}
          {...rest}>
          
          {placeholder !== undefined && <option value="">{placeholder}</option>}
          {options.map((o) =>
          <option key={o.value} value={o.value} className="text-ink">
              {o.label}
            </option>
          )}
        </select>
        <ChevronDownIcon className="pointer-events-none absolute right-0 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" aria-hidden="true" />
      </div>
      {hint &&
      <p id={hintId} className="mt-1.5 text-sm text-muted">
          {hint}
        </p>
      }
      {error &&
      <p id={errorId} className="mt-1.5 flex items-start gap-1.5 text-sm font-medium text-danger">
          <AlertCircleIcon className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
          {error}
        </p>
      }
    </div>);

}