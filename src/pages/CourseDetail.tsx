import { Link, useParams } from 'react-router-dom';
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  BriefcaseIcon,
  CalendarDaysIcon,
  CheckIcon,
  ClockIcon,
  HandCoinsIcon,
  MapPinIcon,
  MessageCircleIcon } from
'lucide-react';
import { Chip } from '../components/ui/Chip';
import { ButtonLink } from '../components/ui/ButtonLink';
import { SectionHeading } from '../components/ui/SectionHeading';
import { CourseCard } from '../components/cards/CourseCard';
import { QuoteCard } from '../components/cards/QuoteCard';
import { courses } from '../data/courses';
import { stories } from '../data/stories';
import { cn } from '../utils/cn';
import { NotFound } from './NotFound';

const nextSteps = [
{ title: 'Send the short form', body: 'About 3 minutes. No entry exam, no fee.' },
{ title: 'A mentor calls you', body: 'Within 3 days, to talk through the course and your goals.' },
{ title: 'Visit the hub in Jinja', body: 'See the workshop, meet the class and get your start date.' }];


export function CourseDetail() {
  const { course: slug } = useParams();
  const course = courses.find((c) => c.slug === slug);
  if (!course) return <NotFound />;

  const facts = [
  { icon: ClockIcon, label: 'Length', value: course.duration },
  { icon: CalendarDaysIcon, label: 'Schedule', value: course.schedule },
  { icon: MapPinIcon, label: 'Where', value: 'The Edu-Hub, Jinja' },
  { icon: HandCoinsIcon, label: 'Cost', value: 'Free, certificate included' }];

  const story = stories.find((s) => s.courseSlug === course.slug);
  const related = [
  ...courses.filter((c) => c.category === course.category && c.slug !== course.slug),
  ...courses.filter((c) => c.category !== course.category && c.slug !== course.slug)].
  slice(0, 3);

  return (
    <div className="mx-auto max-w-page px-4 pb-16 pt-6 md:px-6 md:pt-10">
      <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm">
        <Link
          to="/courses"
          className="inline-flex items-center gap-1.5 rounded font-medium text-muted transition-colors duration-150 hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest">
          
          <ArrowLeftIcon className="h-4 w-4" aria-hidden="true" />
          All courses
        </Link>
        <span className="text-line" aria-hidden="true">
          /
        </span>
        <span className="text-muted">{course.categoryLabel}</span>
      </div>

      <header className="mt-6 grid gap-8 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:items-center lg:gap-12">
        <div>
          <div className="flex flex-wrap gap-2">
            <Chip tone="forest">{course.categoryLabel}</Chip>
            <Chip tone="gold">Free of charge</Chip>
            <Chip tone="peach">
              <ClockIcon className="h-3.5 w-3.5" aria-hidden="true" />
              {course.duration}
            </Chip>
          </div>
          <h1 className="mt-4 text-3xl font-semibold tracking-tight md:text-4xl">{course.title}</h1>
          <p className="mt-3 max-w-xl text-lg leading-relaxed text-muted">{course.summary}</p>
          <div className="mt-7 flex flex-wrap items-center gap-3">
            <ButtonLink to={`/apply?course=${course.slug}`} size="lg" glow>
              Apply now
            </ButtonLink>
            <ButtonLink to="/contact" size="lg" variant="secondary">
              Talk to a mentor
            </ButtonLink>
          </div>
          <p className="mt-4 flex items-start gap-2 text-sm text-muted">
            <MessageCircleIcon className="mt-0.5 h-4 w-4 shrink-0 text-forest" aria-hidden="true" />
            A mentor stays with you from the first class to your first job.
          </p>
        </div>

        <div className="overflow-hidden rounded-3xl bg-paper ring-1 ring-line">
          <img src={course.image} alt="" className="aspect-[4/3] h-full w-full object-cover" />
        </div>
      </header>

      <dl className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {facts.map(({ icon: Icon, label, value }) =>
        <div
          key={label}
          className={cn(
            'flex items-start gap-3.5 rounded-2xl p-5 ring-1',
            label === 'Cost' ? 'bg-cream ring-gold/50' : 'bg-paper ring-line'
          )}>
          
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-forest-soft">
              <Icon className="h-5 w-5 text-forest-dark" aria-hidden="true" />
            </span>
            <div className="min-w-0">
              <dt className="text-xs font-semibold uppercase tracking-wide text-muted">{label}</dt>
              <dd className="mt-1 text-base font-medium leading-snug">{value}</dd>
            </div>
          </div>
        )}
      </dl>

      <div className="mt-12 grid gap-10 lg:grid-cols-[minmax(0,1fr)_360px] lg:gap-12">
        <div className="min-w-0 space-y-12">
          <section aria-labelledby="modules-title">
            <div className="flex items-baseline justify-between gap-4 border-b border-line pb-4">
              <h2 id="modules-title" className="text-2xl font-semibold tracking-tight">
                What you'll learn
              </h2>
              <span className="text-sm text-muted">{course.modules.length} modules</span>
            </div>
            <ol className="mt-5 grid gap-3 sm:grid-cols-2">
              {course.modules.map((module, i) => {
                const lastOdd = course.modules.length % 2 === 1 && i === course.modules.length - 1;
                return (
                  <li
                    key={module}
                    className={cn(
                      'flex items-start gap-4 rounded-2xl bg-paper p-5 ring-1 ring-line',
                      lastOdd && 'sm:col-span-2'
                    )}>
                    
                    <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-ink text-sm font-semibold text-paper">
                      {i + 1}
                    </span>
                    <span className="pt-1 text-base font-medium leading-snug">{module}</span>
                  </li>);

              })}
            </ol>
          </section>

          <section aria-labelledby="leads-title">
            <div className="flex items-baseline justify-between gap-4 border-b border-line pb-4">
              <h2 id="leads-title" className="text-2xl font-semibold tracking-tight">
                Where it leads
              </h2>
              <span className="text-sm text-muted">
                {course.leadsTo.length} {course.leadsTo.length === 1 ? 'path' : 'paths'}
              </span>
            </div>
            <ul
              className={cn(
                'mt-5 grid gap-3',
                course.leadsTo.length >= 3 ? 'sm:grid-cols-3' : 'sm:grid-cols-2'
              )}>
              
              {course.leadsTo.map((role) =>
              <li
                key={role}
                className="flex items-start gap-3 rounded-2xl bg-forest-soft p-5 font-medium text-forest-dark">
                
                  <BriefcaseIcon className="mt-0.5 h-5 w-5 shrink-0" aria-hidden="true" />
                  <span className="leading-snug">{role}</span>
                </li>
              )}
            </ul>
            <Link
              to="/jobs"
              className="mt-4 inline-flex items-center gap-1.5 rounded text-sm font-semibold text-forest-dark underline decoration-forest/40 underline-offset-4 hover:decoration-forest-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest">
              
              See jobs our graduates move into
              <ArrowRightIcon className="h-4 w-4" aria-hidden="true" />
            </Link>
          </section>

          {story &&
          <section aria-labelledby="story-title">
              <div className="flex items-baseline justify-between gap-4 border-b border-line pb-4">
                <h2 id="story-title" className="text-2xl font-semibold tracking-tight">
                  From this course
                </h2>
                <span className="text-sm text-muted">Graduate story</span>
              </div>
              <div className="mt-5">
                <QuoteCard story={story} />
              </div>
            </section>
          }
        </div>

        <aside aria-label="Apply for this course" className="lg:sticky lg:top-24 lg:self-start">
          <div className="rounded-3xl bg-ink p-6 text-paper">
            <p className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-forest">
              <CheckIcon className="h-4 w-4" aria-hidden="true" />
              Free of charge
            </p>
            <h2 className="mt-3 text-xl font-semibold tracking-tight">Apply for this course</h2>
            <p className="mt-2 text-sm leading-relaxed text-paper/70">
              A short form, about 3 minutes. No entry exam and no fee.
            </p>
            <ButtonLink to={`/apply?course=${course.slug}`} size="lg" fullWidth glow className="mt-5">
              Apply now
            </ButtonLink>
            <p className="mt-3 text-center text-xs text-paper/60">A mentor calls within 3 days</p>

            <ol className="mt-6 space-y-4 border-t border-paper/15 pt-6">
              {nextSteps.map((step, i) =>
              <li key={step.title} className="flex gap-3">
                  <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-paper/10 text-xs font-semibold">
                    {i + 1}
                  </span>
                  <div>
                    <p className="text-sm font-semibold">{step.title}</p>
                    <p className="mt-0.5 text-sm leading-relaxed text-paper/70">{step.body}</p>
                  </div>
                </li>
              )}
            </ol>
          </div>

          <div className="mt-4 rounded-3xl bg-cream p-6 ring-1 ring-gold/40">
            <h2 className="text-base font-semibold">Still deciding?</h2>
            <p className="mt-1.5 text-sm leading-relaxed text-muted">
              Come to the hub on a weekday morning, sit in on a class and ask current students what it
              is like.
            </p>
            <Link
              to="/contact"
              className="mt-4 inline-flex items-center gap-1.5 rounded text-sm font-semibold text-forest-dark underline decoration-forest/40 underline-offset-4 hover:decoration-forest-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest">
              
              Talk to the hub
              <ArrowRightIcon className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </aside>
      </div>

      <section aria-labelledby="related-title" className="mt-16 border-t border-line pt-10 md:mt-20">
        <SectionHeading
          id="related-title"
          title="More courses to explore"
          intro="Other fields share the same workshops, mentors and employers."
          action={{ label: 'All courses', to: '/courses' }} />
        
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {related.map((c) =>
          <CourseCard key={c.slug} course={c} />
          )}
        </div>
      </section>
    </div>);

}
