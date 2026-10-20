import { QuoteCard } from '../cards/QuoteCard';
import { SectionHeading } from '../ui/SectionHeading';
import { PlaceholderTag } from '../ui/PlaceholderTag';
import { stories } from '../../data/stories';

export function StoriesSection() {
  return (
    <section aria-labelledby="stories-title" className="border-y border-leaf-soft bg-leaf-soft/60">
      <div className="mx-auto max-w-page px-4 py-12 md:px-6 md:py-16">
        <SectionHeading
          id="stories-title"
          title="In their words"
          intro="Real stories from learners will appear here once the first groups finish."
          badge={<PlaceholderTag label="Placeholder section" />}
          action={{ label: 'Find your course', to: '/courses' }} />

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {stories.map((story) =>
          <QuoteCard key={story.id} story={story} />
          )}
        </div>
      </div>
    </section>);

}