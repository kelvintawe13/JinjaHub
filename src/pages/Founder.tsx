import { ArrowRightIcon, BriefcaseIcon, GraduationCapIcon, HeartHandshakeIcon, PenLineIcon } from 'lucide-react';
import { ButtonLink } from '../components/ui/ButtonLink';
import { Chip } from '../components/ui/Chip';
import { Frond } from '../components/ui/BotanicalMotif';
import { SectionHeading } from '../components/ui/SectionHeading';

const passions = [
{ icon: GraduationCapIcon, label: 'Education' },
{ icon: HeartHandshakeIcon, label: 'Social entrepreneurship' },
{ icon: PenLineIcon, label: 'Creative writing' }];

const milestones = [
{
  role: 'Strategic Partnerships and Grants Lead',
  org: 'CheckMe',
  stage: 'Current',
  body: 'Leads strategic partnerships and grants, connecting organisations that serve children and women across the continent.'
},
{
  role: 'Partnerships Manager',
  org: 'Watoto Are Tomorrow Foundation',
  stage: 'Earlier',
  body: 'Managed partnerships for a foundation centred on the welfare and future of children.'
},
{
  role: 'Junior Partnerships Associate',
  org: 'Yanibes Foundation',
  stage: 'First steps',
  body: 'Started out in partnerships in the film industry, learning how stories and organisations grow impact together.'
}];


export function Founder() {
  return (
    <div className="mx-auto max-w-page px-4 py-8 md:px-6 md:py-12">
      <header className="grid gap-10 lg:grid-cols-[minmax(0,420px)_minmax(0,1fr)] lg:items-start">
        <div className="relative">
          <div className="relative overflow-hidden rounded-3xl bg-cream ring-1 ring-gold/50">
            <img src="/founder-portrait.svg" alt="Illustrated portrait of Lele Aliga Norah" className="w-full" />
            <div className="bg-forest px-6 py-5 text-ink">
              <p className="text-lg font-semibold">Lele Aliga Norah</p>
              <p className="text-sm text-cream/80">Founder, Jinja Edu-Hub</p>
            </div>
          </div>
        </div>

        <div>
          <Chip tone="forest" className="px-3 py-1">
            Our founder
          </Chip>
          <h1 className="mt-5 text-4xl font-semibold tracking-tight md:text-5xl">Lele Aliga Norah</h1>
          <p className="mt-3 max-w-xl text-lg leading-relaxed text-muted">
            Pan-African advocate for child and women's welfare, currently serving as Strategic Partnerships
            and Grants Lead at CheckMe.
          </p>

          <div className="mt-6 flex flex-wrap gap-2">
            {passions.map(({ icon: Icon, label }) =>
            <Chip key={label} tone="peach" className="px-3.5 py-2 text-sm">
                <Icon className="h-4 w-4" aria-hidden="true" />
                {label}
              </Chip>
            )}
          </div>

          <div className="mt-8 max-w-2xl space-y-4 text-base leading-relaxed">
            <p>
              Jinja Edu-Hub grew out of her conviction that young people who left school early deserve a
              genuine second chance, not a sympathy note. She has a strong passion for education, social
              entrepreneurship and creative writing, and actively contributes to multiple organisations
              committed to driving social change.
            </p>
            <p>
              Her previous experience includes working as a junior partnerships associate at the Yanibes
              Foundation in the film industry, and as partnerships manager at the Watoto Are Tomorrow
              Foundation.
            </p>
          </div>

          <blockquote className="relative mt-8 max-w-2xl overflow-hidden rounded-3xl bg-peach p-6 md:p-7">
            <Frond tone="gold" className="pointer-events-none absolute -bottom-6 right-4 h-28 w-auto opacity-60" />
            <p className="relative text-lg font-medium leading-relaxed text-ink">
              "I aspire to create meaningful impact and foster positive transformation in the lives of others."
            </p>
            <cite className="relative mt-3 block text-sm not-italic text-muted">
              From Lele, on why she started the hub
            </cite>
          </blockquote>

          <div className="mt-8 flex flex-wrap gap-3">
            <ButtonLink to="/about" variant="secondary">
              Our vision and mission
            </ButtonLink>
            <ButtonLink to="/contact" glow>
              Get in touch
              <ArrowRightIcon className="h-4 w-4" aria-hidden="true" />
            </ButtonLink>
          </div>
        </div>
      </header>

      <section aria-labelledby="milestones-title" className="mt-20">
        <SectionHeading
          id="milestones-title"
          title="A path through partnerships"
          intro="The roles that shaped how she brings people and organisations together for learners." />

        <ol className="mt-12">
          {milestones.map((m, i) =>
          <li key={m.org} className="relative grid scroll-mt-24 gap-4 pb-12 pl-14 last:pb-0 md:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] md:gap-10">
              {i < milestones.length - 1 &&
              <span className="absolute bottom-0 left-[15px] top-10 w-px bg-forest/40" aria-hidden="true" />}
              <span className="absolute left-0 top-0 grid h-8 w-8 place-items-center rounded-full bg-forest text-ink">
                <BriefcaseIcon className="h-4 w-4" aria-hidden="true" />
              </span>
              <div>
                <h3 className="text-lg font-semibold tracking-tight">{m.role}</h3>
                <p className="mt-0.5 text-base text-forest-dark">{m.org}</p>
                <Chip tone="sand" className="mt-2">{m.stage}</Chip>
              </div>
              <p className="text-base leading-relaxed text-muted">{m.body}</p>
            </li>
          )}
        </ol>
      </section>
    </div>);

}
