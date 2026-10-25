import { CalendarDaysIcon, MapPinIcon } from 'lucide-react';
import { ButtonLink } from '../components/ui/ButtonLink';
import { Chip } from '../components/ui/Chip';
import { SectionHeading } from '../components/ui/SectionHeading';
import { Toast } from '../components/ui/Toast';
import { PageActions } from '../components/hub/PageActions';
import { Gallery } from '../components/hub/Gallery';
import { QuoteCard } from '../components/cards/QuoteCard';
import { useToast } from '../hooks/useToast';
import { dayAtHub } from '../data/hubMoments';
import { hubPerks } from '../data/hubLife';
import { stories } from '../data/stories';
import { contact } from '../data/navigation';
import { cn } from '../utils/cn';

const HERO_IMAGE = '/aeb18857-193b-4223-899b-f2f4e0f9d12c.jpg';
const LAB_IMAGE = '/7c7d15a3-8718-4b74-a2a4-f082a65f98e0.jpg';

const stats = [
{ value: '4 fields', label: 'Agribusiness, tourism, computers and business under one roof.' },
{ value: 'Hot lunch', label: 'Served on every class day, at no cost to the learner.' },
{ value: 'Every Saturday', label: 'Sports, clubs and time to just be young.' },
{ value: 'Free', label: 'No fees, no entry exam, and a certificate at the end.' }];

const perkTones = ['bg-forest-soft', 'bg-cream ring-1 ring-gold/50', 'bg-peach'];

