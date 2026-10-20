import React from 'react';
import { ClockIcon, MapPinIcon, MessageCircleIcon, PhoneCallIcon, UsersIcon } from 'lucide-react';
import { PartnerLogo } from '../components/cards/PartnerLogo';
import { ButtonLink } from '../components/ui/ButtonLink';
import { PlaceholderTag } from '../components/ui/PlaceholderTag';
import { contact } from '../data/navigation';
import { partnerSlots } from '../data/stories';

const mentorDuties = [
{ icon: PhoneCallIcon, title: 'Calls you first', body: 'Within 3 days of your application, before you have to ask.' },
{ icon: MessageCircleIcon, title: 'Checks in every week', body: 'By SMS or WhatsApp, and straight away if you miss a session.' },
{ icon: UsersIcon, title: 'Stays after the course', body: 'Helps you share your certificate and prepare for interviews.' }];


export function About() {
  return (
    <div className="mx-auto max-w-6xl px-5 py-14 md:px-8 md:py-20">
      <header className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">A place to learn a trade, close to home</h1>
          <p className="mt-3 max-w-xl text-base leading-relaxed text-muted">
            Jinja Edu-Hub is a training centre for young people aged 14 to 21. We teach practical skills in the four fields
            that hire most around Jinja, and pair every learner with a mentor.
          </p>
        </div>
        <dl className="space-y-4 rounded-3xl bg-paper p-6 ring-1 ring-line">
          <div className="flex gap-3">
            <MapPinIcon className="mt-0.5 h-5 w-5 shrink-0 text-forest" aria-hidden="true" />
            <div>
              <dt className="text-sm text-muted">Find us</dt>
              <dd className="font-medium">{contact.address}</dd>
            </div>
          </div>
          <div className="flex gap-3">
            <ClockIcon className="mt-0.5 h-5 w-5 shrink-0 text-forest" aria-hidden="true" />
            <div>
              <dt className="text-sm text-muted">Open</dt>
              <dd className="font-medium">{contact.hours}</dd>
            </div>
          </div>
        </dl>
      </header>

      <section id="mentors" aria-labelledby="mentors-title" className="mt-24 scroll-mt-24">
        <h2 id="mentors-title" className="text-2xl font-semibold tracking-tight md:text-3xl">
          Mentors
        </h2>
        <p className="mt-2 max-w-2xl text-base text-muted">Every learner gets one. Here is what yours will do.</p>
        <ul className="mt-10 grid gap-8 md:grid-cols-3">
          {mentorDuties.map(({ icon: Icon, title, body }) =>
          <li key={title} className="border-t-2 border-forest pt-5">
              <Icon className="h-5 w-5 text-ink" aria-hidden="true" />
              <h3 className="mt-4 text-lg font-semibold">{title}</h3>
              <p className="mt-1.5 leading-relaxed text-muted">{body}</p>
            </li>
          )}
        </ul>
      </section>

      <section aria-labelledby="partners-about-title" className="mt-24">
        <div className="flex flex-wrap items-center gap-3">
          <h2 id="partners-about-title" className="text-2xl font-semibold tracking-tight md:text-3xl">
            Partners
          </h2>
          <PlaceholderTag label="Placeholder section" />
        </div>
        <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {partnerSlots.map((slot) =>
          <PartnerLogo key={slot} />
          )}
        </div>
        <ButtonLink to="/employers" variant="secondary" className="mt-8">
          Become a hiring partner
        </ButtonLink>
      </section>
    </div>);

}