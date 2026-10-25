import { BookOpenIcon, CalendarDaysIcon, ClockIcon, LaptopIcon, MessageCircleIcon, UtensilsIcon } from 'lucide-react';
import type { DayAtHub, HubMoment, MomentCategory } from '../types/content';

export const momentCategories: {id: 'all' | MomentCategory;label: string;}[] = [
{ id: 'all', label: 'Everything' },
{ id: 'classes', label: 'Classes' },
{ id: 'field', label: 'Field visits' },
{ id: 'people', label: 'People' },
{ id: 'celebrations', label: 'Celebrations' }];


const IMG = {
  learners: '/aeb18857-193b-4223-899b-f2f4e0f9d12c.jpg',
  farming: '/359dfd95-f80b-45ae-bb0f-97c961f99f80.jpg',
  tourism: '/5eeea6c1-8ae7-46a4-a83b-f31d924b0090.jpg',
  computers: '/7c7d15a3-8718-4b74-a2a4-f082a65f98e0.jpg',
  business: '/50f9787c-eda0-4c68-8017-79ba8af6af4e.jpg'
};

export const hubMoments: HubMoment[] = [
{
  id: 'first-day',
  src: IMG.learners,
  alt: 'Two learners at the hub, one holding a laptop and one holding a seedling',
  caption: 'Day one of the new intake',
  place: 'Courtyard',
  category: 'people',
  likes: 128,
  ratio: 'tall'
},
{
  id: 'maize-plots',
  src: IMG.farming,
  alt: 'A learner taking notes between rows of maize',
  caption: 'Reading a maize plot on a field visit',
  place: 'Kikaramoja plots',
  category: 'field',
  likes: 96,
  ratio: 'wide'
},
{
  id: 'nile-guiding',
  src: IMG.tourism,
  alt: 'A guide pointing the way along the Nile for two visitors',
  caption: 'Guiding practice at the Source of the Nile',
  place: 'Nile riverfront',
  category: 'field',
  likes: 142,
  ratio: 'square'
},
{
  id: 'computer-lab',
  src: IMG.computers,
  alt: 'A mentor helping two learners at a laptop in the computer lab',
  caption: 'An afternoon in the computer lab',
  place: 'Computer lab',
  category: 'classes',
  likes: 118,
  ratio: 'wide'
},
{
  id: 'pitch-day',
  src: IMG.business,
  alt: 'A young business owner serving juice at her stall',
  caption: 'Pitch day at the market',
  place: 'Main Street',
  category: 'celebrations',
  likes: 87,
  ratio: 'square'
},
{
  id: 'poultry-practical',
  src: '/poultry.svg',
  alt: 'A henhouse with two hens and a feed bucket',
  caption: 'The poultry practical',
  place: 'Hub farm',
  category: 'classes',
  likes: 74,
  ratio: 'wide'
},
{
  id: 'front-desk-practice',
  src: '/front-desk.svg',
  alt: 'A reception desk with a bell, laptop and guest book',
  caption: 'Front desk practice',
  place: 'Hospitality room',
  category: 'classes',
  likes: 63,
  ratio: 'square'
},
{
  id: 'one-page-site',
  src: '/digital-marketing.svg',
  alt: 'A phone showing a small business website with a rising chart',
  caption: 'Building a one-page site',
  place: 'Computer lab',
  category: 'classes',
  likes: 81,
  ratio: 'tall'
},
{
  id: 'bookkeeping-clinic',
  src: '/bookkeeping.svg',
  alt: 'A ledger with receipts, a calculator and a pencil',
  caption: 'The Saturday bookkeeping clinic',
  place: 'Quiet room',
  category: 'classes',
  likes: 57,
  ratio: 'wide'
},
{
  id: 'certificate-day',
  src: '/certificate.svg',
  alt: 'A certificate with a gold seal and ribbon',
  caption: 'Certificate day',
  place: 'Courtyard',
  category: 'celebrations',
  likes: 203,
  ratio: 'square'
},
{
  id: 'mentor-check-in',
  src: '/mentor-call.svg',
  alt: 'A phone showing messages from a mentor next to a weekly calendar',
  caption: 'A weekly mentor check-in',
  place: 'Mentor corner',
  category: 'people',
  likes: 69,
  ratio: 'square'
},
{
  id: 'hiring-day',
  src: '/jobs.svg',
  alt: 'A briefcase, a work badge and a paper plane',
  caption: 'Hiring day with local employers',
  place: 'Main hall',
  category: 'people',
  likes: 54,
  ratio: 'wide'
},
{
  id: 'founder',
  src: '/founder-portrait.svg',
  alt: 'Illustrated portrait of Lele Aliga Norah',
  caption: 'Our founder, Lele Aliga Norah',
  place: 'The hub',
  category: 'people',
  likes: 91,
  ratio: 'tall'
},
{
  id: 'module-board',
  src: '/learning-board.svg',
  alt: 'A course board with finished modules and a progress bar',
  caption: 'The module board',
  place: 'Classroom two',
  category: 'classes',
  likes: 48,
  ratio: 'square'
},
{
  id: 'journey-wall',
  src: '/journey.svg',
  alt: 'A dotted path with milestones and a finish flag',
  caption: 'The five-stage journey on the corridor wall',
  place: 'Corridor',
  category: 'people',
  likes: 61,
  ratio: 'wide'
}];


export const dayAtHub: DayAtHub[] = [
{
  id: 'doors',
  time: '8:00',
  title: 'Doors open',
  body: 'Tea in the courtyard and a chance to catch up before the first session.',
  icon: ClockIcon
},
{
  id: 'practical',
  time: '9:00',
  title: 'Practical session',
  body: 'Workshops, the computer lab, the farm plots or a field visit around Jinja.',
  icon: BookOpenIcon
},
{
  id: 'lunch',
  time: '1:00',
  title: 'Lunch together',
  body: 'A hot meal is served for every learner and every mentor. Nobody pays.',
  icon: UtensilsIcon
},
{
  id: 'lab',
  time: '2:00',
  title: 'Afternoon lab',
  body: 'Time on the machines and tablets to practise what the morning covered.',
  icon: LaptopIcon
},
{
  id: 'mentor',
  time: '4:30',
  title: 'Mentor check-in',
  body: 'A short one-to-one about progress, work and whatever else is going on.',
  icon: MessageCircleIcon
},
{
  id: 'saturday',
  time: 'Saturday',
  title: 'Sports and clubs',
  body: 'Football, netball, volleyball, board games and music. Open to every course.',
  icon: CalendarDaysIcon
}];
