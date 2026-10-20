import React, { useEffect, useRef, useState } from 'react';
import { ChevronDownIcon, ChevronUpIcon } from 'lucide-react';
import { cn } from '../../utils/cn';

interface ExpandableTextProps {
  /** Long text that will be clamped, with a Show more / Show less toggle. */
  text: string;
  /** Collapsed line count on screens >= md (768px). Defaults to 3. */
  lines?: number;
  /** Collapsed line count below md. Falls back to `lines`. */
  smLines?: number;
  /** Classes applied to the text element itself. */
  className?: string;
}

/**
 * Clamps long text to a limited line count and reveals the rest through a
 * "Show more" / "Show less" toggle (helps especially on narrow mobile screens).
 * The toggle only renders when the text actually overflows the clamp limit.
 */
export function ExpandableText({
  text,
  lines = 3,
  smLines,
  className,
}: ExpandableTextProps) {
  const textRef = useRef<HTMLParagraphElement>(null);
  const [expanded, setExpanded] = useState(false);
  const [overflows, setOverflows] = useState(false);
  const [isMd, setIsMd] = useState(false);

  // Track md break to switch the collapsed line limit responsively.
  useEffect(() => {
    const query = window.matchMedia('(min-width: 768px)');
    const onChange = (event: MediaQueryListEvent) => setIsMd(event.matches);
    setIsMd(query.matches);
    query.addEventListener('change', onChange);
    return () => query.removeEventListener('change', onChange);
  }, []);

  const limit = isMd ? lines : (smLines ?? lines);

  // Detect overflow only while collapsed; latched so the toggle stays visible
  // once the text has been expanded (it then shows "Show less").
  useEffect(() => {
    if (expanded) return;
    const element = textRef.current;
    if (!element) return;
    setOverflows(element.scrollHeight > element.clientHeight + 1);
  }, [expanded, limit, text]);

  return (
    <>
      <p
        ref={textRef}
        className={cn(!expanded && 'clamp-text', className)}
        style={!expanded ? ({ '--clamp-lines': limit } as React.CSSProperties) : undefined}>
        {text}
      </p>
      {overflows && (
        <button
          type="button"
          aria-expanded={expanded}
          onClick={(event) => {
            event.preventDefault();
            event.stopPropagation();
            setExpanded((current) => !current);
          }}
          className={cn(
            'mt-1 inline-flex items-center gap-1 text-sm font-medium text-forest',
            'underline decoration-forest/40 underline-offset-4 hover:decoration-forest',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest rounded-lg'
          )}>
          {expanded ? (
            <>
              Show less
              <ChevronUpIcon className="h-3.5 w-3.5" aria-hidden="true" />
            </>
          ) : (
            <>
              Show more
              <ChevronDownIcon className="h-3.5 w-3.5" aria-hidden="true" />
            </>
          )}
        </button>
      )}
    </>
  );
}
