import React, { useRef, useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { AlertCircleIcon } from 'lucide-react';
import { AuthLayout } from '../../components/auth/AuthLayout';
import { CodeInput } from '../../components/auth/CodeInput';
import { FormField } from '../../components/ui/FormField';
import { Button } from '../../components/ui/Button';
import { Alert } from '../../components/ui/Alert';
import { useAuth } from '../../hooks/useAuth';
import { useFormFields } from '../../hooks/useFormFields';
import { useCodeAttempts } from '../../hooks/useCodeAttempts';
import { useResendTimer } from '../../hooks/useResendTimer';
import { AuthError } from '../../utils/mockAuth';
import { formatPhone, normalizePhone, PASSWORD_RULE, validateConfirm, validatePassword } from '../../utils/validation';
import { formatSeconds } from '../../utils/time';

type ResetValues = {password: string;confirm: string;};

export function ResetPassword() {
  const { resetIdentifier, completeReset, resendResetCode } = useAuth();
  const navigate = useNavigate();
  const [code, setCode] = useState('');
  const [codeError, setCodeError] = useState<string | null>(null);
  const [expired, setExpired] = useState(false);
  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);
  const [networkError, setNetworkError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);
  const attempts = useCodeAttempts();
  const resend = useResendTimer(30);
  const done = useRef(false);
  const form = useFormFields<ResetValues>(
    { password: '', confirm: '' },
    {
      password: (v, final) => validatePassword(v.password, final),
      confirm: (v, final) => validateConfirm(v.password, v.confirm, final)
    }
  );

  if (!resetIdentifier && !done.current) return <Navigate to="/forgot-password" replace />;
  const target = resetIdentifier && normalizePhone(resetIdentifier) ? formatPhone(resetIdentifier) : resetIdentifier ?? '';

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (attempts.locked) return;
    setNetworkError(null);
    setNotice(null);
    const codeOk = code.length === 6;
    if (!codeOk) setCodeError('Enter all 6 digits from the message.');
    const fieldsOk = form.validateAll();
    if (!codeOk) {
      document.getElementById('code')?.focus();
      return;
    }
    if (!fieldsOk) return;

    setLoading(true);
    done.current = true;
    try {
      await completeReset(code, form.values.password);
      navigate('/sign-in', { replace: true, state: { notice: 'Password updated. Sign in with your new password.' } });
    } catch (err) {
      done.current = false;
      setLoading(false);
      setCode('');
      if (err instanceof AuthError && err.code === 'expired') {
        setExpired(true);
        setCodeError(err.message);
      } else if (err instanceof AuthError && err.code === 'wrong_code') {
        const left = attempts.registerWrong();
        setCodeError(left > 0 ? `${err.message} ${left} ${left === 1 ? 'try' : 'tries'} left.` : null);
      } else {
        setNetworkError(err instanceof Error ? err.message : 'Something went wrong. Try again.');
      }
    }
  }

  async function handleResend() {
    setResending(true);
    setNetworkError(null);
    try {
      await resendResetCode();
      resend.restart();
      setExpired(false);
      setCodeError(null);
      setCode('');
      setNotice(`New code sent to ${target}.`);
    } catch (err) {
      setNetworkError(err instanceof Error ? err.message : 'Something went wrong. Try again.');
    } finally {
      setResending(false);
    }
  }

  const canResend = (resend.remaining === 0 || expired) && !resending;

  return (
    <AuthLayout
      title="Set a new password"
      subtitle={
      <>
          Enter the code we sent to <strong className="font-semibold text-ink">{target}</strong>, then choose a new password.
        </>
      }
      footer={
      <Link to="/forgot-password" className="font-semibold text-ink underline decoration-ink/30 underline-offset-4 hover:decoration-ink">
          Use a different phone or email
        </Link>
      }>
      
      <form noValidate onSubmit={handleSubmit} className="space-y-7">
        {networkError &&
        <Alert tone="error" title="Couldn't connect">
            {networkError}
          </Alert>
        }
        {notice && <Alert tone="success">{notice}</Alert>}
        {attempts.locked &&
        <Alert tone="error" title="Too many tries">
            For your safety, wait <strong>{formatSeconds(attempts.lockRemaining)}</strong> before trying again.
          </Alert>
        }
        <div>
          <p id="code-label" className="mb-3 text-sm font-medium text-muted">
            Code
          </p>
          <CodeInput
            id="code"
            value={code}
            onChange={(v) => {
              setCode(v);
              setCodeError(null);
            }}
            labelledBy="code-label"
            describedBy={codeError ? 'code-error' : undefined}
            disabled={attempts.locked || loading}
            invalid={Boolean(codeError)} />
          
          <div aria-live="polite">
            {codeError &&
            <p id="code-error" className="mt-2.5 flex items-start gap-1.5 text-sm font-medium text-danger">
                <AlertCircleIcon className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
                {codeError}
              </p>
            }
          </div>
          <Button
            variant={expired && canResend ? 'secondary' : 'ghost'}
            size="sm"
            className="-ml-3.5 mt-2"
            onClick={handleResend}
            disabled={!canResend}
            loading={resending}
            loadingText="Sending…">
            
            {canResend ? 'Resend code' : `Resend code in ${formatSeconds(resend.remaining)}`}
          </Button>
        </div>
        <FormField label="New password" type="password" autoComplete="new-password" hint={PASSWORD_RULE} {...form.bind('password')} />
        <FormField label="Confirm new password" type="password" autoComplete="new-password" {...form.bind('confirm')} />
        <Button type="submit" size="lg" fullWidth loading={loading} loadingText="Saving…" disabled={attempts.locked}>
          Save new password
        </Button>
      </form>
    </AuthLayout>);

}