import React from 'react';
import { ButtonLink } from '../components/ui/ButtonLink';

export function NotFound() {
  return (
    <div className="mx-auto flex max-w-xl flex-col items-center px-5 py-28 text-center">
      <h1 className="text-3xl font-semibold tracking-tight">We can't find that page</h1>
      <p className="mt-3 text-base text-muted">The link may be old, or the page has moved.</p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <ButtonLink to="/">Go home</ButtonLink>
        <ButtonLink to="/courses" variant="secondary">
          Browse courses
        </ButtonLink>
      </div>
    </div>);

}