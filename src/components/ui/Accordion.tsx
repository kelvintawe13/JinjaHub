import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { PlusIcon } from 'lucide-react';
import { cn } from '../../utils/cn';

interface AccordionItem {
  id: string;
  question: string;
  answer: string;
}

export function Accordion({ items }: {items: AccordionItem[];}) {
  const [openId, setOpenId] = useState<string | null>(items[0]?.id ?? null);

  return (
    <div className="divide-y divide-line border-y border-line">
      {items.map((item) => {
        const open = openId === item.id;
        return (
          <div key={item.id}>
            <h3>
              <button
                type="button"
                id={`${item.id}-trigger`}
                aria-expanded={open}
                aria-controls={`${item.id}-panel`}
                onClick={() => setOpenId(open ? null : item.id)}
                className="flex w-full items-center justify-between gap-6 py-4 text-left text-base font-semibold text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest focus-visible:ring-offset-4 focus-visible:ring-offset-canvas">
                
                {item.question}
                <span
                  className={cn(
                    'grid h-8 w-8 shrink-0 place-items-center rounded-full transition-[transform,background-color] duration-200 ease-snappy',
                    open ? 'rotate-45 bg-ink text-paper' : 'bg-paper text-ink ring-1 ring-line'
                  )}
                  aria-hidden="true">
                  
                  <PlusIcon className="h-4 w-4" />
                </span>
              </button>
            </h3>
            <AnimatePresence initial={false}>
              {open &&
              <motion.div
                id={`${item.id}-panel`}
                role="region"
                aria-labelledby={`${item.id}-trigger`}
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.22, ease: [0.23, 1, 0.32, 1] }}
                className="overflow-hidden">
                
                  <p className="max-w-2xl pb-6 pr-12 leading-relaxed text-muted">{item.answer}</p>
                </motion.div>
              }
            </AnimatePresence>
          </div>);

      })}
    </div>);

}