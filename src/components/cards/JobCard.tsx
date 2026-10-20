import { Link } from 'react-router-dom';
import { BriefcaseIcon, MapPinIcon } from 'lucide-react';
import type { Job } from '../../types/content';
import { PlaceholderTag } from '../ui/PlaceholderTag';

export function JobCard({ job }: {job: Job;}) {
  return (
    <article className="flex h-full flex-col rounded-2xl bg-paper p-5 ring-1 ring-line">
      <div className="flex items-start justify-between gap-3">
        <h3 className="text-base font-semibold leading-snug">{job.title}</h3>
        <PlaceholderTag label="Sample" />
      </div>
      <p className="mt-1 text-sm text-muted">{job.employer}</p>
      <ul className="mt-4 flex flex-wrap gap-x-4 gap-y-1.5 text-sm text-muted">
        <li className="inline-flex items-center gap-1.5">
          <MapPinIcon className="h-4 w-4" aria-hidden="true" />
          {job.location}
        </li>
        <li className="inline-flex items-center gap-1.5">
          <BriefcaseIcon className="h-4 w-4" aria-hidden="true" />
          {job.type}
        </li>
      </ul>
      <p className="mt-auto border-t border-line pt-4 text-sm">
        <span className="text-muted">Trained by </span>
        <Link to={`/courses/${job.courseSlug}`} className="font-medium text-ink underline decoration-ink/25 underline-offset-4 hover:decoration-ink">
          {job.course}
        </Link>
      </p>
    </article>);

}