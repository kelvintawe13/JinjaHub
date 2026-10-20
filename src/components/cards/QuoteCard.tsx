import React from 'react';
import type { Story } from '../../types/content';
import { PlaceholderTag } from '../ui/PlaceholderTag';

export function QuoteCard({ story }: {story: Story;}) {
  return (
    <figure className="flex h-full flex-col rounded-3xl bg-paper p-6 ring-1 ring-line md:p-7">
      <blockquote className="text-base leading-relaxed text-ink">“{story.quote}”</blockquote>
      <figcaption className="mt-auto flex items-center gap-3 pt-6">
        <span
          className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-dashed border-ink/30 bg-sand/50 text-sm font-semibold text-muted"
          aria-hidden="true">
          
          {story.initials}
        </span>
        <div className="min-w-0 flex-1">
          <p className="font-semibold">{story.name}</p>
          <p className="text-sm text-muted">{story.detail}</p>
        </div>
        <PlaceholderTag />
      </figcaption>
    </figure>);

}