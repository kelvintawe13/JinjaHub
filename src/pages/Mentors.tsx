import { ButtonLink } from '../components/ui/ButtonLink';
import { Chip } from '../components/ui/Chip';
import { MessageCircleIcon, PhoneCallIcon, UsersIcon } from 'lucide-react';

const mentorDuties = [
{ icon: PhoneCallIcon, title: 'Calls you first', body: 'Within 3 days of your application, before you have to ask.' },
{ icon: MessageCircleIcon, title: 'Checks in every week', body: 'By SMS or WhatsApp, and straight away if you miss a session.' },
{ icon: UsersIcon, title: 'Stays after the course', body: 'Helps you share your certificate and prepare for interviews.' }];

const weekToWeek = [
'A phone call within 3 days of your application, before your first class.',
'Help choosing a course, if you are still unsure what fits you.',
'A fee support conversation, when cost could stop you.',
'Weekly check-ins by SMS or WhatsApp through the whole course.',
'Certificate sharing and interview preparation once you finish.'];

export function Mentors() {
  return (
    <div className="mx-auto max-w-page px-4 py-8 md:px-6 md:py-12">
      <header className="max-w-2xl">
        <Chip tone="forest" className="px-3 py-1">
          Your person
        </Chip>
        <h1 className="mt-5 text-3xl font-semibold tracking-tight md:text-4xl">
          A mentor beside you, all the way
        </h1>
        <p className="mt-4 text-base leading-relaxed text-muted">
          From your first call to your first job, one mentor stays with you the whole way. Every learner gets
          one. Here is what yours will do.
        </p>
      </header>

      <ul className="mt-14 grid gap-8 md:grid-cols-3">
        {mentorDuties.map(({ icon: Icon, title, body }) =>
        <li key={title} className="rounded-3xl bg-forest-soft p-6">
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-forest text-ink">
              <Icon className="h-5 w-5" aria-hidden="true" />
            </span>
            <h2 className="mt-4 text-lg font-semibold">{title}</h2>
            <p className="mt-1.5 leading-relaxed text-muted">{body}</p>
          </li>
        )}
      </ul>

      <section aria-labelledby="weekly-title" className="mt-20 grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
        <div>
          <h2 id="weekly-title" className="text-2xl font-semibold tracking-tight md:text-3xl">
            Week to week
          </h2>
          <ul className="mt-6 space-y-3">
            {weekToWeek.map((item) =>
            <li key={item} className="flex gap-3 leading-relaxed">
                <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-forest" aria-hidden="true" />
                {item}
              </li>
            )}
          </ul>
        </div>

        <div className="rounded-3xl bg-cream p-6 ring-1 ring-gold/50 md:p-8">
          <p className="text-xs font-semibold tracking-[0.14em] text-forest-dark">WHAT A CHECK-IN LOOKS LIKE</p>
          <div className="mt-4 rounded-2xl rounded-bl-md bg-paper p-4 shadow-sm ring-1 ring-line">
            <p className="text-base leading-relaxed">
              “How did today's farm visit go? Call me if anything was unclear.”
            </p>
            <p className="mt-2 text-xs text-muted">Your mentor, a Tuesday afternoon</p>
          </div>
          <p className="mt-4 text-sm leading-relaxed text-muted">
            Short, regular and real. Your mentor messages first, so you never have to chase anyone.
          </p>
        </div>
      </section>

      <div className="mt-20 flex flex-col items-start gap-4 border-t border-line pt-10 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xl font-semibold">Ready to meet yours?</p>
        <div className="flex flex-wrap gap-3">
          <ButtonLink to="/courses" variant="secondary">
            Explore courses
          </ButtonLink>
          <ButtonLink to="/apply" glow>Apply now</ButtonLink>
        </div>
      </div>
    </div>);

}
