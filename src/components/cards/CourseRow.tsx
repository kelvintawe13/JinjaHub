import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRightIcon } from 'lucide-react';
import type { Course } from '../../types/content';

export function CourseRow({ course }: {course: Course;}) {
  return (
    <Link
      to={`/courses/${course.slug}`}
      className="group grid grid-cols-[128px_1fr_auto] items-center gap-6 rounded-2xl px-3 py-4 transition-colors duration-150 hover:bg-paper focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest">
      
      <img src={course.image} alt="" className="aspect-[4/3] w-32 rounded-xl object-cover" loading="lazy" />
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