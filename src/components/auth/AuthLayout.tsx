import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeftIcon, CheckIcon } from 'lucide-react';
import { Logo } from '../ui/Logo';

interface AuthLayoutProps {
  title: string;
  subtitle?: React.ReactNode;
  children: React.ReactNode;
  footer?: React.ReactNode;
}

const promises = ['No entry exam', 'Fee support if you need it', 'A certificate you can share'];

export function AuthLayout({ title, subtitle, children, footer }: AuthLayoutProps) {
  return (
    <div className="min-h-screen w-full bg-canvas lg:grid lg:grid-cols-[minmax(0,1fr)_minmax(0,0.75fr)]">
      <div className="flex min-h-screen flex-col px-5 py-5 sm:px-10 lg:px-14">
        <header className="flex items-center justify-between gap-4">
          <Logo />
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 whitespace-nowrap rounded-md text-sm font-medium text-muted transition-colors duration-150 hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest">
            
            <ArrowLeftIcon className="h-4 w-4" aria-hidden="true" />
            Back to site
          </Link>
        </header>
        <main className="flex flex-1 items-center py-10 md:py-12">
          <div className="mx-auto w-full max-w-[400px]">
            <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">{title}</h1>
            {subtitle && <div className="mt-2 text-base leading-relaxed text-muted">{subtitle}</div>}
            <div className="mt-8">{children}</div>
            {footer && <div className="mt-7 text-sm text-muted">{footer}</div>}
          </div>
        </main>
      </div>
      <aside className="hidden p-3 lg:block" aria-label="Why Edu-Hub">
        <div className="sticky top-3 flex h-[calc(100vh-1.5rem)] flex-col justify-between rounded-2xl bg-ink p-10 text-paper">
          <span className="h-1.5 w-10 rounded-full bg-forest" aria-hidden="true" />
          <div>
            <p className="max-w-sm text-3xl font-semibold leading-tight tracking-tight">
              A mentor calls you within <span className="text-forest">3 days</span> of applying.
            </p>
            <ul className="mt-6 space-y-2.5 text-sm text-paper/75">
              {promises.map((p) =>
              <li key={p} className="flex items-center gap-2.5">
                  <CheckIcon className="h-4 w-4 text-forest" aria-hidden="true" />
                  {p}
                </li>
              )}
            </ul>
          </div>
        </div>
      </aside>
    </div>);

}