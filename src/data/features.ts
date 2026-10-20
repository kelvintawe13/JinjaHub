import { AwardIcon, BarChart3Icon, HandCoinsIcon, MessageCircleIcon, DoorOpenIcon } from 'lucide-react';
import type { Feature } from '../types/content';

export const features: Feature[] = [
{
  id: 'mentor',
  title: 'A mentor who messages first',
  body: "You won't have to chase anyone. Your mentor calls within 3 days of applying, then checks in every week by SMS or WhatsApp, through the course and into your first job.",
  icon: MessageCircleIcon,
  emphasis: true
},
{
  id: 'progress',
  title: 'Progress you can see',
  body: 'Every module you finish shows on your page, so you and your mentor always know where you stand.',
  icon: BarChart3Icon
},
{
  id: 'fees',
  title: 'Help with fees',
  body: "Tick one box on the application. Cost never decides who gets in. We'll talk through what you can pay.",
  icon: HandCoinsIcon
},
{
  id: 'exam',
  title: 'No entry exam',
  body: "If you're 14 to 21 and ready to learn, you can join. No test, no past results needed.",
  icon: DoorOpenIcon,
  link: { label: 'Apply in 3 minutes', to: '/apply' }
},
{
  id: 'certificate',
  title: 'A certificate you can share',
  body: 'Finish a course and get a certificate with a link employers can open and check.',
  icon: AwardIcon
}];