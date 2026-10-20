import { RocketIcon } from 'lucide-react';
import { JobCard } from '../cards/JobCard';
import { SectionHeading } from '../ui/SectionHeading';
import { ButtonLink } from '../ui/ButtonLink';
import { jobs } from '../../data/jobs';

export function JobsTeaser() {
  return (
    <section aria-labelledby="jobs-title" className="mx-auto max-w-page px-5 py-20 md:px-8 md:py-28">
      <SectionHeading
        id="jobs-title"
        title="Where courses lead"
        intro="Openings from employers around Jinja, or a track to start something of your own."
        action={{ label: 'See all jobs', to: '/jobs' }} />
      
      <div className="mt-12 grid gap-4 lg:grid-cols-3">
        {jobs.slice(0, 2).map((job) =>
        <JobCard key={job.id} job={job} />
        )}
        <article className="flex flex-col rounded-2xl bg-ink p-6 text-paper">
          <span className="grid h-9 w-9 place-items-center rounded-lg bg-forest text-ink">
            <RocketIcon className="h-[18px] w-[18px]" aria-hidden="true" />
          </span>
          <h3 className="mt-4 text-lg font-semibold">The start-up track</h3>
          <p className="mb-6 mt-1.5 text-sm leading-relaxed text-paper/75">
            Coaching, a business plan and a pitch day for graduates who want to work for themselves.
          </p>
          <ButtonLink to="/jobs#startup" variant="primary" className="mt-auto self-start" size="sm">
            How the track works
          </ButtonLink>
        </article>
      </div>
    </section>);

}