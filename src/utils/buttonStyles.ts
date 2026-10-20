import { cn } from './cn';

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'light';
export type ButtonSize = 'sm' | 'md' | 'lg';

const variants: Record<ButtonVariant, string> = {
  primary: 'bg-forest text-ink hover:bg-[#FF7B22]',
  secondary: 'bg-sand text-ink hover:bg-sand-dark',
  outline: 'border border-ink/15 text-ink hover:bg-ink/5',
  ghost: 'text-ink hover:bg-ink/5',
  light: 'bg-paper text-ink hover:bg-sand'
};

const sizes: Record<ButtonSize, string> = {
  // min-h keeps touch targets >= 40px (sm) / 44px (md, lg) on mobile.
  sm: 'min-h-10 rounded-lg px-3 text-sm',
  md: 'min-h-11 rounded-lg px-4 text-sm',
  lg: 'min-h-11 rounded-lg px-5 text-base'
};

interface ButtonClassOptions {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  /** Spinning light ring + hover lift for strategic call-to-action buttons. */
  glow?: boolean;
  className?: string;
}

export function buttonClasses({
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  glow = false,
  className
}: ButtonClassOptions): string {
  return cn(
    'inline-flex items-center justify-center gap-2 whitespace-nowrap font-semibold transition-[background-color,color,transform,opacity] duration-150 ease-snappy active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest focus-visible:ring-offset-2 focus-visible:ring-offset-canvas',
    variants[variant],
    sizes[size],
    fullWidth && 'w-full',
    glow && 'btn-glow',
    className
  );
}
