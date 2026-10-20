import { Link } from 'react-router-dom';
import { ArrowUpRightIcon } from 'lucide-react';
import type { Course } from '../../types/content';

export function CourseRow({ course }: {course: Course;}) {
  return (
    <Link
      to={`/courses/${course.slug}`}
      className="group grid grid-cols-[88px_minmax(0,1fr)_auto] items-center gap-3 rounded-2xl px-2 py-4 transition-colors duration-150 hover:bg-paper focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest md:grid-cols-[128px_1fr_auto] md:gap-6 md:px-3">

      <img src={course.image} alt="" className="aspect-[4/3] w-24 rounded-xl object-cover md:w-32" loading="lazy" />
      <div className="grid items-center gap-8 lg:grid-cols-[1.1fr_1fr]">
        <div>
          <p className="text-sm text-muted">
            {course.categoryLabel} · {course.duration}
          </p>
          <h3 className="mt-0.5 text-lg font-semibold tracking-tight">{course.title}</h3>
        </div>
        <p className="text-sm leading-relaxed">
          <span className="text-muted">Leads to </span>
          {course.leadsTo.join(', ')}
        </p>
      </div>
      <span className="grid h-11 w-11 place-items-center rounded-full bg-paper text-ink ring-1 ring-line transition-colors duration-150 group-hover:bg-forest group-hover:text-ink group-hover:ring-forest">
        <ArrowUpRightIcon className="h-5 w-5" aria-hidden="true" />
      </span>
    </Link>);

}