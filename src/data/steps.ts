import type { Stage, Step } from '../types/content';

export const landingSteps: Step[] = [
{ id: 'discover', title: 'Discover', body: 'Look through four fields and see where each course leads before you choose.' },
{ id: 'choose', title: 'Choose', body: 'Pick a course that fits your time. Most run two or three sessions a week.' },
{ id: 'apply', title: 'Apply', body: 'A short form, about 3 minutes. No exam. We secure your course and a mentor calls within 3 days.' },
{ id: 'hired', title: 'Get hired', body: 'Finish, share your certificate, and we connect you with openings or the start-up track.' }];


export const stages: Stage[] = [
{
  id: 'discover',
  title: 'Discover',
  summary: 'See what each field is really like before you commit.',
  details: [
  'Browse courses in agribusiness, tourism, computers and entrepreneurship.',
  'Every course page shows how long it takes and the jobs it leads to.',
  'Visit the hub any weekday to look around and ask questions.']

},
{
  id: 'choose',
  title: 'Choose',
  summary: 'Pick a course that fits your days and your goals.',
  details: [
  'Courses run mornings or afternoons so you can keep other work or school.',
  'Not sure yet? Leave the course blank on your application and your mentor will help you decide.']

},
{
  id: 'apply',
  title: 'Apply, secure your course and meet your mentor',
  summary: 'Three steps in one, and a real person guides you through all of them.',
  details: [
  'Apply: a short form, about 3 minutes. Share your name, age, phone and the last class you completed. No exam.',
  'Secure your course: we confirm your seat and your sessions. Tick "I need help paying fees" if cost could stop you.',
  'Meet your mentor: a mentor calls within 3 days, then you come for a short orientation at the hub.']

},
{
  id: 'learn',
  title: 'Learn at the hub',
  summary: 'Hands-on sessions with progress you can see.',
  details: [
  'Practical classes in small groups, with field trips and placements.',
  'Your learning space shows each module as you finish it.',
  'Your mentor checks in every week and messages first if you miss a session.']

},
{
  id: 'hired',
  title: 'Get hired or start up',
  summary: 'Turn your certificate into work.',
  details: [
  'Share your certificate link with employers.',
  'We connect you with openings from partner employers in and around Jinja.',
  'Want to run your own thing? Join the start-up track for coaching and a pitch day.']

}];