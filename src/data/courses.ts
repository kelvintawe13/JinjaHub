import type { Course } from '../types/content';

const IMG = {
  agri: "/359dfd95-f80b-45ae-bb0f-97c961f99f80.jpg",
  tourism: "/5eeea6c1-8ae7-46a4-a83b-f31d924b0090.jpg",
  computers: "/7c7d15a3-8718-4b74-a2a4-f082a65f98e0.jpg",
  business: "/50f9787c-eda0-4c68-8017-79ba8af6af4e.jpg"
};

export const courses: Course[] = [
{
  slug: 'modern-farming',
  title: 'Modern Farming & Agribusiness',
  category: 'agribusiness',
  categoryLabel: 'Agribusiness',
  duration: '12 weeks',
  weeks: 12,
  schedule: '3 mornings a week, plus farm visits',
  summary: 'Grow more from less land, keep simple records and sell at a fair price at the market.',
  leadsTo: ['Farm supervisor', 'Agro-input sales', 'Running your own plot'],
  modules: [
  'Soil, seed and planting calendars',
  'Watering and pest control on a budget',
  'Harvest, storage and reducing losses',
  'Record keeping for a small farm',
  'Pricing and selling at market',
  'Final project: plan a season'],

  image: IMG.agri,
  featured: true
},
{
  slug: 'poultry-business',
  title: 'Poultry Business',
  category: 'agribusiness',
  categoryLabel: 'Agribusiness',
  duration: '8 weeks',
  weeks: 8,
  schedule: '2 mornings a week, plus farm visits',
  summary: 'Raise healthy layers and broilers, and keep the numbers that tell you if you are making money.',
  leadsTo: ['Poultry farm attendant', 'Starting a small flock'],
  modules: ['Housing and feeding', 'Health and vaccination', 'Costs, prices and profit', 'Selling eggs and birds'],
  image: IMG.agri,
  featured: false
},
{
  slug: 'tour-guiding',
  title: 'Tour Guiding on the Nile',
  category: 'tourism',
  categoryLabel: 'Tourism',
  duration: '10 weeks',
  weeks: 10,
  schedule: '3 afternoons a week, plus river trips',
  summary: 'Lead visitors with confidence, tell the story of Jinja and the Nile, and keep every group safe.',
  leadsTo: ['Junior tour guide', 'Activity assistant with river operators'],
  modules: [
  'The history and nature of Jinja',
  'Speaking to groups with confidence',
  'Safety and first aid basics',
  'Customer care and handling complaints',
  'Practical: guide a real tour'],

  image: IMG.tourism,
  featured: true
},
{
  slug: 'hospitality-front-desk',
  title: 'Hospitality & Front Desk',
  category: 'tourism',
  categoryLabel: 'Tourism',
  duration: '8 weeks',
  weeks: 8,
  schedule: '3 mornings a week',
  summary: 'Welcome guests, take bookings and keep a lodge or hotel front desk running smoothly.',
  leadsTo: ['Front desk assistant', 'Guest relations'],
  modules: ['Welcoming guests', 'Bookings and payments', 'Phone and email manners', 'Placement week at a partner lodge'],
  image: IMG.tourism,
  featured: false
},
{
  slug: 'computer-essentials',
  title: 'Computer Essentials',
  category: 'computers',
  categoryLabel: 'Computers',
  duration: '8 weeks',
  weeks: 8,
  schedule: '3 afternoons a week at the hub lab',
  summary: 'From switching on to working fast: typing, documents, spreadsheets, email and staying safe online.',
  leadsTo: ['Data entry clerk', 'Office assistant', 'Cyber café attendant'],
  modules: [
  'Using a computer with confidence',
  'Typing practice',
  'Documents and letters',
  'Spreadsheets for everyday work',
  'Email, internet and online safety'],

  image: IMG.computers,
  featured: true
},
{
  slug: 'digital-marketing',
  title: 'Web & Digital Marketing Basics',
  category: 'computers',
  categoryLabel: 'Computers',
  duration: '12 weeks',
  weeks: 12,
  schedule: '3 afternoons a week at the hub lab',
  summary: 'Help small businesses get found online with social media, simple websites and good photos.',
  leadsTo: ['Social media assistant', 'Freelance digital work'],
  modules: ['Social media for business', 'Taking good product photos', 'Building a one-page website', 'Finding and keeping clients'],
  image: IMG.computers,
  featured: false
},
{
  slug: 'start-your-business',
  title: 'Start Your Business',
  category: 'entrepreneurship',
  categoryLabel: 'Entrepreneurship',
  duration: '10 weeks',
  weeks: 10,
  schedule: '2 afternoons a week',
  summary: 'Turn an idea into a small business that pays: test it, price it, and keep track of every shilling.',
  leadsTo: ['Running your own business', 'The Edu-Hub start-up track'],
  modules: [
  'Finding an idea people will pay for',
  'Testing it cheaply',
  'Pricing and simple bookkeeping',
  'Mobile money and saving',
  'Pitch day'],

  image: IMG.business,
  featured: true
},
{
  slug: 'bookkeeping',
  title: 'Bookkeeping for Small Business',
  category: 'entrepreneurship',
  categoryLabel: 'Entrepreneurship',
  duration: '6 weeks',
  weeks: 6,
  schedule: '2 afternoons a week',
  summary: 'Keep clear records of sales, costs and stock so you always know where your money went.',
  leadsTo: ['Shop or market stall bookkeeper', 'Stronger records for your own business'],
  modules: ['Daily sales records', 'Tracking costs and stock', 'Simple monthly accounts'],
  image: IMG.business,
  featured: false
}];