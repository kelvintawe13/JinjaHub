import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthLayout } from '../../components/auth/AuthLayout';
import { FormField } from '../../components/ui/FormField';
import { Button } from '../../components/ui/Button';
import { Alert } from '../../components/ui/Alert';
import { useAuth } from '../../hooks/useAuth';
import { useFormFields } from '../../hooks/useFormFields';
import { AuthError } from '../../utils/mockAuth';
import { validateIdentifier } from '../../utils/validation';

type ForgotValues = {identifier: string;};

export function ForgotPassword() {
  const { startReset } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [networkError, setNetworkError] = useState<string | null>(null);
  const form = useFormFields<ForgotValues>(
    { identifier: '' },
    { identifier: (v, final) => validateIdentifier(v.identifier, final) }
  );

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setNetworkError(null);
    if (!form.validateAll()) return;
    setLoading(true);
    try {
      await startReset(form.values.identifier);
      navigate('/reset-password');
    } catch (err) {
      setLoading(false);
      if (err instanceof AuthError && err.code === 'not_found') form.setServerError('identifier', err.message);else
      setNetworkError(err instanceof Error ? err.message : 'Something went wrong. Try again.');
    }
  }

  return (
    <AuthLayout
      title="Reset your password"
      subtitle="Enter the phone or email on your account and we'll send you a 6-digit code."
      footer={
      <>
          Remembered it?{' '}
          <Link to="/sign-in" className="font-semibold text-ink underline decoration-ink/30 underline-offset-4 hover:decoration-ink">
            Sign in
          </Link>
        </>
      }>
      
      <form noValidate onSubmit={handleSubmit} className="space-y-7">
        {networkError &&
        <Alert tone="error" title="Couldn't connect">
            {networkError}
          </Alert>
        }
        <FormField label="Phone or email" placeholder="0772 123 456" autoComplete="username" {...form.bind('identifier')} />
        <Button type="submit" size="lg" fullWidth glow loading={loading} loadingText="Sending code…">
          Send code
        </Button>
      </form>
    </AuthLayout>);

}