import { QuoteCard } from '../cards/QuoteCard';
import { SectionHeading } from '../ui/SectionHeading';
import { stories } from '../../data/stories';

export function StoriesSection() {
  const [featured, ...supporting] = stories;

  return (
    <section aria-labelledby="stories-title" className="border-y border-leaf-soft bg-leaf-soft/60">
      <div className="mx-auto max-w-page px-4 py-12 md:px-6 md:py-16">
        <SectionHeading
          id="stories-title"
          title="Student testimonies"
          intro="Graduates on what changed for them at the hub, and what they are doing now."
          action={{ label: 'Find your course', to: '/courses' }} />
        

        <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <QuoteCard story={featured} featured />
          </div>
          <div className="grid gap-4 lg:col-span-5">
            {supporting.map((story) =>
            <QuoteCard key={story.id} story={story} />
            )}
          </div>
        </div>

        <p className="mt-6 border-t border-leaf/15 pt-5 text-sm text-muted">
          Every testimony comes from a graduate of a hub course, and every learner leaves with a
          mentor, a certificate and a route into work.
        </p>
      </div>
    </section>);

}
