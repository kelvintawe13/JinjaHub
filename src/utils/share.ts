export type ShareResult = 'shared' | 'copied' | 'cancelled' | 'failed';

export interface SharePayload {
  title: string;
  text?: string;
  url: string;
}

/** Copy text with the async clipboard, falling back to a temporary textarea. */
export async function copyText(text: string): Promise<boolean> {
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
      return true;
    }
  } catch {

    // Fall through to the textarea approach.
  }

  try {
    const area = document.createElement('textarea');
    area.value = text;
    area.setAttribute('readonly', '');
    area.style.position = 'fixed';
    area.style.top = '0';
    area.style.opacity = '0';
    document.body.appendChild(area);
    area.select();
    const copied = document.execCommand('copy');
    document.body.removeChild(area);
    return copied;
  } catch {
    return false;
  }
}

/**
 * Opens the native share sheet where supported, otherwise copies the URL.
 * Never throws: a dismissed sheet returns 'cancelled'.
 */
export async function shareLink(payload: SharePayload): Promise<ShareResult> {
  if (navigator.share) {
    try {
      await navigator.share(payload);
      return 'shared';
    } catch (error) {
      if (error instanceof DOMException && error.name === 'AbortError') return 'cancelled';
    }
  }

  const copied = await copyText(payload.url);
  return copied ? 'copied' : 'failed';
}

/** Absolute shareable link for the site, independent of the current query string. */
export function siteUrl(path = '/'): string {
  return `${window.location.origin}${path}`;
}

export function momentUrl(id: string): string {
  return `${siteUrl('/life')}?moment=${encodeURIComponent(id)}`;
}

export function whatsappShareUrl(text: string, url: string): string {
  return `https://wa.me/?text=${encodeURIComponent(`${text} ${url}`)}`;
}

export function xShareUrl(text: string, url: string): string {
  return `https://x.com/intent/post?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`;
}

export function emailShareUrl(subject: string, body: string): string {
  return `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}
