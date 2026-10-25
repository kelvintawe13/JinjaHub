import { useState } from 'react';
import {
  BookmarkIcon,
  HeartIcon,
  LinkIcon,
  MailIcon,
  MessageCircleIcon,
  Share2Icon,
  XIcon } from
'lucide-react';
import { MoreMenu } from './MoreMenu';
import { readStored, writeStored } from '../../utils/storage';
import {
  copyText,
  emailShareUrl,
  shareLink,
  siteUrl,
  whatsappShareUrl,
  xShareUrl } from
'../../utils/share';
import { cn } from '../../utils/cn';

const BASE_LIKES = 214;
const SHARE_TEXT = 'Inside the Jinja Edu-Hub: classes, field visits, sports and the people who make it.';

export function PageActions({ onNotify }: {onNotify: (message: string) => void;}) {
  const [liked, setLiked] = useState(() => readStored<boolean>('hub-page-liked') ?? false);
  const [saved, setSaved] = useState(() => readStored<boolean>('hub-page-saved') ?? false);

  const pageUrl = siteUrl('/life');

  function toggleLike() {
    setLiked((current) => {
      writeStored('hub-page-liked', !current);
      return !current;
    });
  }

  function toggleSaved() {
    setSaved((current) => {
      writeStored('hub-page-saved', !current);
      onNotify(current ? 'Removed from your saved pages' : 'Page saved on this device');
      return !current;
    });
  }

  async function handleShare() {
    const result = await shareLink({
      title: 'Life at the Jinja Edu-Hub',
      text: SHARE_TEXT,
      url: pageUrl
    });
    if (result === 'copied') onNotify('Page link copied');
    if (result === 'failed') onNotify('Could not share. Try copying the link.');
  }

  async function copyPageLink() {
    const copied = await copyText(pageUrl);
    onNotify(copied ? 'Page link copied' : 'Could not copy the link');
  }

  return (
    <div className="mt-8 flex flex-col gap-3 rounded-2xl bg-paper p-3 ring-1 ring-line sm:flex-row sm:items-center sm:justify-between">
      <div className="flex flex-wrap items-center gap-2">
        <button
          type="button"
          onClick={toggleLike}
          aria-pressed={liked}
          className={cn(
            'inline-flex min-h-10 items-center gap-2 rounded-full px-3.5 text-sm font-semibold transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest focus-visible:ring-offset-2 focus-visible:ring-offset-canvas',
            liked ? 'bg-forest text-ink' : 'bg-sand text-ink hover:bg-sand-dark'
          )}>
          
          <HeartIcon className="h-4 w-4" fill={liked ? 'currentColor' : 'none'} aria-hidden="true" />
          {liked ? 'Liked' : 'Like this page'}
          <span className={cn('tabular-nums', liked ? 'text-ink/60' : 'text-muted')}>
            {BASE_LIKES + (liked ? 1 : 0)}
          </span>
        </button>
        <button
          type="button"
          onClick={toggleSaved}
          aria-pressed={saved}
          className={cn(
            'inline-flex min-h-10 items-center gap-2 rounded-full px-3.5 text-sm font-semibold transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest focus-visible:ring-offset-2 focus-visible:ring-offset-canvas',
            saved ? 'bg-ink text-paper' : 'bg-sand text-ink hover:bg-sand-dark'
          )}>
          
          <BookmarkIcon className="h-4 w-4" fill={saved ? 'currentColor' : 'none'} aria-hidden="true" />
          {saved ? 'Saved' : 'Save for later'}
        </button>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <button
          type="button"
          onClick={handleShare}
          className="inline-flex min-h-10 items-center gap-2 rounded-full px-3.5 text-sm font-semibold text-ink ring-1 ring-line transition-colors duration-150 hover:bg-sand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest focus-visible:ring-offset-2 focus-visible:ring-offset-canvas">
          
          <Share2Icon className="h-4 w-4" aria-hidden="true" />
          Share this page
        </button>
        <MoreMenu
          label="More"
          align="right"
          actions={[
          { label: 'Copy page link', icon: LinkIcon, onSelect: copyPageLink },
          { label: 'Share on WhatsApp', icon: MessageCircleIcon, href: whatsappShareUrl(SHARE_TEXT, pageUrl) },
          { label: 'Post on X', icon: XIcon, href: xShareUrl(SHARE_TEXT, pageUrl) },
          {
            label: 'Email a friend',
            icon: MailIcon,
            href: emailShareUrl('Life at the Jinja Edu-Hub', `${SHARE_TEXT} ${pageUrl}`)
          }]
          } />
        
      </div>
    </div>);

}
