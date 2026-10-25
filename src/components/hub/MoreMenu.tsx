import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { MoreHorizontalIcon } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { cn } from '../../utils/cn';

export interface MenuAction {
  label: string;
  icon: LucideIcon;
  onSelect?: () => void;
  href?: string;
}

interface MoreMenuProps {
  actions: MenuAction[];
  /** Text label beside the icon. Omit for an icon-only trigger. */
  label?: string;
  ariaLabel?: string;
  align?: 'left' | 'right';
  buttonClassName?: string;
}

const itemClasses =
'inline-flex w-full items-center gap-2.5 rounded-lg px-2.5 py-2 text-left text-sm font-medium text-ink transition-colors duration-150 hover:bg-sand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest';

export function MoreMenu({
  actions,
  label,
  ariaLabel = 'More options',
  align = 'right',
  buttonClassName
}: MoreMenuProps) {
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;

    function onPointerDown(event: MouseEvent) {
      if (!wrapRef.current?.contains(event.target as Node)) setOpen(false);
    }
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') setOpen(false);
    }

    document.addEventListener('mousedown', onPointerDown);
    document.addEventListener('keydown', onKeyDown);
    const frame = window.requestAnimationFrame(() => {
      menuRef.current?.querySelector<HTMLButtonElement | HTMLAnchorElement>('[role="menuitem"]')?.focus();
    });

    return () => {
      document.removeEventListener('mousedown', onPointerDown);
      document.removeEventListener('keydown', onKeyDown);
      window.cancelAnimationFrame(frame);
    };
  }, [open]);

  return (
    <div ref={wrapRef} className="relative">
      <button
        type="button"
        aria-haspopup="menu"
        aria-expanded={open}
        aria-label={label ? undefined : ariaLabel}
        onClick={() => setOpen((v) => !v)}
        className={cn(
          'inline-flex items-center justify-center gap-1.5 rounded-full text-sm font-semibold transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest focus-visible:ring-offset-2 focus-visible:ring-offset-canvas',
          label ? 'min-h-10 px-3.5' : 'h-9 w-9',
          buttonClassName ?? 'bg-sand text-ink hover:bg-sand-dark'
        )}>
        
        <MoreHorizontalIcon className="h-4 w-4" aria-hidden="true" />
        {label}
      </button>

      <AnimatePresence>
        {open &&
        <motion.div
          ref={menuRef}
          role="menu"
          aria-label={ariaLabel}
          initial={{ opacity: 0, y: 4, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 2, scale: 0.99 }}
          transition={{ duration: 0.16, ease: [0.23, 1, 0.32, 1] }}
          className={cn(
            'absolute z-30 mt-2 w-52 rounded-2xl bg-paper p-1.5 shadow-[0_20px_45px_-18px_rgba(27,27,25,0.45)] ring-1 ring-line',
            align === 'right' ? 'right-0' : 'left-0'
          )}>
          
            {actions.map(({ label: actionLabel, icon: Icon, onSelect, href }) =>
          href ?
          <a
            key={actionLabel}
            role="menuitem"
            href={href}
            target="_blank"
            rel="noreferrer"
            onClick={() => setOpen(false)}
            className={itemClasses}>
            
                <Icon className="h-4 w-4 shrink-0 text-muted" aria-hidden="true" />
                {actionLabel}
              </a> :

          <button
            key={actionLabel}
            type="button"
            role="menuitem"
            onClick={() => {
              setOpen(false);
              onSelect?.();
            }}
            className={itemClasses}>
            
                <Icon className="h-4 w-4 shrink-0 text-muted" aria-hidden="true" />
                {actionLabel}
              </button>
          )}
          </motion.div>
        }
      </AnimatePresence>
    </div>);

}
