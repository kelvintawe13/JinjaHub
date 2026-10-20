import { Link } from 'react-router-dom';
import { ClockIcon } from 'lucide-react';
import { Chip } from '../ui/Chip';
import { ExpandableText } from '../ui/ExpandableText';
import type { Course } from '../../types/content';

export function CourseCard({ course }: {course: Course;}) {
  return (
    <Link
      to={`/courses/${course.slug}`}
      className="group flex h-full flex-col overflow-hidden rounded-2xl bg-paper ring-1 ring-line transition-[box-shadow,transform] duration-200 ease-snappy hover:-translate-y-0.5 hover:shadow-[0_14px_30px_-14px_rgba(27,27,25,0.3)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest">
      
      <div className="aspect-[4/3] overflow-hidden border-b border-line bg-paper">
        <img src={course.image} alt="" className="h-full w-full object-cover" loading="lazy" />
      </div>
      <div className="flex flex-1 flex-col p-5">
        <div className="flex flex-wrap items-center gap-2 text-sm text-muted">
          <Chip tone="forest">{course.categoryLabel}</Chip>
          <span className="inline-flex items-center gap-1">
            <ClockIcon className="h-3.5 w-3.5" aria-hidden="true" />
            {course.duration}
          </span>
        </div>
        <h3 className="mt-3 text-base font-semibold leading-snug">{course.title}</h3>
        <ExpandableText
          text={course.summary}
          lines={3}
          smLines={2}
          className="mt-1.5 text-sm leading-relaxed text-muted"
        />
        <p className="mt-auto border-t border-line pt-4 text-sm">
          <span className="text-muted">Leads to </span>
          <span className="font-medium text-ink">{course.leadsTo[0]}</span>
        </p>
      </div>
    </Link>);

}