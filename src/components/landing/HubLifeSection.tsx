import { CalendarDaysIcon, TrophyIcon } from 'lucide-react';
import { Chip } from '../ui/Chip';
import { SectionHeading } from '../ui/SectionHeading';
import { hubPerks, saturdayActivities } from '../../data/hubLife';

export function HubLifeSection() {
  return (
    <section id="hub-life" aria-labelledby="hub-life-title" className="mx-auto max-w-page scroll-mt-16 px-4 py-12 md:px-6 md:py-16">
      <SectionHeading
        id="hub-life-title"
        title="Life at the hub"
        intro="Learning is only part of the day. The hub makes sure you are fed, equipped and part of a team." />
      

      <div className="mt-8 grid gap-4 lg:grid-cols-2">
        <article className="rounded-3xl bg-cream p-6 ring-1 ring-gold/50 md:p-8">
          <Chip tone="forest" className="px-3 py-1">
            On every class day
          </Chip>
          <h3 className="mt-4 text-2xl font-semibold tracking-tight">
            Lunch and devices are on us
          </h3>
          <p className="mt-2 text-base leading-relaxed text-muted">
            Come to the hub and we take care of the rest. You do not need to bring a laptop,
            a tablet or food.
          </p>
          <ul className="mt-6 space-y-4">
            {hubPerks.map(({ id, title, body, icon: Icon }) =>
            <li key={id} className="flex gap-3">
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-forest text-ink">
                  <Icon className="h-[18px] w-[18px]" aria-hidden="true" />
                </span>
                <div>
                  <p className="font-semibold">{title}</p>
                  <p className="mt-0.5 text-sm leading-relaxed text-muted">{body}</p>
                </div>
              </li>
            )}
          </ul>
        </article>

        <article className="flex flex-col rounded-3xl bg-leaf-soft p-6 md:p-8">
          <p className="inline-flex items-center gap-1.5 self-start rounded-full bg-paper px-3 py-1 text-xs font-semibold text-leaf-dark">
            <CalendarDaysIcon className="h-4 w-4" aria-hidden="true" />
            Every Saturday
          </p>
          <h3 className="mt-4 text-2xl font-semibold tracking-tight">
            Sports and recreation
          </h3>
          <p className="mt-2 text-base leading-relaxed text-muted">
            Saturdays are for play. Learners from every course come together for sports and
            recreational activities, then go back to class refreshed the next week.
          </p>
          <ul className="mt-6 flex flex-wrap gap-2">
            {saturdayActivities.map((activity) =>
            <li key={activity}>
                <Chip tone="neutral" className="bg-paper">
                  {activity}
                </Chip>
              </li>
            )}
          </ul>
          <p className="mt-auto flex items-start gap-2 border-t border-leaf/15 pt-5 text-sm leading-relaxed text-ink/80">
            <TrophyIcon className="mt-0.5 h-4 w-4 shrink-0 text-leaf-dark" aria-hidden="true" />
            Free and open to every learner at the hub. Just come in clothes you can move in.
          </p>
        </article>
      </div>
    </section>);

}
