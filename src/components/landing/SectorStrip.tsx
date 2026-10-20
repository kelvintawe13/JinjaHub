import { Link } from 'react-router-dom';
import { sectors } from '../../data/sectors';

export function SectorStrip() {
  return (
    <section aria-label="Fields you can study" className="border-y border-line">
      <ul className="mx-auto grid max-w-page grid-cols-2 px-4 md:grid-cols-4 md:px-6">
        {sectors.map((sector) => {
          const Icon = sector.icon;
          return (
            <li key={sector.id}>
              <Link
                to={`/courses?cat=${sector.id}`}
                className="group flex items-center gap-3 py-6 pr-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest">
                
                <Icon className="h-5 w-5 shrink-0 text-forest" aria-hidden="true" />
                <span className="min-w-0">
                  <span className="block font-semibold text-ink underline decoration-transparent underline-offset-4 transition-[text-decoration-color] duration-150 group-hover:decoration-ink/40">
                    {sector.label}
                  </span>
                  <span className="hidden text-sm text-muted lg:block">{sector.blurb}</span>
                </span>
              </Link>
            </li>);

        })}
      </ul>
    </section>);

}