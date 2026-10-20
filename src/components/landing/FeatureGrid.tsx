import React from 'react';
import { FeatureTile } from '../cards/FeatureTile';
import { SectionHeading } from '../ui/SectionHeading';
import { features } from '../../data/features';

export function FeatureGrid() {
  return (
    <section aria-labelledby="why-title" className="mx-auto max-w-6xl scroll-mt-20 px-5 py-20 md:px-8 md:py-28">
      <SectionHeading id="why-title" title="Why learners stay" intro="Everything here is designed so you keep going, even when life gets in the way." />
      <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3 lg:grid-rows-2">
        {features.map((feature) =>
        <FeatureTile key={feature.id} feature={feature} className={feature.emphasis ? 'md:col-span-2 lg:col-span-1 lg:row-span-2' : undefined} />
        )}
      </div>
    </section>);

}