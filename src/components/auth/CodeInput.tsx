import React, { useRef } from 'react';
import { cn } from '../../utils/cn';

interface CodeInputProps {
  id: string;
  value: string;
  onChange: (value: string) => void;
  onComplete?: (value: string) => void;
  labelledBy: string;
  describedBy?: string;
  disabled?: boolean;
  invalid?: boolean;
  length?: number;
}

export function CodeInput({
  id,
  value,
  onChange,
  onComplete,
  labelledBy,
  describedBy,
  disabled = false,
  invalid = false,
  length = 6
}: CodeInputProps) {
  const refs = useRef<Array<HTMLInputElement | null>>([]);
  const digits = Array.from({ length }, (_, i) => value[i] ?? '');

  function focusBox(index: number) {
    refs.current[Math.max(0, Math.min(index, length - 1))]?.focus();
  }

  function commit(next: string) {
    const clean = next.replace(/\D/g, '').slice(0, length);
    onChange(clean);
    focusBox(clean.length);
    if (clean.length === length) onComplete?.(clean);
  }

  function handleChange(index: number, raw: string) {
    const typed = raw.replace(/\D/g, '');
    if (!typed) return;
    if (typed.length > 1) {
      commit(value.slice(0, index) + typed);
      return;
    }
    commit(value.slice(0, index) + typed + value.slice(index + 1));
  }

  function handleKeyDown(index: number, e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Backspace') {
      e.preventDefault();
      if (digits[index]) {
        onChange(value.slice(0, index) + value.slice(index + 1));
      } else if (index > 0) {
        onChange(value.slice(0, index - 1) + value.slice(index));
        focusBox(index - 1);
      }
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      focusBox(index - 1);
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      focusBox(Math.min(index + 1, value.length));
    }
  }

  return (
    <div role="group" aria-labelledby={labelledBy} aria-describedby={describedBy} className="grid grid-cols-6 gap-2 sm:gap-3">
      {digits.map((digit, i) =>
      <input
        key={i}
        id={i === 0 ? id : undefined}
        ref={(el) => {
          refs.current[i] = el;
        }}
        value={digit}
        onChange={(e) => handleChange(i, e.target.value)}
        onKeyDown={(e) => handleKeyDown(i, e)}
        onFocus={(e) => {
          if (i > value.length) focusBox(value.length);else
          e.target.select();
        }}
        onPaste={(e) => {
          e.preventDefault();
          commit(e.clipboardData.getData('text'));
        }}
        inputMode="numeric"
        autoComplete={i === 0 ? 'one-time-code' : 'off'}
        maxLength={i === 0 ? length : 1}
        disabled={disabled}
        aria-label={`Digit ${i + 1} of ${length}`}
        aria-invalid={invalid || undefined}
        className={cn(
          'h-14 w-full rounded-xl border bg-paper text-center text-2xl font-semibold text-ink outline-none transition-[border-color,box-shadow] duration-150 ease-snappy disabled:cursor-not-allowed disabled:opacity-50',
          invalid ? 'border-danger focus:ring-2 focus:ring-danger/20' : 'border-line focus:border-ink focus:ring-2 focus:ring-ink/10'
        )} />

      )}
    </div>);

}