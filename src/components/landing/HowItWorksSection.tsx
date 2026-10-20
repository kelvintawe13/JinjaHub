import { StepCard } from '../cards/StepCard';
import { SectionHeading } from '../ui/SectionHeading';
import { landingSteps } from '../../data/steps';

export function HowItWorksSection() {
  return (
    <section id="how" aria-labelledby="how-title" className="scroll-mt-16 bg-sand/40">
      <div className="mx-auto max-w-page px-5 py-20 md:px-8 md:py-28">
        <SectionHeading
          id="how-title"
          title="From first look to first job"
          intro="Four steps. Most people go from applying to their first class in about two weeks."
          action={{ label: 'See the full journey', to: '/how-it-works' }} />
        
        <ol className="relative mt-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          <span className="absolute left-0 right-0 top-[18px] hidden h-px bg-ink/15 lg:block" aria-hidden="true" />
          {landingSteps.map((step, i) =>
          <StepCard key={step.id} step={step} index={i} />
          )}
        </ol>
      </div>
    </section>);

}