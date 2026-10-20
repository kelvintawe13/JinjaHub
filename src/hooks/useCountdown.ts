import { useEffect, useState } from 'react';

/** Seconds remaining until `target` (a timestamp), updating live. */
export function useCountdown(target: number | null): number {
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    if (target === null) return;
    setNow(Date.now());
    const id = window.setInterval(() => {
      const t = Date.now();
      setNow(t);
      if (t >= target) window.clearInterval(id);
    }, 250);
    return () => window.clearInterval(id);
  }, [target]);

  if (target === null) return 0;
  return Math.max(0, Math.ceil((target - now) / 1000));
}