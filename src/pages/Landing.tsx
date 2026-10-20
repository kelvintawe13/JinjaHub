import React from 'react';
import { Hero } from '../components/landing/Hero';
import { SectorStrip } from '../components/landing/SectorStrip';
import { FeatureGrid } from '../components/landing/FeatureGrid';
import { HowItWorksSection } from '../components/landing/HowItWorksSection';
import { CourseShowcase, CourseShowcaseLayout } from '../components/landing/CourseShowcase';
import { StoriesSection } from '../components/landing/StoriesSection';
import { PartnersSection } from '../components/landing/PartnersSection';
import { JobsTeaser } from '../components/landing/JobsTeaser';
import { FaqSection } from '../components/landing/FaqSection';
import { FinalCta } from '../components/landing/FinalCta';

export function Landing({ courseShowcase }: {courseShowcase: CourseShowcaseLayout;}) {
  return (
    <>
      <Hero />
      <SectorStrip />
      <FeatureGrid />
      <HowItWorksSection />
      <CourseShowcase layout={courseShowcase} />
      <StoriesSection />
      <PartnersSection />
      <JobsTeaser />
      <FaqSection />
      <FinalCta />
    </>);

}