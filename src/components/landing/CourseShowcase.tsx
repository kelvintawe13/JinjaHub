import React from 'react';
import { CourseCard } from '../cards/CourseCard';
import { CourseRow } from '../cards/CourseRow';
import { SectionHeading } from '../ui/SectionHeading';
import { courses } from '../../data/courses';
import { cn } from '../../utils/cn';

export type CourseShowcaseLayout = 'rows' | 'cards';

export function CourseShowcase({ layout }: {layout: CourseShowcaseLayout;}) {
  const featured = courses.filter((c) => c.featured);

  return (
    <section id="courses" aria-labelledby="courses-title" className="mx-auto max-w-6xl scroll-mt-16 px-5 py-20 md:px-8 md:py-28">
      <SectionHeading
        id="courses-title"
        title="One course in each field"
        intro="Every course shows how long it takes and the work it leads to."
        action={{ label: `See all ${courses.length} courses`, to: '/courses' }} />
      
      {layout === 'rows' &&
      <div className="mt-10 hidden divide-y divide-line border-y border-line md:block">
          {featured.map((course) =>
        <CourseRow key={course.slug} course={course} />
        )}
        </div>
      }
      <div className={cn('mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4', layout === 'rows' && 'md:hidden')}>
        {featured.map((course) =>
        <CourseCard key={course.slug} course={course} />
        )}
      </div>
    </section>);

}