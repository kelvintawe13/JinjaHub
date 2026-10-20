import React, { useState } from 'react';
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { AuthLayout } from '../../components/auth/AuthLayout';
import { FormField } from '../../components/ui/FormField';
import { CheckboxField } from '../../components/ui/CheckboxField';
import { Button } from '../../components/ui/Button';
import { ButtonLink } from '../../components/ui/ButtonLink';
import { Alert } from '../../components/ui/Alert';
import { useAuth } from '../../hooks/useAuth';
import { useFormFields } from '../../hooks/useFormFields';
import { AuthError } from '../../utils/mockAuth';
import {
  formatPhone,
  normalizePhone,
  PASSWORD_RULE,
  validateAge,
  validateName,
  validatePassword,
  validatePhone } from
'../../utils/validation';

type SignUpValues = {name: string;age: string;phone: string;password: string;consent: boolean;};

export function SignUp() {
  const { user, signUp, draft, pendingAccount } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const state = (location.state ?? null) as {fromApply?: boolean;changeNumber?: boolean;} | null;
  const [loading, setLoading] = useState(false);
  const [networkError, setNetworkError] = useState<string | null>(null);
  const [accountExists, setAccountExists] = useState(false);

  const form = useFormFields<SignUpValues>(
    {
      name: draft?.name ?? pendingAccount?.name ?? '',
      age: draft?.age ?? (pendingAccount ? String(pendingAccount.age) : ''),
      phone: state?.changeNumber ? '' : draft?.phone ?? (pendingAccount ? formatPhone(pendingAccount.phone) : ''),
      password: '',
      consent: false
    },
    {
      name: (v, final) => validateName(v.name, final),
      age: (v, final) => validateAge(v.age, final),
      phone: (v, final) => validatePhone(v.phone, final),
      password: (v, final) => validatePassword(v.password, final),
      consent: (v, final) => final && !v.consent ? 'Tick the box to agree before you continue.' : null
    }
  );

  if (user) return <Navigate to="/dashboard" replace />;

  const phoneError = form.errorFor('phone');
  const phoneOk = !phoneError && normalizePhone(form.values.phone) !== null;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setNetworkError(null);
    setAccountExists(false);
    if (!form.validateAll()) return;
    setLoading(true);
    try {
      await signUp({
        name: form.values.name.trim().replace(/\s+/g, ' '),
        age: Number(form.values.age),
        phone: normalizePhone(form.values.phone) ?? form.values.phone,
        password: form.values.password
      });
      navigate('/verify', { state: { intent: 'new' } });
    } catch (err) {
      setLoading(false);
      if (err instanceof AuthError && err.code === 'exists') {
        setAccountExists(true);
        form.setServerError('phone', err.message);
      } else {
        setNetworkError(err instanceof Error ? err.message : 'Something went wrong. Try again.');
      }
    }
  }

  return (
    <AuthLayout
      title={state?.changeNumber ? 'Change your number' : 'Create your account'}
      subtitle="Five quick details. No exam, no documents."
      footer={
      <>
          Already have an account?{' '}
          <Link to="/sign-in" className="font-semibold text-ink underline decoration-ink/30 underline-offset-4 hover:decoration-ink">
            Sign in
          </Link>
        </>
      }>
      
      <form noValidate onSubmit={handleSubmit} className="space-y-7">
        {state?.fromApply && !accountExists &&
        <Alert tone="info">Your application answers are saved. Create an account so your mentor can reach you, then send it.</Alert>
        }
        {networkError &&
        <Alert tone="error" title="Couldn't connect">
            {networkError}
          </Alert>
        }
        {accountExists &&
        <Alert
          tone="error"
          title="You already have an account"
          action={
          <ButtonLink to="/sign-in" size="sm">
                Sign in instead
              </ButtonLink>
          }>
          
            This phone number is already registered. Sign in, or reset your password if you've forgotten it.
          </Alert>
        }
        <FormField label="Full name" placeholder="e.g. Grace Namukose" autoComplete="name" {...form.bind('name')} />
        <div className="grid grid-cols-[88px_minmax(0,1fr)] gap-6">
          <FormField label="Age" inputMode="numeric" maxLength={2} placeholder="17" {...form.bind('age')} />
          <FormField
            label="Phone"
            type="tel"
            inputMode="tel"
            placeholder="0772 123 456"
            autoComplete="tel"
            hint="Starts with 07 or +256 7"
            success={phoneOk ? "Looks right. We'll text a code here." : null}
            {...form.bind('phone')} />
          
        </div>
        <FormField label="Password" type="password" autoComplete="new-password" hint={PASSWORD_RULE} {...form.bind('password')} />
        <CheckboxField
          id="consent"
          checked={form.values.consent}
          onChange={(checked) => form.setValue('consent', checked)}
          error={form.errorFor('consent')}
          label="I agree to the Edu-Hub terms and privacy notice, and to be contacted by SMS or phone about my learning." />
        
        <Button type="submit" size="lg" fullWidth loading={loading} loadingText="Creating account…">
          Create account
        </Button>
      </form>
    </AuthLayout>);

}