import { QuoteCard } from '../cards/QuoteCard';
import { SectionHeading } from '../ui/SectionHeading';
import { stories } from '../../data/stories';

export function StoriesSection() {
  return (
    <section aria-labelledby="stories-title" className="border-y border-leaf-soft bg-leaf-soft/60">
      <div className="mx-auto max-w-page px-4 py-12 md:px-6 md:py-16">
        <SectionHeading
          id="stories-title"
          title="Student testimonies"
          intro="Graduates on what changed for them at the hub, and what they are doing now."
          action={{ label: 'Find your course', to: '/courses' }} />
        

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {stories.map((story) =>
          <QuoteCard key={story.id} story={story} />
          )}
        </div>

        <p className="mt-6 text-sm text-muted">
          Every learner gets a mentor, a certificate and a route into work.
        </p>
      </div>
    </section>);

}
