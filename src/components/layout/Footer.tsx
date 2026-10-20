import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { GlobeIcon, MailIcon, MapPinIcon, PhoneIcon } from 'lucide-react';
import { Logo } from '../ui/Logo';
import { contact, footerNav } from '../../data/navigation';

const languages = ['English', 'Luganda', 'Lusoga'];

export function Footer() {
  const [language, setLanguage] = useState('English');

  return (
    <footer className="bg-ink text-paper/75">
      <div className="mx-auto grid max-w-6xl gap-12 px-5 py-16 md:px-8 lg:grid-cols-[1.3fr_2fr]">
        <div>
          <Logo tone="light" />
          <p className="mt-4 max-w-xs text-sm leading-relaxed">Practical skills and a mentor for young people aged 14 to 21 in Jinja.</p>
          <ul className="mt-6 space-y-2.5 text-sm">
            <li className="flex items-center gap-2.5">
              <PhoneIcon className="h-4 w-4 text-forest" aria-hidden="true" />
              <a href={`tel:${contact.phone.replace(/\s/g, '')}`} className="hover:text-paper">
                {contact.phone}
              </a>
            </li>
            <li className="flex items-center gap-2.5">
              <MailIcon className="h-4 w-4 text-forest" aria-hidden="true" />
              <a href={`mailto:${contact.email}`} className="hover:text-paper">
                {contact.email}
              </a>
            </li>
            <li className="flex items-center gap-2.5">
              <MapPinIcon className="h-4 w-4 text-forest" aria-hidden="true" />
              {contact.address}
            </li>
          </ul>
        </div>
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
          {footerNav.map((group) =>
          <nav key={group.title} aria-label={group.title}>
              <h2 className="text-sm font-semibold text-paper">{group.title}</h2>
              <ul className="mt-4 space-y-2.5 text-sm">
                {group.links.map((link) =>
              <li key={link.to}>
                    <Link to={link.to} className="transition-colors duration-150 hover:text-paper">
                      {link.label}
                    </Link>
                  </li>
              )}
              </ul>
            </nav>
          )}
        </div>
      </div>
      <div className="border-t border-paper/10">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-5 py-6 text-sm md:flex-row md:items-center md:justify-between md:px-8">
          <p>© 2026 Jinja Edu-Hub</p>
          <label className="flex items-center gap-2">
            <GlobeIcon className="h-4 w-4" aria-hidden="true" />
            <span className="sr-only">Language</span>
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="rounded-lg border border-paper/20 bg-transparent px-2.5 py-1.5 text-paper focus:outline-none focus-visible:ring-2 focus-visible:ring-forest">
              
              {languages.map((l) =>
              <option key={l} value={l} className="text-ink">
                  {l}
                </option>
              )}
            </select>
          </label>
        </div>
      </div>
    </footer>);

}