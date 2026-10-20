import { Link } from 'react-router-dom';
import { ArrowRightIcon } from 'lucide-react';
import { cn } from '../../utils/cn';

interface SectionHeadingProps {
  id?: string;
  title: string;
  intro?: string;
  action?: {label: string;to: string;};
  badge?: React.ReactNode;
  className?: string;
}

export function SectionHeading({ id, title, intro, action, badge, className }: SectionHeadingProps) {
  return (
    <div className={cn('flex flex-col gap-5 md:flex-row md:items-end md:justify-between', className)}>
      <div className="max-w-2xl">
        {badge && <div className="mb-3">{badge}</div>}
        <h2 id={id} className="text-2xl font-semibold tracking-tight md:text-3xl">
          {title}
        </h2>
        {intro && <p className="mt-2 text-base leading-relaxed text-muted">{intro}</p>}
      </div>
      {action &&
      <Link
        to={action.to}
        className="group inline-flex shrink-0 items-center gap-1.5 whitespace-nowrap rounded-md font-semibold text-ink underline decoration-ink/25 underline-offset-[6px] transition-[text-decoration-color] duration-150 hover:decoration-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest">
        
          {action.label}
          <ArrowRightIcon className="h-4 w-4 transition-transform duration-150 ease-snappy group-hover:translate-x-0.5" aria-hidden="true" />
        </Link>
      }
    </div>);

}