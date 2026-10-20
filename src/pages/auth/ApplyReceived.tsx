import { AuthLayout } from '../../components/auth/AuthLayout';
import { ButtonLink } from '../../components/ui/ButtonLink';
import { useAuth } from '../../hooks/useAuth';
import { applicationNextSteps } from '../../data/nextSteps';
import { formatPhone } from '../../utils/validation';

export function ApplyReceived() {
  const { user, application } = useAuth();
  const firstName = (application?.name ?? user?.name ?? '').split(' ')[0];
  const phone = application?.phone ?? user?.phone;

  return (
    <AuthLayout
      title={firstName ? `Thank you, ${firstName}` : 'Thank you'}
      subtitle="Your application is in. Here's what happens next.">
      
      <ol className="relative space-y-7">
        <span className="absolute bottom-4 left-4 top-4 w-px bg-ink/15" aria-hidden="true" />
        {applicationNextSteps.map((step, i) =>
        <li key={step.id} className="relative flex gap-5">
            <span className="relative z-10 grid h-8 w-8 shrink-0 place-items-center rounded-full bg-ink text-sm font-semibold text-paper ring-4 ring-canvas">
              {i + 1}
            </span>
            <div className="pt-0.5">
              <h2 className="font-semibold">{step.title}</h2>
              <p className="mt-1 leading-relaxed text-muted">
                {i === 0 && phone ? `We'll call ${formatPhone(phone)}. ` : ''}
                {step.body}
              </p>
            </div>
          </li>
        )}
      </ol>
      <ButtonLink to="/dashboard" size="lg" fullWidth className="mt-10">
        Preview my learning space
      </ButtonLink>
    </AuthLayout>);

}