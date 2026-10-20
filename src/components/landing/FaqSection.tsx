import React from 'react';
import { Link } from 'react-router-dom';
import { Accordion } from '../ui/Accordion';
import { faqs } from '../../data/faqs';

export function FaqSection() {
  return (
    <section id="faq" aria-labelledby="faq-title" className="scroll-mt-16 bg-sand/40">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-20 md:px-8 md:py-28 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
        <div>
          <h2 id="faq-title" className="text-2xl font-semibold tracking-tight md:text-3xl">
            Questions people ask first
          </h2>
          <p className="mt-3 text-base leading-relaxed text-muted">
            Something else on your mind?{' '}
            <Link to="/contact" className="font-semibold text-ink underline decoration-ink/25 underline-offset-4 hover:decoration-ink">
              Ask us directly
            </Link>
            .
          </p>
        </div>
        <Accordion items={faqs} />
      </div>
    </section>);

}