import { useCallback, useEffect, useRef, useState } from 'react';

/** One-at-a-time toast message with auto-dismiss. */
export function useToast(duration = 2600) {
  const [message, setMessage] = useState<string | null>(null);
  const timer = useRef<number | undefined>(undefined);

  const notify = useCallback(
    (next: string) => {
      setMessage(next);
      window.clearTimeout(timer.current);
      timer.current = window.setTimeout(() => setMessage(null), duration);
    },
    [duration]
  );

  useEffect(() => () => window.clearTimeout(timer.current), []);

  return { message, notify };
}
