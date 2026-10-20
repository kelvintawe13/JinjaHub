import React, { useEffect, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { MenuIcon, XIcon } from 'lucide-react';
import { Logo } from '../ui/Logo';
import { ButtonLink } from '../ui/ButtonLink';
import { mainNav } from '../../data/navigation';
import { useAuth } from '../../hooks/useAuth';
import { cn } from '../../utils/cn';

export function Navbar() {
  const { user } = useAuth();
  const [open, setOpen] = useState(false);
  const location = useLocation();

  useEffect(() => setOpen(false), [location.pathname, location.hash]);

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-canvas/95 backdrop-blur">
      <nav aria-label="Main" className="mx-auto flex h-14 max-w-6xl items-center justify-between gap-6 px-5 md:px-8">
        <Logo />
        <ul className="hidden items-center gap-1 md:flex">
          {mainNav.map((item) =>
          <li key={item.to}>
              <NavLink
              to={item.to}
              className={({ isActive }) =>
              cn(
                'whitespace-nowrap rounded-lg px-3 py-2 text-sm font-medium transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest',
                isActive && !item.to.includes('#') ? 'text-ink' : 'text-muted hover:text-ink'
              )
              }>
              
                {item.label}
              </NavLink>
            </li>
          )}
        </ul>
        <div className="hidden items-center gap-2 md:flex">
          {user ?
          <ButtonLink to="/dashboard" size="sm">
              My learning space
            </ButtonLink> :

          <>
              <ButtonLink to="/sign-in" variant="ghost" size="sm">
                Sign in
              </ButtonLink>
              <ButtonLink to="/sign-up" size="sm">
                Get started
              </ButtonLink>
            </>
          }
        </div>
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? 'Close menu' : 'Open menu'}
          className="grid h-10 w-10 place-items-center rounded-lg text-ink hover:bg-ink/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest md:hidden">
          
          {open ? <XIcon className="h-5 w-5" /> : <MenuIcon className="h-5 w-5" />}
        </button>
      </nav>
      <AnimatePresence>
        {open &&
        <motion.div
          id="mobile-menu"
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.2, ease: [0.23, 1, 0.32, 1] }}
          className="border-t border-line bg-canvas px-5 pb-6 pt-2 md:hidden">
          
            <ul className="divide-y divide-line">
              {mainNav.map((item) =>
            <li key={item.to}>
                  <NavLink to={item.to} className="block py-3 text-base font-medium text-ink">
                    {item.label}
                  </NavLink>
                </li>
            )}
            </ul>
            <div className="mt-4 grid grid-cols-2 gap-3">
              {user ?
            <ButtonLink to="/dashboard" className="col-span-2">
                  My learning space
                </ButtonLink> :

            <>
                  <ButtonLink to="/sign-in" variant="secondary">
                    Sign in
                  </ButtonLink>
                  <ButtonLink to="/sign-up">Get started</ButtonLink>
                </>
            }
            </div>
          </motion.div>
        }
      </AnimatePresence>
    </header>);

}