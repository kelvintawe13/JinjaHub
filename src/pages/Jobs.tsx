import { JobCard } from '../components/cards/JobCard';
import { ButtonLink } from '../components/ui/ButtonLink';
import { PlaceholderTag } from '../components/ui/PlaceholderTag';
import { jobs } from '../data/jobs';

const trackSteps = [
{ title: 'Shape your idea', body: 'Weekly coaching to test your idea with real customers before you spend money.' },
{ title: 'Build a simple plan', body: 'Costs, prices and a first-month target you can actually track.' },
{ title: 'Pitch day', body: 'Present to local business owners for feedback and introductions.' }];


export function Jobs() {
  return (
    <div className="mx-auto max-w-page px-4 py-8 md:px-6 md:py-12">
      <header className="max-w-2xl">
        <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">Jobs and the start-up track</h1>
        <p className="mt-3 text-base leading-relaxed text-muted">
          Openings from employers around Jinja who hire our graduates, and support for those who want to work for themselves.
        </p>
      </header>

      <section aria-labelledby="openings-title" className="mt-14">
        <div className="flex items-center gap-3">
          <h2 id="openings-title" className="text-2xl font-semibold tracking-tight">
            Openings
          </h2>
          <PlaceholderTag label="Sample openings" />
        </div>
        <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {jobs.map((job) =>
          <JobCard key={job.id} job={job} />
          )}
        </div>
      </section>

      <section id="startup" aria-labelledby="startup-title" className="mt-20 scroll-mt-24 rounded-2xl bg-ink px-6 py-10 text-paper md:px-10 md:py-12">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <h2 id="startup-title" className="text-2xl font-semibold tracking-tight md:text-3xl">
              The start-up track
            </h2>
            <p className="mt-3 text-base leading-relaxed text-paper/75">
              Open to any graduate. Most join after Start Your Business, but any course counts.
            </p>
            <ButtonLink to="/courses/start-your-business" glow className="mt-6">
              See Start Your Business
            </ButtonLink>
          </div>
          <ol className="divide-y divide-paper/10 border-y border-paper/10">
            {trackSteps.map((s, i) =>
            <li key={s.title} className="flex gap-5 py-5">
                <span className="text-sm font-semibold text-forest">{i + 1}</span>
                <div>
                  <h3 className="font-semibold">{s.title}</h3>
                  <p className="mt-1 text-paper/75">{s.body}</p>
                </div>
              </li>
            )}
          </ol>
        </div>
      </section>
    </div>);

}