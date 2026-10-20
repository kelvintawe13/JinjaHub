import { PartnerLogo } from '../cards/PartnerLogo';
import { SectionHeading } from '../ui/SectionHeading';
import { PlaceholderTag } from '../ui/PlaceholderTag';
import { partnerSlots } from '../../data/stories';

export function PartnersSection() {
  return (
    <section aria-labelledby="partners-title" className="border-y border-line">
      <div className="mx-auto max-w-page px-5 py-16 md:px-8 md:py-20">
        <SectionHeading
          id="partners-title"
          title="Employers who hire our graduates"
          badge={<PlaceholderTag label="Placeholder section" />}
          action={{ label: 'Hire our graduates', to: '/employers' }} />
        
        <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {partnerSlots.map((slot) =>
          <PartnerLogo key={slot} />
          )}
        </div>
      </div>
    </section>);

}