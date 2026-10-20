import { useEffect, useState } from 'react';
import { useCountdown } from './useCountdown';

const MAX_ATTEMPTS = 3;
const LOCK_SECONDS = 60;

/** Tracks wrong-code attempts and applies a short lock after too many. */
export function useCodeAttempts() {
  const [attemptsLeft, setAttemptsLeft] = useState(MAX_ATTEMPTS);
  const [lockUntil, setLockUntil] = useState<number | null>(null);
  const lockRemaining = useCountdown(lockUntil);
  const locked = lockUntil !== null && lockRemaining > 0;

  useEffect(() => {
    if (lockUntil !== null && lockRemaining === 0) {
      setLockUntil(null);
      setAttemptsLeft(MAX_ATTEMPTS);
    }
  }, [lockUntil, lockRemaining]);

  /** Records a wrong attempt. Returns attempts left (0 means now locked). */
  function registerWrong(): number {
    const left = attemptsLeft - 1;
    if (left <= 0) {
      setAttemptsLeft(0);
      setLockUntil(Date.now() + LOCK_SECONDS * 1000);
      return 0;
    }
    setAttemptsLeft(left);
    return left;
  }

  return { attemptsLeft, locked, lockRemaining, registerWrong };
}