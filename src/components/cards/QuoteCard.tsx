import { Link } from 'react-router-dom';
import { ArrowRightIcon, QuoteIcon } from 'lucide-react';
import type { Story } from '../../types/content';

export function QuoteCard({ story }: {story: Story;}) {
  return (
    <figure className="flex h-full flex-col rounded-3xl bg-paper p-6 ring-1 ring-line md:p-7">
      <QuoteIcon className="h-7 w-7 text-forest" aria-hidden="true" />
      <blockquote className="mt-4 flex-1 text-base leading-relaxed text-ink">
        “{story.quote}”
      </blockquote>
      <figcaption className="mt-6 border-t border-line pt-5">
        <div className="flex items-center gap-3">
          <span
            className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-forest-soft text-sm font-semibold text-forest-dark"
            aria-hidden="true">
            
            {story.initials}
          </span>
          <div className="min-w-0">
            <p className="font-semibold">{story.name}</p>
            <p className="text-sm text-muted">
              {story.detail} · {story.year}
            </p>
          </div>
        </div>
        <Link
          to={`/courses/${story.courseSlug}`}
          className="mt-4 inline-flex items-center gap-1.5 rounded text-sm font-semibold text-forest-dark underline decoration-forest/40 underline-offset-4 hover:decoration-forest-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest">
          
          Read about the course
          <ArrowRightIcon className="h-4 w-4" aria-hidden="true" />
        </Link>
      </figcaption>
    </figure>);

}
