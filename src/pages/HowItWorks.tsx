import { CheckIcon } from 'lucide-react';
import { ButtonLink } from '../components/ui/ButtonLink';
import { stages } from '../data/steps';

export function HowItWorks() {
  return (
    <div className="mx-auto max-w-page px-5 py-14 md:px-8 md:py-20">
      <header className="max-w-2xl">
        <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">How it works</h1>
        <p className="mt-3 text-base leading-relaxed text-muted">
          Five stages from your first look to your first job. A mentor stays with you the whole way.
        </p>
      </header>

      <ol className="mt-14">
        {stages.map((stage, i) =>
        <li key={stage.id} id={stage.id} className="relative grid scroll-mt-24 gap-4 pb-14 pl-16 last:pb-0 md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] md:gap-12">
            {i < stages.length - 1 && <span className="absolute bottom-0 left-[21px] top-12 w-px bg-ink/15" aria-hidden="true" />}
            <span className="absolute left-0 top-0 grid h-11 w-11 place-items-center rounded-full bg-ink font-semibold text-paper">{i + 1}</span>
            <div className="pt-1.5">
              <h2 className="text-xl font-semibold tracking-tight">{stage.title}</h2>
              <p className="mt-1 text-base text-muted">{stage.summary}</p>
            </div>
            <ul className="space-y-3 md:pt-2">
              {stage.details.map((d) =>
            <li key={d} className="flex gap-3 leading-relaxed">
                  <CheckIcon className="mt-1 h-4 w-4 shrink-0 text-forest-dark" aria-hidden="true" />
                  {d}
                </li>
            )}
            </ul>
          </li>
        )}
      </ol>

      <div className="mt-20 flex flex-col items-start gap-4 border-t border-line pt-10 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xl font-semibold">Ready for stage one?</p>
        <div className="flex flex-wrap gap-3">
          <ButtonLink to="/courses" variant="secondary">
            Explore courses
          </ButtonLink>
          <ButtonLink to="/apply" glow>Apply now</ButtonLink>
        </div>
      </div>
    </div>);

}