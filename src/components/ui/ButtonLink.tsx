import { Link, LinkProps } from 'react-router-dom';
import { buttonClasses, ButtonSize, ButtonVariant } from '../../utils/buttonStyles';

interface ButtonLinkProps extends LinkProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  /** Spinning light ring + hover lift for strategic call-to-action buttons. */
  glow?: boolean;
}

export function ButtonLink({ variant = 'primary', size = 'md', fullWidth = false, glow = false, className, ...rest }: ButtonLinkProps) {
  return <Link className={buttonClasses({ variant, size, fullWidth, glow, className })} {...rest} />;
}