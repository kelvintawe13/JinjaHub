import React from 'react';

export function PlaceholderTag({ label = 'Placeholder' }: {label?: string;}) {
  return (
    <span
      title="Replace with real content before launch"
      className="inline-flex items-center rounded-md border border-dashed border-ink/30 px-2 py-0.5 text-xs font-medium text-muted">
      
      {label}
    </span>);

}