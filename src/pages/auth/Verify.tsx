import { useRef, useState } from 'react';
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { AlertCircleIcon } from 'lucide-react';
import { AuthLayout } from '../../components/auth/AuthLayout';
import { CodeInput } from '../../components/auth/CodeInput';
import { Button } from '../../components/ui/Button';
import { Alert } from '../../components/ui/Alert';
import { useAuth } from '../../hooks/useAuth';
import { useCodeAttempts } from '../../hooks/useCodeAttempts';
import { useResendTimer } from '../../hooks/useResendTimer';
import { AuthError } from '../../utils/mockAuth';
import { formatPhone } from '../../utils/validation';
import { formatSeconds } from '../../utils/time';

export function Verify() {
  const { pendingAccount, user, confirmCode, resendCode } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const state = (location.state ?? null) as {intent?: 'new' | 'existing';from?: string;} | null;
  const intent = state?.intent ?? 'new';
  const [code, setCode] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [expired, setExpired] = useState(false);
  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);
  const [networkError, setNetworkError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);
  const attempts = useCodeAttempts();
  const resend = useResendTimer(30);
  const done = useRef(false);

  if (!pendingAccount && !done.current) return <Navigate to={user ? '/dashboard' : '/sign-up'} replace />;
  const phone = pendingAccount ? formatPhone(pendingAccount.phone) : '';

  async function submit(value: string) {
    if (loading || attempts.locked) return;
    setNetworkError(null);
    setNotice(null);
    if (value.length < 6) {
      setError('Enter all 6 digits from the SMS.');
      return;
    }
    setLoading(true);
    done.current = true;
    try {
      await confirmCode(value);
      const next = intent === 'new' ? '/apply' : (state?.from ?? '/dashboard');
      navigate(next, {
        replace: true,
        state: next === '/dashboard' ? { celebrate: true } : undefined,
      });
    } catch (err) {
      done.current = false;
      setLoading(false);
      setCode('');
      if (err instanceof AuthError && err.code === 'expired') {
        setExpired(true);
        setError(err.message);
      } else if (err instanceof AuthError && err.code === 'wrong_code') {
        const left = attempts.registerWrong();
        setError(left > 0 ? `${err.message} ${left} ${left === 1 ? 'try' : 'tries'} left.` : null);
        if (left > 0) window.setTimeout(() => document.getElementById('code')?.focus(), 0);
      } else {
        setNetworkError(err instanceof Error ? err.message : 'Something went wrong. Try again.');
      }
    }
  }

  async function handleResend() {
    setResending(true);
    setNetworkError(null);
    try {
      await resendCode();
      resend.restart();
      setExpired(false);
      setError(null);
      setCode('');
      setNotice(`New code sent to ${phone}.`);
    } catch (err) {
      setNetworkError(err instanceof Error ? err.message : 'Something went wrong. Try again.');
    } finally {
      setResending(false);
    }
  }

  const canResend = (resend.remaining === 0 || expired) && !resending;

  return (
    <AuthLayout
      title="Check your phone"
      subtitle={
      <>
          We sent a 6-digit code to <strong className="font-semibold text-ink">{phone}</strong>.
        </>
      }>
      
      <form
        noValidate
        onSubmit={(e) => {
          e.preventDefault();
          void submit(code);
        }}
        className="space-y-6">
        
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
            Verification code
          </p>
          <CodeInput
            id="code"
            value={code}
            onChange={(v) => {
              setCode(v);
              setError(null);
            }}
            onComplete={(v) => void submit(v)}
            labelledBy="code-label"
            describedBy={error ? 'code-error' : undefined}
            disabled={attempts.locked || loading}
            invalid={Boolean(error)} />
          
          <div aria-live="polite">
            {error &&
            <p id="code-error" className="mt-2.5 flex items-start gap-1.5 text-sm font-medium text-danger">
                <AlertCircleIcon className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
                {error}
              </p>
            }
          </div>
        </div>

        <Button type="submit" size="lg" fullWidth glow loading={loading} loadingText="Checking…" disabled={attempts.locked}>
          Verify
        </Button>

        <div className="flex flex-wrap items-center justify-between gap-3 text-sm">
          <Button
            variant={expired && canResend ? 'secondary' : 'ghost'}
            size="sm"
            className="-ml-3.5"
            onClick={handleResend}
            disabled={!canResend}
            loading={resending}
            loadingText="Sending…">
            
            {canResend ? 'Resend code' : `Resend code in ${formatSeconds(resend.remaining)}`}
          </Button>
          {intent === 'new' ?
          <button
            type="button"
            onClick={() => navigate('/sign-up', { state: { changeNumber: true } })}
            className="rounded font-medium text-ink underline decoration-ink/30 underline-offset-4 hover:decoration-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest">
            
              Change number
            </button> :

          <Link to="/sign-in" className="rounded font-medium text-ink underline decoration-ink/30 underline-offset-4 hover:decoration-ink">
              Use a different account
            </Link>
          }
        </div>
      </form>
    </AuthLayout>);

}