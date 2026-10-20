import { Loader2Icon } from 'lucide-react';
import { buttonClasses, ButtonSize, ButtonVariant } from '../../utils/buttonStyles';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  loading?: boolean;
  loadingText?: string;
  /** Spinning light ring + hover lift for strategic call-to-action buttons. */
  glow?: boolean;
}

export function Button({
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  loading = false,
  loadingText,
  glow = false,
  className,
  children,
  disabled,
  type = 'button',
  ...rest
}: ButtonProps) {
  return (
    <button
      type={type}
      className={buttonClasses({ variant, size, fullWidth, glow, className })}
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