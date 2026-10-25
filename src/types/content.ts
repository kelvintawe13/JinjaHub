import type { LucideIcon } from 'lucide-react';

export type SectorId = 'agribusiness' | 'tourism' | 'computers' | 'entrepreneurship';

export interface Sector {
  id: SectorId;
  label: string;
  blurb: string;
  icon: LucideIcon;
}

export interface Course {
  slug: string;
  title: string;
  category: SectorId;
  categoryLabel: string;
  duration: string;
  months: number;
  schedule: string;
  summary: string;
  leadsTo: string[];
  modules: string[];
  image: string;
  featured: boolean;
}

export interface Feature {
  id: string;
  title: string;
  body: string;
  icon: LucideIcon;
  emphasis?: boolean;
  link?: {label: string;to: string;};
}

export interface HubPerk {
  id: string;
  title: string;
  body: string;
  icon: LucideIcon;
}

export interface Step {
  id: string;
  title: string;
  body: string;
}

export interface Stage {
  id: string;
  title: string;
  summary: string;
  details: string[];
}

export interface Faq {
  id: string;
  question: string;
  answer: string;
}

export interface Job {
  id: string;
  title: string;
  employer: string;
  location: string;
  type: string;
  course: string;
  courseSlug: string;
}

export interface Story {
  id: string;
  quote: string;
  name: string;
  detail: string;
  initials: string;
  year: string;
  courseSlug: string;
}

export interface NavItem {
  label: string;
  to: string;
}