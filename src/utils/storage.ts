export function readStored<T>(key: string): T | null {
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? JSON.parse(raw) as T : null;
  } catch {
    return null;
  }
}

export function writeStored<T>(key: string, value: T | null): void {
  try {
    if (value === null || value === undefined) window.localStorage.removeItem(key);else
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {

    // Storage can be unavailable (private mode); the prototype keeps working in memory.
  }}