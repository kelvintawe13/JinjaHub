import { CalendarDaysIcon, CheckIcon } from 'lucide-react';
import { Chip } from '../ui/Chip';
import { SectionHeading } from '../ui/SectionHeading';
import { hubPerks, saturdayActivities, saturdayDetails } from '../../data/hubLife';

export function HubLifeSection() {
  return (
    <section id="hub-life" aria-labelledby="hub-life-title" className="mx-auto max-w-page scroll-mt-16 px-4 py-12 md:px-6 md:py-16">
      <SectionHeading
        id="hub-life-title"
        title="Life at the hub"
        intro="Learning is only part of the day. We make sure you are fed, equipped and part of a team."
        action={{ label: 'Step inside the hub', to: '/life' }}
        badge={<Chip tone="forest" className="px-3 py-1">Inside the hub</Chip>} />
      

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {hubPerks.map(({ id, title, body, icon: Icon }, index) =>
        <article
          key={id}
          className="flex flex-col rounded-3xl bg-paper p-6 ring-1 ring-line md:p-7">
          
            <div className="flex items-start justify-between gap-4">
              <span className="grid h-11 w-11 place-items-center rounded-2xl bg-forest-soft text-forest-dark">
                <Icon className="h-5 w-5" aria-hidden="true" />
              </span>
              <span className="text-xs font-semibold tabular-nums tracking-[0.14em] text-ink/30">
                {String(index + 1).padStart(2, '0')}
              </span>
            </div>
            <h3 className="mt-5 text-lg font-semibold tracking-tight">{title}</h3>
            <p className="mt-1.5 text-sm leading-relaxed text-muted">{body}</p>
          </article>
        )}
      </div>

      <article className="relative mt-4 overflow-hidden rounded-3xl bg-leaf text-cream">
        <span
          className="pointer-events-none absolute -right-16 -top-20 h-64 w-64 rounded-full border border-cream/15"
          aria-hidden="true" />
        
        <span
          className="pointer-events-none absolute -bottom-24 right-32 h-72 w-72 rounded-full border border-cream/10"
          aria-hidden="true" />
        

        <div className="relative grid gap-8 p-6 md:p-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-center lg:gap-12">
          <div>
            <p className="inline-flex items-center gap-1.5 rounded-full border border-cream/25 bg-cream/10 px-3 py-1 text-xs font-semibold text-cream">
              <CalendarDaysIcon className="h-4 w-4" aria-hidden="true" />
              Every Saturday
            </p>
            <h3 className="mt-4 text-2xl font-semibold tracking-tight md:text-3xl">
              Sports and recreation
            </h3>
            <p className="mt-3 max-w-xl text-base leading-relaxed text-cream/85">
              Saturdays are for play. Learners from every course come together for sports and
              recreational activities, then go back to class refreshed the next week.
            </p>
            <ul aria-label="Saturday activities" className="mt-6 flex flex-wrap gap-2">
              {saturdayActivities.map((activity) =>
              <li
                key={activity}
                className="rounded-full border border-cream/25 bg-cream/10 px-3 py-1.5 text-xs font-semibold text-cream">
                
                  {activity}
                </li>
              )}
            </ul>
          </div>

          <div className="rounded-2xl border border-cream/20 bg-leaf-dark/40 p-5 md:p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-cream/80">
              Good to know
            </p>
            <ul className="mt-4 space-y-3.5">
              {saturdayDetails.map((detail) =>
              <li key={detail} className="flex gap-3 text-sm leading-relaxed text-cream/90">
                  <CheckIcon className="mt-0.5 h-4 w-4 shrink-0 text-peach" aria-hidden="true" />
                  {detail}
                </li>
              )}
            </ul>
          </div>
        </div>
      </article>
    </section>);

}
