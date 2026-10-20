import React, { useState } from 'react';
import { AlertCircleIcon, CheckCircle2Icon, EyeIcon, EyeOffIcon } from 'lucide-react';
import { cn } from '../../utils/cn';

interface FormFieldProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'id'> {
  id: string;
  label: string;
  hint?: string;
  error?: string | null;
  success?: string | null;
  optional?: boolean;
}

export function FormField({
  id,
  label,
  hint,
  error,
  success,
  optional = false,
  type = 'text',
  className,
  ...rest
}: FormFieldProps) {
  const [reveal, setReveal] = useState(false);
  const isPassword = type === 'password';
  const showSuccess = !error && Boolean(success);
  const showHint = Boolean(hint) && !showSuccess;
  const hintId = showHint ? `${id}-hint` : undefined;
  const messageId = error || showSuccess ? `${id}-message` : undefined;

  return (
    <div className={cn('flex flex-col', className)}>
      <label htmlFor={id} className="text-sm font-medium text-muted">
        {label}
        {optional && <span className="font-normal"> (optional)</span>}
      </label>
      <div className="relative">
        <input
          id={id}
          type={isPassword && reveal ? 'text' : type}
          aria-invalid={error ? true : undefined}
          aria-describedby={[hintId, messageId].filter(Boolean).join(' ') || undefined}
          className={cn(
            'w-full border-0 border-b bg-transparent px-0 pb-2.5 pt-2 text-base text-ink outline-none transition-[border-color,box-shadow] duration-150 ease-snappy placeholder:text-muted/60 focus:ring-0 disabled:opacity-60',
            error ?
            'border-danger focus:shadow-[0_1px_0_0_#B42318]' :
            'border-ink/25 hover:border-ink/45 focus:border-ink focus:shadow-[0_1px_0_0_#1B1B19]',
            isPassword && 'pr-11'
          )}
          {...rest} />
        
        {isPassword &&
        <button
          type="button"
          onClick={() => setReveal((r) => !r)}
          aria-label={reveal ? 'Hide password' : 'Show password'}
          aria-pressed={reveal}
          className="absolute right-0 top-1/2 grid h-9 w-9 -translate-y-1/2 place-items-center rounded-lg text-muted transition-colors duration-150 hover:bg-ink/5 hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest">
          
            {reveal ? <EyeOffIcon className="h-[18px] w-[18px]" /> : <EyeIcon className="h-[18px] w-[18px]" />}
          </button>
        }
      </div>
      {showHint &&
      <p id={hintId} className="mt-1.5 text-sm text-muted">
          {hint}
        </p>
      }
      <div aria-live="polite">
        {error &&
        <p id={messageId} className="mt-1.5 flex items-start gap-1.5 text-sm font-medium text-danger">
            <AlertCircleIcon className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
            {error}
          </p>
        }
        {showSuccess &&
        <p id={messageId} className="mt-1.5 flex items-start gap-1.5 text-sm font-medium text-forest-dark">
            <CheckCircle2Icon className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
            {success}
          </p>
        }
      </div>
    </div>);

}