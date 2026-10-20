import React, { useRef, useState } from 'react';
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { AuthLayout } from '../../components/auth/AuthLayout';
import { FormField } from '../../components/ui/FormField';
import { Button } from '../../components/ui/Button';
import { ButtonLink } from '../../components/ui/ButtonLink';
import { Alert } from '../../components/ui/Alert';
import { useAuth } from '../../hooks/useAuth';
import { useFormFields } from '../../hooks/useFormFields';
import { AuthError } from '../../utils/mockAuth';
import { validateIdentifier } from '../../utils/validation';

type SignInValues = {identifier: string;password: string;};

export function SignIn() {
  const { user, signIn } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const state = (location.state ?? null) as {from?: string;notice?: string;} | null;
  const signingIn = useRef(false);
  const [loading, setLoading] = useState(false);
  const [networkError, setNetworkError] = useState<string | null>(null);
  const form = useFormFields<SignInValues>(
    { identifier: '', password: '' },
    {
      identifier: (v, final) => validateIdentifier(v.identifier, final),
      password: (v, final) => final && !v.password ? 'Enter your password.' : null
    }
  );

  if (user && !signingIn.current) return <Navigate to="/dashboard" replace />;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setNetworkError(null);
    if (!form.validateAll()) return;
    setLoading(true);
    signingIn.current = true;
    try {
      const account = await signIn(form.values.identifier, form.values.password);
      if (!account.verified) {
        navigate('/verify', { state: { intent: 'existing', from: state?.from } });
        return;
      }
      navigate(state?.from ?? '/dashboard', { replace: true });
    } catch (err) {
      signingIn.current = false;
      setLoading(false);
      if (err instanceof AuthError && err.code !== 'network' && (err.field === 'identifier' || err.field === 'password')) {
        form.setServerError(err.field, err.message);
      } else {
        setNetworkError(err instanceof Error ? err.message : 'Something went wrong. Try again.');
      }
    }
  }

  return (
    <AuthLayout title="Welcome back" subtitle="Sign in with the phone number or email you joined with.">
      <form noValidate onSubmit={handleSubmit} className="space-y-7">
        {state?.notice && <Alert tone="success">{state.notice}</Alert>}
        {state?.from && !state.notice && <Alert tone="info">Sign in to open that page.</Alert>}
        {networkError &&
        <Alert tone="error" title="Couldn't connect">
            {networkError}
          </Alert>
        }
        <FormField label="Phone or email" placeholder="0772 123 456" autoComplete="username" {...form.bind('identifier')} />
        <div>
          <FormField label="Password" type="password" autoComplete="current-password" {...form.bind('password')} />
          <Link
            to="/forgot-password"
            className="mt-3 inline-block rounded text-sm font-medium text-ink underline decoration-ink/30 underline-offset-4 hover:decoration-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest">
            
            Forgot password?
          </Link>
        </div>
        <div className="space-y-3 pt-1">
          <Button type="submit" size="lg" fullWidth loading={loading} loadingText="Signing in…">
            Sign in
          </Button>
          <div className="grid grid-cols-2 gap-3">
            <ButtonLink to="/how-it-works" variant="secondary" size="lg">
              Take a tour
            </ButtonLink>
            <ButtonLink to="/sign-up" variant="secondary" size="lg">
              Sign up
            </ButtonLink>
          </div>
        </div>
      </form>
    </AuthLayout>);

}