import { Link } from 'react-router-dom';
import { ArrowRightIcon, CheckIcon, QuoteIcon } from 'lucide-react';
import { cn } from '../../utils/cn';
import type { Story } from '../../types/content';

export function QuoteCard({ story, featured = false }: {story: Story;featured?: boolean;}) {
  return (
    <figure
      className={cn(
        'flex h-full flex-col rounded-3xl p-6 md:p-7',
        featured ? 'bg-ink text-paper' : 'bg-paper ring-1 ring-line'
      )}>
      
      <div className="flex items-start justify-between gap-4">
        <QuoteIcon
          className={cn('shrink-0 text-forest', featured ? 'h-8 w-8' : 'h-6 w-6')}
          aria-hidden="true" />
        
        <span
          className={cn(
            'inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold',
            featured ? 'bg-paper/10 text-paper' : 'bg-forest-soft text-forest-dark'
          )}>
          
          <CheckIcon className="h-3.5 w-3.5" aria-hidden="true" />
          Graduate
        </span>
      </div>

      <blockquote
        className={cn(
          'mt-5 flex-1 leading-relaxed',
          featured ?
          'text-xl font-medium tracking-tight text-paper md:text-2xl md:leading-relaxed' :
          'text-base text-ink'
        )}>
        
        “{story.quote}”
      </blockquote>

      <figcaption
        className={cn(
          'mt-6 border-t pt-5',
          featured ? 'border-paper/15' : 'border-line'
        )}>
        
        <div className="flex items-center gap-3">
          <span
            className={cn(
              'grid h-11 w-11 shrink-0 place-items-center rounded-full text-sm font-semibold',
              featured ? 'bg-forest text-ink' : 'bg-forest-soft text-forest-dark'
            )}
            aria-hidden="true">
            
            {story.initials}
          </span>
          <div className="min-w-0">
            <p className="font-semibold">{story.name}</p>
            <p className={cn('text-sm', featured ? 'text-paper/65' : 'text-muted')}>
              {story.detail} · {story.year}
            </p>
          </div>
        </div>
        <Link
          to={`/courses/${story.courseSlug}`}
          aria-label={`Read about ${story.detail}`}
          className={cn(
            'mt-4 inline-flex items-center gap-1.5 rounded text-sm font-semibold underline underline-offset-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest',
            featured ?
            'text-forest decoration-forest/50 hover:decoration-forest' :
            'text-forest-dark decoration-forest/40 hover:decoration-forest-dark'
          )}>
          
          Read about the course
          <ArrowRightIcon className="h-4 w-4" aria-hidden="true" />
        </Link>
      </figcaption>
    </figure>);

}
