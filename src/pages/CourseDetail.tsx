import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeftIcon, BriefcaseIcon, CalendarDaysIcon, ClockIcon, HandCoinsIcon, MapPinIcon } from 'lucide-react';
import { Chip } from '../components/ui/Chip';
import { ButtonLink } from '../components/ui/ButtonLink';
import { courses } from '../data/courses';
import { NotFound } from './NotFound';

export function CourseDetail() {
  const { course: slug } = useParams();
  const course = courses.find((c) => c.slug === slug);
  if (!course) return <NotFound />;

  const facts = [
  { icon: ClockIcon, label: 'Length', value: course.duration },
  { icon: CalendarDaysIcon, label: 'Schedule', value: course.schedule },
  { icon: MapPinIcon, label: 'Where', value: 'The Edu-Hub, Jinja' },
  { icon: HandCoinsIcon, label: 'Fees', value: 'Confirmed on your mentor call. Fee support available.' }];


  return (
    <div className="mx-auto max-w-6xl px-5 py-10 md:px-8 md:py-14">
      <Link
        to="/courses"
        className="inline-flex items-center gap-1.5 rounded text-sm font-medium text-muted hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest">
        
        <ArrowLeftIcon className="h-4 w-4" aria-hidden="true" />
        All courses
      </Link>

      <div className="mt-6 grid gap-12 lg:grid-cols-[minmax(0,1fr)_360px]">
        <article>
          <Chip tone="forest">{course.categoryLabel}</Chip>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight md:text-4xl">{course.title}</h1>
          <p className="mt-3 max-w-2xl text-lg leading-relaxed text-muted">{course.summary}</p>
          <img src={course.image} alt="" className="mt-10 aspect-[16/9] w-full rounded-3xl object-cover" />

          <section aria-labelledby="leads-title" className="mt-14">
            <h2 id="leads-title" className="text-2xl font-semibold tracking-tight">
              What it leads to
            </h2>
            <ul className="mt-5 grid gap-3 sm:grid-cols-2">
              {course.leadsTo.map((role) =>
              <li key={role} className="flex items-center gap-3 rounded-2xl bg-forest-soft px-4 py-3.5 font-medium text-forest-dark">
                  <BriefcaseIcon className="h-5 w-5 shrink-0" aria-hidden="true" />
                  {role}
                </li>
              )}
            </ul>
          </section>

          <section aria-labelledby="modules-title" className="mt-14">
            <h2 id="modules-title" className="text-2xl font-semibold tracking-tight">
              What you'll learn
            </h2>
            <ol className="mt-5 divide-y divide-line border-y border-line">
              {course.modules.map((module, i) =>
              <li key={module} className="flex items-baseline gap-5 py-4">
                  <span className="w-6 shrink-0 text-sm font-semibold text-muted">{i + 1}</span>
                  <span className="text-base">{module}</span>
                </li>
              )}
            </ol>
          </section>
        </article>

        <aside aria-label="Apply for this course">
          <div className="rounded-3xl bg-paper p-6 ring-1 ring-line lg:sticky lg:top-24">
            <h2 className="text-xl font-semibold">Apply for this course</h2>
            <dl className="mt-5 space-y-4">
              {facts.map(({ icon: Icon, label, value }) =>
              <div key={label} className="flex gap-3">
                  <Icon className="mt-0.5 h-5 w-5 shrink-0 text-forest" aria-hidden="true" />
                  <div>
                    <dt className="text-sm text-muted">{label}</dt>
                    <dd className="font-medium">{value}</dd>
                  </div>
                </div>
              )}
            </dl>
            <ButtonLink to={`/apply?course=${course.slug}`} size="lg" fullWidth className="mt-7">
              Apply now
            </ButtonLink>
            <p className="mt-3 text-center text-sm text-muted">About 3 minutes · No entry exam</p>
          </div>
        </aside>
      </div>
    </div>);

}