import React, { useState } from 'react';
import { Link, Navigate, useNavigate, useSearchParams } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { AuthLayout } from '../../components/auth/AuthLayout';
import { FormField } from '../../components/ui/FormField';
import { SelectField } from '../../components/ui/SelectField';
import { CheckboxField } from '../../components/ui/CheckboxField';
import { Button } from '../../components/ui/Button';
import { Alert } from '../../components/ui/Alert';
import { useAuth } from '../../hooks/useAuth';
import { useFormFields } from '../../hooks/useFormFields';
import { courses } from '../../data/courses';
import { lastClassOptions } from '../../data/navigation';
import type { Application } from '../../types/auth';
import { formatPhone, validateAge, validateName, validatePhone } from '../../utils/validation';

type ApplyValues = {
  name: string;
  age: string;
  phone: string;
  lastClass: string;
  course: string;
  guardianPhone: string;
  needsFeeHelp: boolean;
};

const courseOptions = courses.map((c) => ({ value: c.slug, label: c.title }));

function isMinor(age: string): boolean {
  if (!/^\d+$/.test(age.trim())) return false;
  const n = Number(age);
  return n >= 14 && n < 18;
}

export function Apply() {
  const { user, draft, application, saveDraft, submitApplication } = useAuth();
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [networkError, setNetworkError] = useState<string | null>(null);
  const hadDraft = Boolean(user && draft);

  const form = useFormFields<ApplyValues>(
    {
      name: draft?.name ?? user?.name ?? '',
      age: draft?.age ?? (user ? String(user.age) : ''),
      phone: draft?.phone ?? (user ? formatPhone(user.phone) : ''),
      lastClass: draft?.lastClass ?? '',
      course: params.get('course') ?? draft?.course ?? '',
      guardianPhone: draft?.guardianPhone ?? '',
      needsFeeHelp: draft?.needsFeeHelp ?? false
    },
    {
      name: (v, final) => validateName(v.name, final),
      age: (v, final) => validateAge(v.age, final),
      phone: (v, final) => validatePhone(v.phone, final),
      lastClass: (v, final) => final && !v.lastClass ? 'Choose the last class you completed. Any answer is fine.' : null,
      guardianPhone: (v, final) => v.guardianPhone && isMinor(v.age) ? validatePhone(v.guardianPhone, final) : null
    }
  );

  if (application && !loading) return <Navigate to="/apply/received" replace />;

  const minor = isMinor(form.values.age);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setNetworkError(null);
    if (!form.validateAll()) return;
    const answers: Application = {
      ...form.values,
      name: form.values.name.trim().replace(/\s+/g, ' '),
      guardianPhone: minor ? form.values.guardianPhone : ''
    };
    if (!user) {
      saveDraft(answers);
      navigate('/sign-up', { state: { fromApply: true } });
      return;
    }
    setLoading(true);
    try {
      await submitApplication(answers);
      navigate('/apply/received', { replace: true });
    } catch (err) {
      setLoading(false);
      setNetworkError(err instanceof Error ? err.message : 'Something went wrong. Try again.');
    }
  }

  return (
    <AuthLayout
      title="Apply in about 3 minutes"
      subtitle="No exam. Your answers help your mentor prepare for your first call."
      footer={
      !user &&
      <>
            Already have an account?{' '}
            <Link to="/sign-in" state={{ from: '/apply' }} className="font-semibold text-ink underline decoration-ink/30 underline-offset-4 hover:decoration-ink">
              Sign in
            </Link>
          </>

      }>
      
      <form noValidate onSubmit={handleSubmit} className="space-y-7">
        {hadDraft && <Alert tone="info">We kept your answers from before. Check them, then send.</Alert>}
        {networkError &&
        <Alert tone="error" title="Not sent yet">
            {networkError} Your answers are still here.
          </Alert>
        }
        <FormField label="Full name" autoComplete="name" placeholder="e.g. Grace Namukose" {...form.bind('name')} />
        <div className="grid grid-cols-[88px_minmax(0,1fr)] gap-6">
          <FormField label="Age" inputMode="numeric" maxLength={2} placeholder="17" {...form.bind('age')} />
          <FormField label="Phone" type="tel" inputMode="tel" autoComplete="tel" placeholder="0772 123 456" {...form.bind('phone')} />
        </div>
        <SelectField label="Last class completed" placeholder="Choose one" options={lastClassOptions} {...form.bind('lastClass')} />
        <SelectField
          label="Course you're interested in"
          optional
          placeholder="Not sure yet. My mentor can help"
          options={courseOptions}
          {...form.bind('course')}
          error={null} />
        
        <AnimatePresence initial={false}>
          {minor &&
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.22, ease: [0.23, 1, 0.32, 1] }}
            className="overflow-hidden">
            
              <FormField
              label="Parent or guardian's phone"
              optional
              type="tel"
              inputMode="tel"
              placeholder="0772 123 456"
              hint="For learners under 18. We'll only use it if we can't reach you."
              {...form.bind('guardianPhone')} />
            
            </motion.div>
          }
        </AnimatePresence>
        <CheckboxField
          id="needsFeeHelp"
          checked={form.values.needsFeeHelp}
          onChange={(checked) => form.setValue('needsFeeHelp', checked)}
          label="I need help paying fees"
          description="Tick this if cost could stop you. It won't affect whether you're accepted." />
        
        <Button type="submit" size="lg" fullWidth glow loading={loading} loadingText="Sending…">
          {user ? 'Send application' : 'Continue'}
        </Button>
        {!user && <p className="text-center text-sm text-muted">Next, you'll create an account so your mentor can reach you.</p>}
      </form>
    </AuthLayout>);

}