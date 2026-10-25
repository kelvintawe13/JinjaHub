import type { NavItem } from '../types/content';

export const mainNav: NavItem[] = [
{ label: 'About', to: '/about' },
{ label: 'Courses', to: '/courses' },
{ label: 'How it works', to: '/how-it-works' },
{ label: 'Jobs', to: '/jobs' },
{ label: 'Life at the Hub', to: '/life' }];


export const footerNav: {title: string;links: NavItem[];}[] = [
{
  title: 'Learn',
  links: [
  { label: 'All courses', to: '/courses' },
  { label: 'How it works', to: '/how-it-works' },
  { label: 'Questions', to: '/#faq' }]

},
{
  title: 'Work',
  links: [
  { label: 'Jobs', to: '/jobs' },
  { label: 'Start-up track', to: '/jobs#startup' },
  { label: 'Hire our graduates', to: '/employers' }]

},
{
  title: 'The hub',
  links: [
  { label: 'About', to: '/about' },
  { label: 'Life at the hub', to: '/life' },
  { label: 'Mentors', to: '/mentors' },
  { label: 'Our founder', to: '/founder' },
  { label: 'Contact', to: '/contact' }]

}];


export const learningNav: NavItem[] = [
{ label: 'Overview', to: '/dashboard' },
{ label: 'Learning', to: '/learning' },
{ label: 'Messages', to: '/messages' },
{ label: 'Certificate', to: '/certificate' },
{ label: 'Profile', to: '/profile' }];


export const lastClassOptions = [
{ value: 'none', label: "I didn't finish primary school" },
{ value: 'p7', label: 'Primary 7 (P7)' },
{ value: 's1', label: 'Senior 1 (S1)' },
{ value: 's2', label: 'Senior 2 (S2)' },
{ value: 's3', label: 'Senior 3 (S3)' },
{ value: 's4', label: 'Senior 4 (S4)' },
{ value: 's5', label: 'Senior 5 (S5)' },
{ value: 's6', label: 'Senior 6 (S6)' },
{ value: 'vocational', label: 'Vocational or other' }];


export const contact = {
  phone: '+256 700 000 000',
  email: 'hello@jinjaeduhub.org',
  address: 'Edu-Hub, Main Street, Jinja, Uganda',
  hours: 'Monday to Saturday, 8am to 5pm'
};