import type { Job } from '../types/content';

export const jobs: Job[] = [
{
  id: 'junior-guide',
  title: 'Junior tour guide',
  employer: 'River tour operator',
  location: 'Jinja, Bujagali',
  type: 'Full time · Seasonal',
  course: 'Tour Guiding on the Nile',
  courseSlug: 'tour-guiding'
},
{
  id: 'data-entry',
  title: 'Data entry assistant',
  employer: 'Local SACCO office',
  location: 'Jinja town',
  type: 'Part time',
  course: 'Computer Essentials',
  courseSlug: 'computer-essentials'
},
{
  id: 'farm-supervisor',
  title: 'Farm supervisor trainee',
  employer: 'Mixed farm cooperative',
  location: 'Buwenge',
  type: 'Full time',
  course: 'Modern Farming & Agribusiness',
  courseSlug: 'modern-farming'
}];