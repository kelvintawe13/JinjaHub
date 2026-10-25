import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  AlertCircleIcon,
  CheckCircle2Icon,
  ClockIcon,
  MailIcon,
  MapPinIcon,
  PhoneIcon,
  SendIcon } from
'lucide-react';
import { FormField } from '../components/ui/FormField';
import { SelectField } from '../components/ui/SelectField';
import { Button } from '../components/ui/Button';
import { Alert } from '../components/ui/Alert';
import { Chip } from '../components/ui/Chip';
import { useFormFields } from '../hooks/useFormFields';
import { contact } from '../data/navigation';
import { apiSendMessage } from '../utils/mockContact';
import { validateIdentifier } from '../utils/validation';
import { cn } from '../utils/cn';

type ContactValues = {name: string;reply: string;topic: string;message: string;};

const topics = [
{ value: 'courses', label: 'Courses and applying' },
{ value: 'fees', label: 'Costs and support' },
{ value: 'hiring', label: 'Hiring our graduates' },
{ value: 'other', label: 'Something else' }];


export function Contact() {
  const [params] = useSearchParams();
  const presetTopic = topics.some((t) => t.value === params.get('topic')) ? params.get('topic') ?? 'courses' : 'courses';
  const form = useFormFields<ContactValues>(
    { name: '', reply: '', topic: presetTopic, message: '' },
    {
      name: (v, final) => final && !v.name.trim() ? 'Enter your name.' : null,
      reply: (v, final) => validateIdentifier(v.reply, final),
      message: (v, final) =>
      final && v.message.trim().length < 10 ? 'Add a few more words so we can help (at least 10 characters).' : null
    }
  );
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent'>('idle');
  const [networkError, setNetworkError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setNetworkError(null);
    if (!form.validateAll()) return;
    setStatus('sending');
    try {
      await apiSendMessage(form.values.reply);
      setStatus('sent');
    } catch (err) {
      setStatus('idle');
      setNetworkError(err instanceof Error ? err.message : 'Something went wrong. Try again.');
    }
  }

  const { error: messageError, ...messageProps } = form.bind('message');

  return (
    <div className="mx-auto max-w-page px-4 pb-14 pt-6 md:px-6 md:pb-16 md:pt-8">
      <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-start lg:gap-12">
        <div>
          <Chip tone="forest" className="px-3 py-1">
            Contact
          </Chip>
          <h1 className="mt-4 text-3xl font-semibold tracking-tight md:text-4xl">Talk to us</h1>
          <p className="mt-3 max-w-md text-base leading-relaxed text-muted">
            Call, visit, or send a message. A real person reads every one, and we reply within 2 working
            days.
          </p>

          <div className="relative mt-6 overflow-hidden rounded-2xl bg-cream ring-1 ring-gold/50">
            <img
              src="/contact.svg"
              alt=""
              className="h-36 w-full object-cover object-[50%_45%] sm:h-40" />
            
            <span className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-paper/95 px-3 py-1.5 text-xs font-semibold shadow-sm ring-1 ring-line backdrop-blur">
              <ClockIcon className="h-3.5 w-3.5 text-forest" aria-hidden="true" />
              Replies within 2 working days
            </span>
          </div>

          <div className="mt-3 grid gap-3 sm:grid-cols-2">
            <a
              href={`tel:${contact.phone.replace(/\s/g, '')}`}
              className="group flex flex-col rounded-2xl bg-forest-soft p-4 transition-[box-shadow,transform] duration-200 ease-snappy hover:-translate-y-0.5 hover:shadow-[0_14px_30px_-16px_rgba(27,27,25,0.35)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest">
              
              <span className="grid h-9 w-9 place-items-center rounded-xl bg-forest text-ink">
                <PhoneIcon className="h-4 w-4" aria-hidden="true" />
              </span>
              <span className="mt-3 text-xs font-semibold uppercase tracking-[0.12em] text-forest-dark">
                Phone or WhatsApp
              </span>
              <span className="mt-1 font-semibold">{contact.phone}</span>
            </a>

            <a
              href={`mailto:${contact.email}`}
              className="group flex flex-col rounded-2xl bg-cream p-4 ring-1 ring-gold/50 transition-[box-shadow,transform] duration-200 ease-snappy hover:-translate-y-0.5 hover:shadow-[0_14px_30px_-16px_rgba(27,27,25,0.35)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest">
              
              <span className="grid h-9 w-9 place-items-center rounded-xl bg-paper text-forest-dark">
                <MailIcon className="h-4 w-4" aria-hidden="true" />
              </span>
              <span className="mt-3 text-xs font-semibold uppercase tracking-[0.12em] text-forest-dark">
                Email
              </span>
              <span className="mt-1 break-all font-semibold">{contact.email}</span>
            </a>
          </div>

          <div className="mt-3 flex gap-3 rounded-2xl bg-paper p-4 ring-1 ring-line sm:p-5">
            <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-forest-soft">
              <MapPinIcon className="h-4 w-4 text-forest-dark" aria-hidden="true" />
            </span>
            <div className="min-w-0">
              <p className="text-xs font-semibold uppercase tracking-[0.12em] text-muted">Visit the hub</p>
              <p className="mt-1 font-semibold leading-snug">{contact.address}</p>
              <p className="mt-1.5 flex items-start gap-1.5 text-sm leading-snug text-muted">
                <ClockIcon className="mt-0.5 h-3.5 w-3.5 shrink-0 text-forest" aria-hidden="true" />
                {contact.hours}
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-3xl bg-paper p-5 ring-1 ring-line sm:p-6 md:p-8">
          {status === 'sent' ?
          <div className="flex flex-col items-start py-6" role="status">
              <CheckCircle2Icon className="h-10 w-10 text-forest" aria-hidden="true" />
              <h2 className="mt-5 text-2xl font-semibold">Message sent</h2>
              <p className="mt-2 text-muted">
                Thanks, {form.values.name.trim().split(' ')[0]}. We'll reply to {form.values.reply} within 2 working days.
              </p>
            </div> :

          <form noValidate onSubmit={handleSubmit} className="space-y-5">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-semibold">Send a message</h2>
                  <p className="mt-1 text-sm leading-relaxed text-muted">
                    One short form, and the right person gets back to you.
                  </p>
                </div>
                <span
                className="hidden h-10 w-10 shrink-0 place-items-center rounded-xl bg-forest-soft sm:grid"
                aria-hidden="true">
                
                  <SendIcon className="h-4 w-4 text-forest-dark" />
                </span>
              </div>
              {networkError &&
            <Alert tone="error" title="Not sent">
                  {networkError}
                </Alert>
            }
              <div className="grid gap-5 sm:grid-cols-2">
                <FormField label="Your name" autoComplete="name" {...form.bind('name')} />
                <FormField label="Phone or email for our reply" placeholder="0772 123 456" autoComplete="tel" {...form.bind('reply')} />
              </div>
              <SelectField label="What is it about?" options={topics} {...form.bind('topic')} error={null} />
              <div className="flex flex-col">
                <label htmlFor="message" className="text-sm font-medium text-muted">
                  Message
                </label>
                <textarea
                {...messageProps}
                rows={4}
                aria-invalid={messageError ? true : undefined}
                aria-describedby={messageError ? 'message-error' : undefined}
                className={cn(
                  'mt-2 w-full resize-y rounded-xl border bg-canvas/50 px-3.5 py-3 text-base outline-none transition-[border-color] duration-150 focus:ring-0',
                  messageError ? 'border-danger' : 'border-ink/20 focus:border-ink'
                )} />
              
                {messageError &&
              <p id="message-error" className="mt-1.5 flex items-start gap-1.5 text-sm font-medium text-danger">
                    <AlertCircleIcon className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
                    {messageError}
                  </p>
              }
              </div>
              <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
                <Button type="submit" size="lg" glow loading={status === 'sending'} loadingText="Sending…">
                  Send message
                </Button>
                <p className="text-sm text-muted">No account needed.</p>
              </div>
            </form>
          }
        </div>
      </div>
    </div>);

}
