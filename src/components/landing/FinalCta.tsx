import { ButtonLink } from '../ui/ButtonLink';
import { Frond } from '../ui/BotanicalMotif';

export function FinalCta() {
  return (
    <section aria-labelledby="cta-title" className="mx-auto max-w-page px-4 py-10 md:px-6 md:py-14">
      <div className="relative overflow-hidden rounded-2xl bg-ink px-7 py-10 text-paper md:flex md:flex-row md:items-center md:justify-between md:px-12 md:py-12">
        <Frond tone="green" className="pointer-events-none absolute -bottom-8 left-6 h-44 w-auto opacity-80" />
        <Frond tone="gold" className="pointer-events-none absolute -right-8 -top-10 h-36 w-auto -scale-y-100 opacity-70" />
        <div className="relative flex flex-col items-start gap-6 md:flex-row md:items-center md:justify-between md:gap-12">
          <div>
            <h2 id="cta-title" className="text-3xl font-semibold tracking-tight md:text-4xl">
              Ready to start earning?
            </h2>
            <p className="mt-2 text-base text-paper/75">Takes about 3 minutes. A mentor calls you within 3 days.</p>
          </div>
          <ButtonLink to="/apply" size="lg" glow className="px-7">
            Apply now
          </ButtonLink>
        </div>
      </div>
    </section>);

}