import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import {
  CopyIcon,
  DownloadIcon,
  ExpandIcon,
  ExternalLinkIcon,
  HeartIcon,
  Maximize2Icon,
  PlayIcon,
  Share2Icon } from
'lucide-react';
import { Chip } from '../ui/Chip';
import { MoreMenu } from './MoreMenu';
import { GalleryLightbox } from './GalleryLightbox';
import { hubMoments, momentCategories } from '../../data/hubMoments';
import { readStored, writeStored } from '../../utils/storage';
import { copyText, momentUrl, shareLink } from '../../utils/share';
import type { HubMoment, MomentCategory } from '../../types/content';
import { cn } from '../../utils/cn';

const LIKES_KEY = 'hub-moment-likes';

const ratioClasses: Record<NonNullable<HubMoment['ratio']>, string> = {
  wide: 'aspect-[16/10]',
  square: 'aspect-square',
  tall: 'aspect-[3/4]'
};

export function Gallery({ onNotify }: {onNotify: (message: string) => void;}) {
  const [params, setParams] = useSearchParams();
  const [category, setCategory] = useState<'all' | MomentCategory>('all');
  const [startingSlideshow, setStartingSlideshow] = useState(false);
  const [likedIds, setLikedIds] = useState<string[]>(() => readStored<string[]>(LIKES_KEY) ?? []);

  const activeId = params.get('moment');
  const activeMoment = hubMoments.find((m) => m.id === activeId) ?? null;
  const filtered =
  category === 'all' ? hubMoments : hubMoments.filter((m) => m.category === category);

  const countFor = (id: 'all' | MomentCategory) =>
  id === 'all' ? hubMoments.length : hubMoments.filter((m) => m.category === id).length;

  function toggleLike(id: string) {
    setLikedIds((current) => {
      const next = current.includes(id) ? current.filter((m) => m !== id) : [...current, id];
      writeStored(LIKES_KEY, next);
      return next;
    });
  }

  function openMoment(id: string) {
    const next = new URLSearchParams(params);
    next.set('moment', id);
    setParams(next, { replace: true });
  }

  function closeLightbox() {
    const next = new URLSearchParams(params);
    next.delete('moment');
    setParams(next, { replace: true });
    setStartingSlideshow(false);
  }

  function startSlideshow() {
    setStartingSlideshow(true);
    openMoment(filtered[0]?.id ?? hubMoments[0].id);
  }

  async function shareMoment(moment: HubMoment) {
    const result = await shareLink({
      title: `${moment.caption} — Life at the Hub`,
      text: moment.caption,
      url: momentUrl(moment.id)
    });
    if (result === 'copied') onNotify('Photo link copied');
    if (result === 'failed') onNotify('Could not share. Try copying the link.');
  }

  async function copyMomentLink(moment: HubMoment) {
    const copied = await copyText(momentUrl(moment.id));
    onNotify(copied ? 'Photo link copied' : 'Could not copy the link');
  }

  function downloadMoment(moment: HubMoment) {
    const link = document.createElement('a');
    link.href = moment.src;
    link.download = moment.src.split('/').pop() ?? `hub-moment-${moment.id}`;
    document.body.appendChild(link);
    link.click();
    link.remove();
    onNotify('Download started');
  }

  return (
    <div>
      <div className="mt-8 flex flex-col gap-4 border-y border-line py-5 lg:flex-row lg:items-center lg:justify-between">
        <div
          role="group"
          aria-label="Filter moments"
          className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 sm:mx-0 sm:flex-wrap sm:px-0 sm:pb-0">
          
          {momentCategories.map((item) =>
          <Chip
            key={item.id}
            selected={category === item.id}
            onClick={() => setCategory(item.id)}>
            
              {item.label}
              <span className={cn('tabular-nums', category === item.id ? 'text-paper/60' : 'text-muted')}>
                {countFor(item.id)}
              </span>
            </Chip>
          )}
        </div>
        <button
          type="button"
          onClick={startSlideshow}
          className="inline-flex min-h-10 shrink-0 items-center justify-center gap-2 rounded-full bg-ink px-4 text-sm font-semibold text-paper transition-colors duration-150 hover:bg-ink-soft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest focus-visible:ring-offset-2 focus-visible:ring-offset-canvas">
          
          <PlayIcon className="h-4 w-4" aria-hidden="true" />
          Play the slideshow
        </button>
      </div>

      <p className="mt-4 text-sm text-muted" aria-live="polite">
        {filtered.length} {filtered.length === 1 ? 'moment' : 'moments'}
      </p>

      <div className="mt-4 columns-2 gap-3 md:columns-3 lg:columns-4 lg:gap-4">
        {filtered.map((moment) => {
          const liked = likedIds.includes(moment.id);
          return (
            <figure
              key={moment.id}
              className="group relative z-0 mb-3 break-inside-avoid rounded-2xl bg-paper ring-1 ring-line hover:z-10 focus-within:z-10 lg:mb-4">
              
              <button
                type="button"
                onClick={() => {
                  setStartingSlideshow(false);
                  openMoment(moment.id);
                }}
                aria-label={`Open “${moment.caption}” in the gallery viewer`}
                className="block w-full text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-forest">
                
                <span
                  className={cn(
                    'relative block overflow-hidden rounded-t-2xl bg-sand',
                    ratioClasses[moment.ratio ?? 'wide']
                  )}>
                  
                  <img
                    src={moment.src}
                    alt={moment.alt}
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover transition-transform duration-500 ease-snappy group-hover:scale-[1.03]" />
                  
                  <span
                    aria-hidden="true"
                    className="absolute inset-0 bg-gradient-to-t from-ink/60 via-transparent to-transparent opacity-0 transition-opacity duration-200 group-hover:opacity-100" />
                  
                  <span
                    aria-hidden="true"
                    className="absolute bottom-3 left-3 inline-flex items-center gap-1.5 rounded-full bg-paper/90 px-2.5 py-1 text-xs font-semibold text-ink opacity-0 backdrop-blur transition-opacity duration-200 group-hover:opacity-100">
                    
                    <ExpandIcon className="h-3.5 w-3.5" />
                    Open
                  </span>
                </span>

                <span className="flex items-start justify-between gap-3 px-3.5 py-3">
                  <span className="min-w-0">
                    <span className="block text-sm font-semibold leading-snug">
                      {moment.caption}
                    </span>
                    <span className="mt-0.5 block text-xs text-muted">{moment.place}</span>
                  </span>
                  <span className="inline-flex shrink-0 items-center gap-1 pt-0.5 text-xs font-medium tabular-nums text-muted">
                    <HeartIcon
                      className="h-3.5 w-3.5"
                      fill={liked ? 'currentColor' : 'none'}
                      aria-hidden="true" />
                    
                    {moment.likes + (liked ? 1 : 0)}
                  </span>
                </span>
              </button>

              <div className="absolute right-2 top-2 flex gap-1.5 transition-opacity duration-150 sm:opacity-0 sm:group-focus-within:opacity-100 sm:group-hover:opacity-100">
                <button
                  type="button"
                  onClick={() => toggleLike(moment.id)}
                  aria-pressed={liked}
                  aria-label={liked ? `Unlike ${moment.caption}` : `Like ${moment.caption}`}
                  className={cn(
                    'grid h-9 w-9 place-items-center rounded-full shadow-sm ring-1 backdrop-blur transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest',
                    liked ?
                    'bg-forest text-ink ring-forest' :
                    'bg-paper/90 text-ink ring-line hover:bg-paper'
                  )}>
                  
                  <HeartIcon className="h-4 w-4" fill={liked ? 'currentColor' : 'none'} aria-hidden="true" />
                </button>
                <button
                  type="button"
                  onClick={() => shareMoment(moment)}
                  aria-label={`Share ${moment.caption}`}
                  className="grid h-9 w-9 place-items-center rounded-full bg-paper/90 text-ink shadow-sm ring-1 ring-line backdrop-blur transition-colors duration-150 hover:bg-paper focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest">
                  
                  <Share2Icon className="h-4 w-4" aria-hidden="true" />
                </button>
                <MoreMenu
                  ariaLabel={`More options for ${moment.caption}`}
                  buttonClassName="bg-paper/90 text-ink shadow-sm ring-1 ring-line backdrop-blur hover:bg-paper"
                  actions={[
                  {
                    label: 'Open full size',
                    icon: Maximize2Icon,
                    onSelect: () => {
                      setStartingSlideshow(false);
                      openMoment(moment.id);
                    }
                  },
                  { label: 'Copy photo link', icon: CopyIcon, onSelect: () => copyMomentLink(moment) },
                  { label: 'Download image', icon: DownloadIcon, onSelect: () => downloadMoment(moment) },
                  { label: 'Open original', icon: ExternalLinkIcon, href: moment.src }]
                  } />
                
              </div>
            </figure>);

        })}
      </div>

      <AnimatePresence>
        {activeMoment &&
        <GalleryLightbox
          moments={hubMoments}
          moment={activeMoment}
          liked={likedIds.includes(activeMoment.id)}
          autoPlay={startingSlideshow}
          onToggleLike={() => toggleLike(activeMoment.id)}
          onClose={closeLightbox}
          onNavigate={openMoment}
          onNotify={onNotify} />
        }
      </AnimatePresence>
    </div>);

}
