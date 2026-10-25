import { ClockIcon, MapPinIcon, UsersIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
import { PartnerLogo } from '../components/cards/PartnerLogo';
import { ButtonLink } from '../components/ui/ButtonLink';
import { Chip } from '../components/ui/Chip';
import { Frond } from '../components/ui/BotanicalMotif';
import { PlaceholderTag } from '../components/ui/PlaceholderTag';
import { contact } from '../data/navigation';
import { partnerSlots } from '../data/stories';

const LEARNERS_IMAGE = '/aeb18857-193b-4223-899b-f2f4e0f9d12c.jpg';

const stats = [
{ value: '14 to 21', label: 'Ages we welcome', note: 'No school results needed.', tone: 'bg-forest text-ink' },
{ value: '6–12 months', label: 'Every course', note: 'Sessions that fit around other work.', tone: 'bg-peach text-ink' },
{ value: '70%', label: 'Our employment goal', note: 'Graduates in work and livelihoods.', tone: 'bg-cream text-ink ring-1 ring-gold/50' }];

export function About() {
  return (
    <div className="mx-auto max-w-page px-4 py-8 md:px-6 md:py-12">
      <header className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-12">
        <div>
          <Chip tone="forest" className="px-3 py-1">
            Who we are
          </Chip>
          <h1 className="mt-5 text-4xl font-semibold tracking-tight md:text-5xl">
            A second chance at life, close to home
          </h1>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-muted">
            Jinja Edu-Hub is where school dropouts get a second chance at life. Short courses, tailored
            mentorship and community support turn young people aged 14 to 21 from Kikaramoja and nearby
            areas into productive, progressive Ugandan citizens.
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
            <Chip tone="peach" className="px-3.5 py-2 text-sm">
              <ClockIcon className="h-4 w-4" aria-hidden="true" />
              Every course runs 6–12 months
            </Chip>
            <Chip tone="gold" className="px-3.5 py-2 text-sm">
              Free of charge
            </Chip>
            <Chip tone="forest" className="px-3.5 py-2 text-sm">
              <MapPinIcon className="h-4 w-4" aria-hidden="true" />
              Kikaramoja and beyond
            </Chip>
          </div>
          <p className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted">
            <span className="inline-flex items-center gap-2">
              <MapPinIcon className="h-4 w-4 text-forest" aria-hidden="true" />
              {contact.address}
            </span>
            <span className="inline-flex items-center gap-2">
              <ClockIcon className="h-4 w-4 text-forest" aria-hidden="true" />
              {contact.hours}
            </span>
          </p>
        </div>

        <div className="relative mx-auto w-full max-w-md lg:max-w-none">
          <div className="aspect-[4/5] overflow-hidden rounded-2xl bg-paper ring-1 ring-line lg:aspect-[3/2]">
            <img src={LEARNERS_IMAGE} alt="Two young learners at the Edu-Hub, one with a laptop and one holding a seedling" className="h-full w-full object-cover" />
          </div>

          <div className="absolute left-3 top-8 flex items-center gap-3 rounded-2xl bg-paper p-3 pr-4 shadow-[0_12px_30px_-12px_rgba(27,27,25,0.3)] lg:-left-10">
            <span className="grid h-9 w-9 place-items-center rounded-lg bg-forest text-ink">
              <UsersIcon className="h-[18px] w-[18px]" aria-hidden="true" />
            </span>
            <div>
              <p className="text-sm font-semibold leading-tight">Ages 14 to 21</p>
              <p className="text-xs text-muted">No entry exam</p>
            </div>
          </div>

          <div className="absolute bottom-4 right-3 rounded-2xl bg-paper p-4 shadow-[0_12px_30px_-12px_rgba(27,27,25,0.3)] sm:right-5">
            <p className="text-3xl font-semibold tracking-tight text-forest-dark">70%</p>
            <p className="mt-0.5 max-w-[180px] text-xs leading-snug text-muted">
              of students we aim to see in work and livelihoods
            </p>
          </div>
        </div>
      </header>

      <section aria-label="Jinja Edu-Hub at a glance" className="mt-16 grid gap-4 sm:grid-cols-3">
        {stats.map(({ value, label, note, tone }) =>
        <div key={label} className={`rounded-3xl p-6 md:p-7 ${tone}`}>
            <p className="text-3xl font-semibold tracking-tight md:text-4xl">{value}</p>
            <p className="mt-2 font-medium">{label}</p>
            <p className="mt-1 text-sm opacity-80">{note}</p>
          </div>
        )}
      </section>

      <section aria-labelledby="vision-mission-title" className="mt-16">
        <h2 id="vision-mission-title" className="text-2xl font-semibold tracking-tight md:text-3xl">
          Our vision and mission
        </h2>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <div className="relative min-h-[280px] overflow-hidden rounded-3xl bg-leaf p-7 text-cream md:p-9">
            <Frond tone="cream" className="pointer-events-none absolute -right-6 -top-6 h-44 w-auto opacity-90" />
            <Frond tone="cream" className="pointer-events-none absolute -bottom-10 right-20 h-36 w-auto -scale-y-100 opacity-70" />
            <p className="relative text-xs font-semibold tracking-[0.14em] text-cream/70">OUR VISION</p>
            <p className="relative mt-6 max-w-sm text-3xl font-semibold leading-snug md:text-4xl">
              Second Chances at Life
            </p>
            <p className="relative mt-4 max-w-sm text-sm leading-relaxed text-cream/85">
              A second chance to learn, earn and grow. For every young person who had to leave school early.
            </p>
          </div>
          <div className="flex min-h-[280px] flex-col justify-center rounded-3xl bg-cream p-7 ring-1 ring-gold/50 md:p-9">
            <p className="text-xs font-semibold tracking-[0.14em] text-forest-dark">OUR MISSION</p>
            <p className="mt-5 text-base leading-relaxed">
              To empower underprivileged school dropouts (aged 14 to 21) in Jinja's Kikaramoja with quality,
              technology-enabled and adaptive education that builds local relevance and global competitiveness.
            </p>
            <p className="mt-4 text-base leading-relaxed">
              We aim for at least <strong className="font-semibold text-forest-dark">70% of our students</strong> to
              get employment and sustainable livelihoods, and thus avoid the poverty trap.
            </p>
          </div>
        </div>
      </section>

      <section aria-labelledby="people-title" className="mt-16">
        <h2 id="people-title" className="text-2xl font-semibold tracking-tight md:text-3xl">
          The people behind the hub
        </h2>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <Link
            to="/founder"
            className="group flex items-center gap-5 rounded-3xl bg-cream p-6 ring-1 ring-gold/50 transition-[box-shadow] duration-200 hover:shadow-[0_14px_30px_-14px_rgba(27,27,25,0.3)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest md:p-7">

            <img src="/founder-portrait.svg" alt="" className="h-20 w-20 shrink-0 rounded-full object-cover object-top ring-1 ring-gold/60 sm:h-24 sm:w-24" />
            <div className="min-w-0">
              <p className="font-semibold">Founded by Lele Aliga Norah</p>
              <p className="mt-1 text-sm leading-relaxed text-muted">
                Pan-African advocate for child and women's welfare, and the reason the hub exists.
              </p>
              <p className="mt-2 text-sm font-medium text-forest-dark underline decoration-forest/40 underline-offset-4 transition-[text-decoration-color] group-hover:decoration-forest">
                Meet our founder
              </p>
            </div>
          </Link>

          <Link
            to="/mentors"
            className="group flex items-center gap-5 rounded-3xl bg-forest-soft p-6 transition-[box-shadow] duration-200 hover:shadow-[0_14px_30px_-14px_rgba(27,27,25,0.3)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest md:p-7">

            <span className="grid h-20 w-20 shrink-0 place-items-center rounded-full bg-forest text-ink sm:h-24 sm:w-24">
              <UsersIcon className="h-9 w-9" aria-hidden="true" />
            </span>
            <div className="min-w-0">
              <p className="font-semibold">Every learner gets a mentor</p>
              <p className="mt-1 text-sm leading-relaxed text-muted">
                One person who calls first, checks in every week, and stays after the course.
              </p>
              <p className="mt-2 text-sm font-medium text-forest-dark underline decoration-forest/40 underline-offset-4 transition-[text-decoration-color] group-hover:decoration-forest">
                Meet the mentors
              </p>
            </div>
          </Link>
        </div>
      </section>

      <section aria-labelledby="partners-about-title" className="mt-24">
        <div className="flex flex-wrap items-center gap-3">
          <h2 id="partners-about-title" className="text-2xl font-semibold tracking-tight md:text-3xl">
            Partners
          </h2>
          <PlaceholderTag label="Placeholder section" />
        </div>
        <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {partnerSlots.map((slot) =>
          <PartnerLogo key={slot} />
          )}
        </div>
        <ButtonLink to="/employers" variant="secondary" className="mt-8">
          Become a hiring partner
        </ButtonLink>
      </section>
    </div>);

}
