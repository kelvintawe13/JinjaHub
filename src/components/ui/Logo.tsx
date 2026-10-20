import React from 'react';
import { Link } from 'react-router-dom';
import { SproutIcon } from 'lucide-react';
import { cn } from '../../utils/cn';

interface LogoProps {
  tone?: 'dark' | 'light';
  className?: string;
}

export function Logo({ tone = 'dark', className }: LogoProps) {
  return (
    <Link
      to="/"
      aria-label="Jinja Edu-Hub home"
      className={cn(
        'inline-flex items-center gap-2.5 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest focus-visible:ring-offset-2',
        className
      )}>
      
      <span className="grid h-8 w-8 place-items-center rounded-lg bg-forest text-ink">
        <SproutIcon className="h-4 w-4" aria-hidden="true" />
      </span>
      <span className={cn('whitespace-nowrap text-base font-semibold tracking-tight', tone === 'light' ? 'text-paper' : 'text-ink')}>
        Jinja Edu-Hub
      </span>
    </Link>);

}