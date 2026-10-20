import { MapIcon, MonitorIcon, SproutIcon, StoreIcon } from 'lucide-react';
import type { Sector } from '../types/content';

export const sectors: Sector[] = [
{ id: 'agribusiness', label: 'Agribusiness', blurb: 'Farming, poultry and selling what you grow', icon: SproutIcon },
{ id: 'tourism', label: 'Tourism', blurb: 'Guiding and hospitality along the Nile', icon: MapIcon },
{ id: 'computers', label: 'Computers', blurb: 'Digital skills for office and online work', icon: MonitorIcon },
{ id: 'entrepreneurship', label: 'Entrepreneurship', blurb: 'Starting and running a small business', icon: StoreIcon }];