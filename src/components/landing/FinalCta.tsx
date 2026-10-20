import { ButtonLink } from '../ui/ButtonLink';

export function FinalCta() {
  return (
    <section aria-labelledby="cta-title" className="mx-auto max-w-page px-5 py-16 md:px-8 md:py-20">
      <div className="flex flex-col items-start gap-6 rounded-2xl bg-ink px-7 py-10 text-paper md:flex-row md:items-center md:justify-between md:px-12 md:py-12">
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
    </section>);

}