export function HubLife() {
  const { message, notify } = useToast();

  return (
    <div className="mx-auto max-w-page px-4 pb-16 pt-6 md:px-6 md:pt-10">
      <header className="grid gap-10 lg:grid-cols-[1.02fr_0.98fr] lg:items-center">
        <div>
          <Chip tone="forest" className="px-3 py-1">
            Inside the hub
          </Chip>
          <h1 className="mt-5 text-4xl font-semibold tracking-tight md:text-5xl">
            Life at the hub
          </h1>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-muted">
            Learning is only part of the day. Between practicals, lunch, sports and the people around
            you, the hub becomes a second home for learners from every field.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <ButtonLink to="/courses" size="lg" glow>
              Explore courses
            </ButtonLink>
            <ButtonLink to="/contact" size="lg" variant="secondary">
              Book a visit
            </ButtonLink>
          </div>
          <p className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-muted">
            <span className="inline-flex items-center gap-2">
              <MapPinIcon className="h-4 w-4 text-forest" aria-hidden="true" />
              {contact.address}
            </span>
            <span className="inline-flex items-center gap-2">
              <CalendarDaysIcon className="h-4 w-4 text-forest" aria-hidden="true" />
              Monday to Saturday
            </span>
          </p>
        </div>

        <div className="relative mx-auto w-full max-w-md pb-10 pl-6 lg:max-w-none lg:pl-12">
          <div className="overflow-hidden rounded-3xl bg-paper ring-1 ring-line">
            <img
              src={HERO_IMAGE}
              alt="Two learners at the Edu-Hub, one holding a laptop and one holding a seedling"
              className="aspect-[4/5] w-full object-cover" />
            
          </div>

          <div className="absolute bottom-0 left-0 w-36 overflow-hidden rounded-2xl bg-paper p-1.5 shadow-[0_16px_36px_-16px_rgba(27,27,25,0.4)] ring-1 ring-line sm:w-44">
            <img
              src={LAB_IMAGE}
              alt="A mentor helping two learners in the computer lab"
              className="aspect-square w-full rounded-xl object-cover" />
            
          </div>

          <div className="absolute left-8 top-6 inline-flex items-center gap-2 rounded-full bg-paper/95 px-3.5 py-2 text-xs font-semibold shadow-sm ring-1 ring-line backdrop-blur">
            <CalendarDaysIcon className="h-4 w-4 text-forest" aria-hidden="true" />
            Saturdays: sports and clubs
          </div>
        </div>
      </header>

      <PageActions onNotify={notify} />

      <section
        aria-label="Life at the hub at a glance"
        className="mt-10 overflow-hidden rounded-3xl bg-line ring-1 ring-line">
        
        <ul className="grid gap-px sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) =>
          <li key={stat.value} className="bg-paper p-5 md:p-6">
              <p className="text-2xl font-semibold tracking-tight md:text-3xl">{stat.value}</p>
              <p className="mt-2 text-sm leading-relaxed text-muted">{stat.label}</p>
            </li>
          )}
        </ul>
      </section>

      <section aria-labelledby="day-title" className="mt-16">
        <SectionHeading
          id="day-title"
          title="A day at the hub"
          intro="Classes end, but the day does not. Here is what a typical weekday looks like." />
        
        <ol className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {dayAtHub.map(({ id, time, title, body, icon: Icon }) =>
          <li key={id} className="flex gap-4 rounded-2xl bg-paper p-5 ring-1 ring-line">
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-forest-soft">
                <Icon className="h-5 w-5 text-forest-dark" aria-hidden="true" />
              </span>
              <div className="min-w-0">
                <p className="text-xs font-semibold uppercase tracking-[0.12em] text-forest-dark">
                  {time}
                </p>
                <h3 className="mt-1 text-base font-semibold">{title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-muted">{body}</p>
              </div>
            </li>
          )}
        </ol>
      </section>

      <section aria-labelledby="inside-title" className="mt-16">
        <SectionHeading
          id="inside-title"
          title="What's inside"
          intro="The basics that make it possible to show up, focus and stay the whole day."
          action={{ label: 'See the gallery', to: '/life#gallery' }} />
        
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {hubPerks.map(({ id, title, body, icon: Icon }, index) =>
          <article key={id} className={cn('rounded-3xl p-6 md:p-7', perkTones[index % perkTones.length])}>
              <div className="flex items-start justify-between gap-4">
                <span className="grid h-11 w-11 place-items-center rounded-2xl bg-paper/80 text-forest-dark">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <span className="text-xs font-semibold tabular-nums tracking-[0.14em] text-ink/30">
                  {String(index + 1).padStart(2, '0')}
                </span>
              </div>
              <h3 className="mt-5 text-lg font-semibold tracking-tight">{title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-ink/70">{body}</p>
            </article>
          )}
        </div>
      </section>

      <section id="gallery" aria-labelledby="gallery-title" className="mt-16 scroll-mt-24">
        <SectionHeading
          id="gallery-title"
          title="Moments at the hub"
          intro="Lessons, field visits, celebrations and the people who make the place. Like, share or open any moment."
          badge={
          <Chip tone="gold" className="px-3 py-1">
              Photo wall
            </Chip>
          } />
        
        <Gallery onNotify={notify} />
      </section>

      <section aria-labelledby="voices-title" className="mt-16">
        <SectionHeading
          id="voices-title"
          title="In their own words"
          intro="Graduates on what the hub gave them, in their own words."
          action={{ label: 'All courses', to: '/courses' }} />
        
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {stories.map((story, index) =>
          <QuoteCard key={story.id} story={story} featured={index === 0} />
          )}
        </div>
      </section>

      <div className="mt-16 flex flex-col rounded-3xl bg-ink p-6 text-paper sm:flex-row sm:items-center sm:justify-between md:p-8">
        <div>
          <p className="text-xl font-semibold">Come and see it for yourself</p>
          <p className="mt-1 max-w-md text-sm text-paper/70">
            Drop in on a weekday morning, sit in on a class and stay for lunch. No appointment needed.
          </p>
        </div>
        <div className="mt-5 flex flex-wrap gap-3 sm:mt-0">
          <ButtonLink to="/courses" variant="secondary">
            Find a course
          </ButtonLink>
          <ButtonLink to="/contact" glow>
            Book a visit
          </ButtonLink>
        </div>
      </div>

      <Toast message={message} />
    </div>);

}
