import { useState } from 'react';
import { useCountdown } from './useCountdown';

export function useResendTimer(seconds = 30) {
  const [availableAt, setAvailableAt] = useState(() => Date.now() + seconds * 1000);
  const remaining = useCountdown(availableAt);
  return {
    remaining,
    restart: () => setAvailableAt(Date.now() + seconds * 1000)
  };
}