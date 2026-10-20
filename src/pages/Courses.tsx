import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ClockIcon, SearchXIcon } from 'lucide-react';
import { CourseCard } from '../components/cards/CourseCard';
import { Chip } from '../components/ui/Chip';
import { Button } from '../components/ui/Button';
import { courses } from '../data/courses';
import { sectors } from '../data/sectors';
import type { SectorId } from '../types/content';

type LengthFilter = 'all' | 'short' | 'long';

const lengthOptions: {value: LengthFilter;label: string;}[] = [
{ value: 'all', label: 'Any length' },
{ value: 'short', label: 'Up to 8 months' },
{ value: 'long', label: '9–12 months' }];


export function Courses() {
  const [params, setParams] = useSearchParams();
  const [length, setLength] = useState<LengthFilter>('all');
  const rawCat = params.get('cat');
  const cat = sectors.some((s) => s.id === rawCat) ? rawCat as SectorId : null;

  const results = courses.filter(
    (c) =>
    (!cat || c.category === cat) && (
    length === 'all' || (length === 'short' ? c.months <= 8 : c.months > 8))
  );

  function setCategory(id: SectorId | null) {
    const next = new URLSearchParams(params);
    if (id) next.set('cat', id);else
    next.delete('cat');
    setParams(next, { replace: true });
  }

  function clearFilters() {
    setCategory(null);
    setLength('all');
  }

  return (
    <div className="mx-auto max-w-page px-4 py-8 md:px-6 md:py-12">
      <header className="max-w-2xl">
        <div className="flex flex-wrap gap-2">
          <Chip tone="peach" className="px-3.5 py-1.5 text-sm">
            <ClockIcon className="h-4 w-4" aria-hidden="true" />
            Every course runs 6–12 months
          </Chip>
          <Chip tone="gold" className="px-3.5 py-1.5 text-sm">
            Free of charge
          </Chip>
        </div>
        <h1 className="mt-4 text-3xl font-semibold tracking-tight md:text-4xl">All courses</h1>
        <p className="mt-3 text-base leading-relaxed text-muted">
          Practical courses of 6 to 12 months, with sessions that fit around other work. Each one is free of charge and shows the work it leads to. None of them need an entry exam.
        </p>
      </header>

      <div className="mt-10 flex flex-col gap-4 border-y border-line py-5 lg:flex-row lg:items-center lg:justify-between">
        <div role="group" aria-label="Field" className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 lg:mx-0 lg:px-0 lg:pb-0">
          <Chip selected={!cat} onClick={() => setCategory(null)}>
            All fields
          </Chip>
          {sectors.map((s) =>
          <Chip key={s.id} selected={cat === s.id} onClick={() => setCategory(s.id)}>
              {s.label}
            </Chip>
          )}
        </div>
        <div role="group" aria-label="Course length" className="-mx-4 flex gap-2 overflow-x-auto px-4 lg:mx-0 lg:px-0">
          {lengthOptions.map((o) =>
          <Chip key={o.value} selected={length === o.value} onClick={() => setLength(o.value)}>
              {o.label}
            </Chip>
          )}
        </div>
      </div>

      <p className="mt-6 text-sm text-muted" aria-live="polite">
        {results.length} {results.length === 1 ? 'course' : 'courses'}
      </p>

      {results.length > 0 ?
      <div className="mt-4 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {results.map((course) =>
        <CourseCard key={course.slug} course={course} />
        )}
        </div> :

      <div className="mt-4 flex flex-col items-center rounded-3xl bg-paper px-6 py-10 text-center ring-1 ring-line">
          <SearchXIcon className="h-8 w-8 text-muted" aria-hidden="true" />
          <h2 className="mt-4 text-xl font-semibold">No courses match those filters</h2>
          <p className="mt-2 max-w-sm text-muted">Try another length, or see every course in this field.</p>
          <Button variant="secondary" className="mt-6" onClick={clearFilters}>
            Clear filters
          </Button>
        </div>
      }
    </div>);

}