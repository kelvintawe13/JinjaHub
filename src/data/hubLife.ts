import { LaptopIcon, TabletIcon, UtensilsIcon } from 'lucide-react';
import type { HubPerk } from '../types/content';

export const hubPerks: HubPerk[] = [
{
  id: 'lunch',
  title: 'Lunch',
  body: 'A hot lunch is served at the hub on every class day. You do not need to bring food or pay for it.',
  icon: UtensilsIcon
},
{
  id: 'computers',
  title: 'Computers',
  body: 'The computer lab is open for your sessions, so every learner gets a machine to practise on.',
  icon: LaptopIcon
},
{
  id: 'tablets',
  title: 'Tablets',
  body: 'Tablets are shared for practical work, group projects and field visits around Jinja.',
  icon: TabletIcon
}];


export const saturdayActivities = [
'Football',
'Netball',
'Volleyball',
'Board games',
'Music and dance'];

