import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  CopyIcon,
  DownloadIcon,
  ExternalLinkIcon,
  HeartIcon,
  ImageIcon,
  PauseIcon,
  PlayIcon,
  Share2Icon,
  XIcon } from
'lucide-react';
import type { HubMoment } from '../../types/content';
import { MoreMenu } from './MoreMenu';
import { copyText, momentUrl, shareLink } from '../../utils/share';
import { cn } from '../../utils/cn';

interface GalleryLightboxProps {
  moments: HubMoment[];
  moment: HubMoment;
  liked: boolean;
  /** Starts the viewer already advancing through the photos. */
  autoPlay?: boolean;
  onToggleLike: () => void;
  onClose: () => void;
  onNavigate: (id: string) => void;
  onNotify: (message: string) => void;
}

const toolbarButton =
'grid h-10 w-10 place-items-center rounded-full text-paper transition-colors duration-150 hover:bg-paper/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest disabled:opacity-50';

export function GalleryLightbox({
  moments,
  moment,
  liked,
  autoPlay = false,
  onToggleLike,
  onClose,
  onNavigate,
  onNotify
}: GalleryLightboxProps) {
  const index = moments.findIndex((m) => m.id === moment.id);
  const previous = moments[(index - 1 + moments.length) % moments.length];
  const next = moments[(index + 1) % moments.length];
  const [playing, setPlaying] = useState(autoPlay);
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const restoreRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    restoreRef.current = document.activeElement as HTMLElement | null;
    closeRef.current?.focus();
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previousOverflow;
      restoreRef.current?.focus();
    };
  }, []);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        onClose();
        return;
      }
      if (event.key === 'ArrowRight') {
        onNavigate(next.id);
        return;
      }
      if (event.key === 'ArrowLeft') {
        onNavigate(previous.id);
        return;
      }
      if (event.key !== 'Tab' || !dialogRef.current) return;

      const focusable = dialogRef.current.querySelectorAll<HTMLElement>('button, [href]');
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [onClose, onNavigate, next.id, previous.id]);

  useEffect(() => {
    if (!playing) return;
    const timer = window.setInterval(() => onNavigate(next.id), 4200);
    return () => window.clearInterval(timer);
  }, [playing, next.id, onNavigate]);

  async function handleShare() {
    const result = await shareLink({
      title: `${moment.caption} — Life at the Hub`,
      text: moment.caption,
      url: momentUrl(moment.id)
    });
    if (result === 'copied') onNotify('Photo link copied');
    if (result === 'failed') onNotify('Could not share. Try copying the link.');
  }

  async function handleCopy() {
    const copied = await copyText(momentUrl(moment.id));
    onNotify(copied ? 'Photo link copied' : 'Could not copy the link');
  }

  function handleDownload() {
    const link = document.createElement('a');
    link.href = moment.src;
    link.download = moment.src.split('/').pop() ?? `hub-moment-${moment.id}`;
    document.body.appendChild(link);
    link.click();
    link.remove();
    onNotify('Download started');
  }

  return (
    <motion.div
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      aria-label={`${moment.caption} — gallery viewer`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.18 }}
      className="fixed inset-0 z-50 flex flex-col bg-ink/95 backdrop-blur-sm">
      
      <div className="flex items-center justify-between gap-3 px-4 py-3 md:px-6">
        <p className="flex items-center gap-2 text-sm font-medium tabular-nums text-paper/70">
          <ImageIcon className="h-4 w-4" aria-hidden="true" />
          {index + 1} / {moments.length}
          <span className="hidden text-paper/45 sm:inline">· {moment.place}</span>
        </p>
        <div className="flex items-center gap-1">
          <MoreMenu
            actions={[
            { label: 'Open original', icon: ExternalLinkIcon, href: moment.src },
            { label: 'Download image', icon: DownloadIcon, onSelect: handleDownload },
            { label: 'Copy photo link', icon: CopyIcon, onSelect: handleCopy }]
            }
            buttonClassName="bg-paper/10 text-paper hover:bg-paper/20" />
          
          <button
            type="button"
            onClick={() => setPlaying((p) => !p)}
            aria-label={playing ? 'Pause slideshow' : 'Play slideshow'}
            aria-pressed={playing}
            className={toolbarButton}>
            
            {playing ? <PauseIcon className="h-5 w-5" /> : <PlayIcon className="h-5 w-5" />}
          </button>
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            aria-label="Close gallery"
            className={toolbarButton}>
            
            <XIcon className="h-5 w-5" />
          </button>
        </div>
      </div>

      <div className="relative flex min-h-0 flex-1 items-center justify-center px-4 pb-2 sm:px-16">
        <button
          type="button"
          onClick={() => onNavigate(previous.id)}
          aria-label="Previous photo"
          className="absolute left-1 top-1/2 z-10 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full bg-paper/10 text-paper ring-1 ring-paper/20 transition-colors hover:bg-paper/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest sm:left-4">
          
          <ChevronLeftIcon className="h-5 w-5" />
        </button>

        <motion.figure
          key={moment.id}
          initial={{ opacity: 0, scale: 0.985 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.2, ease: [0.23, 1, 0.32, 1] }}
          className="flex max-h-full w-full max-w-5xl items-center justify-center overflow-hidden rounded-2xl bg-paper">
          
          <img
            src={moment.src}
            alt={moment.alt}
            className="max-h-[62vh] w-auto max-w-full object-contain sm:max-h-[68vh]" />
          
        </motion.figure>

        <button
          type="button"
          onClick={() => onNavigate(next.id)}
          aria-label="Next photo"
          className="absolute right-1 top-1/2 z-10 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full bg-paper/10 text-paper ring-1 ring-paper/20 transition-colors hover:bg-paper/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest sm:right-4">
          
          <ChevronRightIcon className="h-5 w-5" />
        </button>
      </div>

      <div className="border-t border-paper/10 px-4 py-4 md:px-6">
        <div className="mx-auto flex max-w-5xl flex-wrap items-end justify-between gap-4">
          <div className="min-w-0">
            <p className="text-base font-semibold text-paper">{moment.caption}</p>
            <p className="mt-0.5 text-sm text-paper/60">{moment.place}</p>
          </div>
          <div className="flex flex-wrap items-center gap-1.5">
            <button
              type="button"
              onClick={onToggleLike}
              aria-pressed={liked}
              aria-label={liked ? 'Unlike this photo' : 'Like this photo'}
              className={cn(
                'inline-flex h-10 items-center gap-1.5 rounded-full px-3.5 text-sm font-semibold transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest',
                liked ? 'bg-forest text-ink' : 'bg-paper/10 text-paper hover:bg-paper/20'
              )}>
              
              <HeartIcon
                className="h-4 w-4"
                fill={liked ? 'currentColor' : 'none'}
                aria-hidden="true" />
              
              <span className="tabular-nums">{moment.likes + (liked ? 1 : 0)}</span>
            </button>
            <button type="button" onClick={handleShare} aria-label="Share this photo" className={toolbarButton}>
              <Share2Icon className="h-5 w-5" />
            </button>
            <button type="button" onClick={handleCopy} aria-label="Copy photo link" className={toolbarButton}>
              <CopyIcon className="h-5 w-5" />
            </button>
            <button type="button" onClick={handleDownload} aria-label="Download this photo" className={toolbarButton}>
              <DownloadIcon className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </motion.div>);

}
