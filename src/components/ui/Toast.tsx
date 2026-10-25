import { AnimatePresence, motion } from 'framer-motion';
import { CheckIcon } from 'lucide-react';

export function Toast({ message }: {message: string | null;}) {
  return (
    <div
      aria-live="polite"
      className="pointer-events-none fixed inset-x-0 bottom-6 z-[60] flex justify-center px-4">
      
      <AnimatePresence>
        {message &&
        <motion.div
          key={message}
          role="status"
          initial={{ opacity: 0, y: 12, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 8, scale: 0.98 }}
          transition={{ duration: 0.2, ease: [0.23, 1, 0.32, 1] }}
          className="flex items-center gap-2 rounded-full bg-ink px-4 py-2.5 text-sm font-medium text-paper shadow-[0_16px_40px_-12px_rgba(27,27,25,0.5)]">
          
            <CheckIcon className="h-4 w-4 text-forest" aria-hidden="true" />
            {message}
          </motion.div>
        }
      </AnimatePresence>
    </div>);

}
