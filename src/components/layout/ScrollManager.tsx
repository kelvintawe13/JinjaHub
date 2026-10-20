import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/** Scrolls smoothly to #anchors (the URL keeps the hash) and to the top on page changes. */
export function ScrollManager() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      const id = window.setTimeout(() => {
        document.getElementById(hash.slice(1))?.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' });
      }, 0);
      return () => window.clearTimeout(id);
    }
    window.scrollTo(0, 0);
  }, [pathname, hash]);

  return null;
}