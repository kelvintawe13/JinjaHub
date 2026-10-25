import { BookOpenIcon, BriefcaseIcon, CheckIcon, ClipboardListIcon, CompassIcon, SearchIcon } from 'lucide-react';
import { ButtonLink } from '../components/ui/ButtonLink';
import { cn } from '../utils/cn';
import { stages } from '../data/steps';

const stageIcons = [SearchIcon, CompassIcon, ClipboardListIcon, BookOpenIcon, BriefcaseIcon];

export function HowItWorks() {
  return (
    <div className="mx-auto max-w-page px-4 py-8 md:px-6 md:py-12">
      <header className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-12">
        <div className="max-w-2xl">
          <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">How it works</h1>
          <p className="mt-3 text-base leading-relaxed text-muted">
            Five stages from your first look to your first job. A mentor stays with you the whole way,
            and every course is free of charge.
          </p>
        </div>
        <div className="overflow-hidden rounded-3xl ring-1 ring-line">
          <img src="/journey.svg" alt="" className="aspect-[4/3] w-full object-cover lg:aspect-[3/2]" />
        </div>
      </header>

      <ol className="mt-12 grid gap-5 md:grid-cols-2">
        {stages.map((stage, i) => {
          const Icon = stageIcons[i];
          const wide = i === stages.length - 1;
          return (
            <li key={stage.id} id={stage.id} className={cn('scroll-mt-24', wide && 'md:col-span-2')}>
              <div
                className={cn(
                'flex h-full flex-col rounded-3xl p-6 ring-1 md:p-7',
                stage.id === 'apply' ? 'bg-cream ring-gold/50' : 'bg-paper ring-line',
                wide && 'md:col-span-2 md:flex-row md:items-start md:gap-10'
                )}>

                <div className={cn(wide && 'md:w-1/3 md:shrink-0')}>
                  <div className="flex items-center gap-4">
                    <span className="grid h-10 w-10 place-items-center rounded-full bg-ink font-semibold text-paper">
                      {i + 1}
                    </span>
                    <h2 className="text-xl font-semibold tracking-tight">{stage.title}</h2>
                    <span
                      className="ml-auto grid h-10 w-10 place-items-center rounded-xl bg-forest-soft"
                      aria-hidden="true">
                      <Icon className="h-5 w-5 text-forest-dark" />
                    </span>
                  </div>
                  <p className="mt-3 text-base text-muted">{stage.summary}</p>
                </div>

                <ul
                  className={cn(
                  'mt-5 space-y-3 border-t border-line pt-5',
                  wide && 'md:mt-0 md:flex-1 md:border-l md:border-t-0 md:pl-10 md:pt-0'
                  )}>

                  {stage.details.map((d) =>
                  <li key={d} className="flex gap-3 leading-relaxed">
                      <CheckIcon className="mt-1 h-4 w-4 shrink-0 text-forest-dark" aria-hidden="true" />
                      {d}
                    </li>
                  )}
                </ul>
              </div>
            </li>
          );
        })}
      </ol>

      <div className="mt-14 flex flex-col rounded-3xl bg-ink p-6 text-paper sm:flex-row sm:items-center sm:justify-between md:p-8">
        <div>
          <p className="text-xl font-semibold">Ready for stage one?</p>
          <p className="mt-1 text-sm text-paper/70">A short form, about 3 minutes. A mentor calls within 3 days.</p>
        </div>
        <div className="mt-5 flex flex-wrap gap-3 sm:mt-0">
          <ButtonLink to="/courses" variant="secondary">
            Explore courses
          </ButtonLink>
          <ButtonLink to="/apply" glow>
            Apply now
          </ButtonLink>
        </div>
      </div>
    </div>);

}
