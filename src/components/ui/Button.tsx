import React from 'react';
import { Loader2Icon } from 'lucide-react';
import { buttonClasses, ButtonSize, ButtonVariant } from '../../utils/buttonStyles';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  loading?: boolean;
  loadingText?: string;
}

export function Button({
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  loading = false,
  loadingText,
  className,
  children,
  disabled,
  type = 'button',
  ...rest
}: ButtonProps) {
  return (
    <button
      type={type}
      className={buttonClasses({ variant, size, fullWidth, className })}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      {...rest}>
      
      {loading ?
      <>
          <Loader2Icon className="h-4 w-4 animate-spin" aria-hidden="true" />
          <span>{loadingText ?? children}</span>
        </> :

      children
      }
    </button>);

}