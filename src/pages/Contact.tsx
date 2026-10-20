import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { AlertCircleIcon, CheckCircle2Icon, ClockIcon, MailIcon, MapPinIcon, PhoneIcon } from 'lucide-react';
import { FormField } from '../components/ui/FormField';
import { SelectField } from '../components/ui/SelectField';
import { Button } from '../components/ui/Button';
import { Alert } from '../components/ui/Alert';
import { useFormFields } from '../hooks/useFormFields';
import { contact } from '../data/navigation';
import { apiSendMessage } from '../utils/mockContact';
import { validateIdentifier } from '../utils/validation';
import { cn } from '../utils/cn';

type ContactValues = {name: string;reply: string;topic: string;message: string;};

const topics = [
{ value: 'courses', label: 'Courses and applying' },
{ value: 'fees', label: 'Fees and fee support' },
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
    <div className="mx-auto max-w-6xl px-5 py-14 md:px-8 md:py-20">
      <div className="grid gap-14 lg:grid-cols-[0.85fr_1.15fr]">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">Talk to us</h1>
          <p className="mt-3 text-base leading-relaxed text-muted">Call, visit, or send a message. We reply within 2 working days.</p>
          <ul className="mt-10 space-y-6">
            <li className="flex gap-4">
              <PhoneIcon className="mt-1 h-5 w-5 text-forest" aria-hidden="true" />
              <div>
                <p className="text-sm text-muted">Phone or WhatsApp</p>
                <a href={`tel:${contact.phone.replace(/\s/g, '')}`} className="text-lg font-semibold hover:underline">
                  {contact.phone}
                </a>
              </div>
            </li>
            <li className="flex gap-4">
              <MailIcon className="mt-1 h-5 w-5 text-forest" aria-hidden="true" />
              <div>
                <p className="text-sm text-muted">Email</p>
                <a href={`mailto:${contact.email}`} className="text-lg font-semibold hover:underline">
                  {contact.email}
                </a>
              </div>
            </li>
            <li className="flex gap-4">
              <MapPinIcon className="mt-1 h-5 w-5 text-forest" aria-hidden="true" />
              <div>
                <p className="text-sm text-muted">Visit</p>
                <p className="text-lg font-semibold">{contact.address}</p>
              </div>
            </li>
            <li className="flex gap-4">
              <ClockIcon className="mt-1 h-5 w-5 text-forest" aria-hidden="true" />
              <div>
                <p className="text-sm text-muted">Hours</p>
                <p className="text-lg font-semibold">{contact.hours}</p>
              </div>
            </li>
          </ul>
        </div>

        <div className="rounded-3xl bg-paper p-6 ring-1 ring-line md:p-10">
          {status === 'sent' ?
          <div className="flex flex-col items-start py-6" role="status">
              <CheckCircle2Icon className="h-10 w-10 text-forest" aria-hidden="true" />
              <h2 className="mt-5 text-2xl font-semibold">Message sent</h2>
              <p className="mt-2 text-muted">
                Thanks, {form.values.name.trim().split(' ')[0]}. We'll reply to {form.values.reply} within 2 working days.
              </p>
            </div> :

          <form noValidate onSubmit={handleSubmit} className="space-y-7">
              <h2 className="text-2xl font-semibold">Send a message</h2>
              {networkError &&
            <Alert tone="error" title="Not sent">
                  {networkError}
                </Alert>
            }
              <div className="grid gap-7 sm:grid-cols-2">
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
                rows={5}
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
              <Button type="submit" size="lg" loading={status === 'sending'} loadingText="Sending…">
                Send message
              </Button>
            </form>
          }
        </div>
      </div>
    </div>);

}