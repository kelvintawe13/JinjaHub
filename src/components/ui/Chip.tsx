import React from 'react';
import { cn } from '../../utils/cn';

interface ChipProps {
  children: React.ReactNode;
  selected?: boolean;
  onClick?: () => void;
  tone?: 'neutral' | 'forest' | 'sand';
  className?: string;
}

const tagTones = {
  neutral: 'bg-ink/[0.06] text-ink',
  forest: 'bg-forest-soft text-forest-dark',
  sand: 'bg-sand text-ink'
};

/** Filter chip when `onClick` is given, otherwise a static tag. */
export function Chip({ children, selected = false, onClick, tone = 'neutral', className }: ChipProps) {
  if (onClick) {
    return (
      <button
        type="button"
        onClick={onClick}
        aria-pressed={selected}
        className={cn(
          'inline-flex h-8 items-center gap-1.5 whitespace-nowrap rounded-full border px-3.5 text-sm font-medium transition-[background-color,border-color,color] duration-150 ease-snappy focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest focus-visible:ring-offset-2 focus-visible:ring-offset-canvas',
          selected ? 'border-ink bg-ink text-paper' : 'border-line bg-paper text-ink hover:border-ink/30',
          className
        )}>
        
        {children}
      </button>);

  }
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 whitespace-nowrap rounded-full px-3 py-1 text-xs font-semibold',
        tagTones[tone],
        className
      )}>
      
      {children}
    </span>);

}