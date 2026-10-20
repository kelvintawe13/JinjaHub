import { Link } from 'react-router-dom';
import { ArrowRightIcon } from 'lucide-react';
import type { Feature } from '../../types/content';
import { cn } from '../../utils/cn';

export function FeatureTile({ feature, className }: {feature: Feature;className?: string;}) {
  const Icon = feature.icon;
  const emphasis = Boolean(feature.emphasis);
  return (
    <div
      className={cn(
        'flex flex-col rounded-2xl p-6',
        emphasis ? 'bg-ink text-paper' : 'bg-paper ring-1 ring-line',
        className
      )}>
      
      <span
        className={cn(
          'grid h-9 w-9 place-items-center rounded-lg',
          emphasis ? 'bg-forest text-ink' : 'bg-forest-soft text-forest-dark'
        )}>
        
        <Icon className="h-[18px] w-[18px]" aria-hidden="true" />
      </span>
      <h3 className={cn('font-semibold tracking-tight', emphasis ? 'mt-auto pt-14 text-3xl' : 'mt-4 text-base')}>
        {feature.title}
      </h3>
      <p className={cn('mt-1.5 leading-relaxed', emphasis ? 'max-w-sm text-base text-paper/75' : 'text-sm text-muted')}>
        {feature.body}
      </p>
      {feature.link &&
      <Link
        to={feature.link.to}
        className="mt-3 inline-flex items-center gap-1.5 self-start rounded text-sm font-semibold text-forest-dark underline decoration-forest/40 underline-offset-4 hover:decoration-forest-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest">
        
          {feature.link.label}
          <ArrowRightIcon className="h-4 w-4" aria-hidden="true" />
        </Link>
      }
    </div>);

}