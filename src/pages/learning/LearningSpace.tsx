import { useEffect, useState } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { BookOpenIcon, HandCoinsIcon, MessageCircleIcon, LogOutIcon } from 'lucide-react';
import { StatCard } from '../../components/cards/StatCard';
import { ButtonLink } from '../../components/ui/ButtonLink';
import { Button } from '../../components/ui/Button';
import { Celebration } from '../../components/ui/Celebration';
import { useAuth } from '../../hooks/useAuth';
import { learningNav } from '../../data/navigation';
import { applicationNextSteps } from '../../data/nextSteps';
import { courses } from '../../data/courses';
import { formatPhone } from '../../utils/validation';
import { cn } from '../../utils/cn';

export type LearningSection = 'dashboard' | 'learning' | 'messages' | 'profile' | 'certificate';

const emptyStates: Record<'learning' | 'messages' | 'certificate', {image: string;title: string;body: string;}> = {
  learning: {
    image: '/learning-board.svg',
    title: 'Your course opens after orientation',
    body: 'Once your course is confirmed, each module and your progress will show here.'
  },
  messages: {
    image: '/mentor-call.svg',
    title: 'Your mentor will message you here first',
    body: 'After your first call, your conversations and reminders will appear in this space.'
  },
  certificate: {
    image: '/certificate.svg',
    title: 'Finish your course to unlock your certificate',
    body: 'You will get a link employers can open to check it.'
  }
};

export function LearningSpace({ section }: {section: LearningSection;}) {
  const { user, application, signOut } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  // Flower celebration when the user just signed in / verified into their space.
  const [celebrate, setCelebrate] = useState(false);

  useEffect(() => {
    if (location.state?.celebrate) {
      setCelebrate(true);
      // Clear the one-shot flag so refresh/back doesn't replay it.
      navigate(location.pathname, { replace: true, state: null });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps -- run once on mount
  }, []);

  if (!user) return null;
  const firstName = user.name.split(' ')[0];
  const course = courses.find((c) => c.slug === application?.course);

  return (
    <div className="mx-auto grid max-w-page gap-8 px-4 py-6 md:px-6 md:py-10 lg:grid-cols-[200px_minmax(0,1fr)] lg:gap-14">
      <nav aria-label="Learning space">
        <ul className="-mx-4 flex gap-1 overflow-x-auto px-4 lg:mx-0 lg:flex-col lg:px-0">
          {learningNav.map((item) =>
          <li key={item.to}>
              <NavLink
              to={item.to}
              className={({ isActive }) =>
              cn(
                'block whitespace-nowrap rounded-lg px-3 py-2 text-sm font-medium transition-colors duration-150',
                isActive ? 'bg-ink text-paper' : 'text-muted hover:bg-ink/5 hover:text-ink'
              )
              }>
              
                {item.label}
              </NavLink>
            </li>
          )}
        </ul>
      </nav>

      <div>
        {section === 'dashboard' &&
        <>
            <h1 className="text-2xl font-semibold tracking-tight md:text-3xl">Hi {firstName}</h1>
            {application ?
          <>
                <section aria-labelledby="status-title" className="mt-8 rounded-3xl bg-paper p-5 ring-1 ring-line md:p-7">
                  <p className="text-sm font-medium text-forest-dark">Application received</p>
                  <h2 id="status-title" className="mt-1 text-2xl font-semibold tracking-tight">
                    What happens next
                  </h2>
                  <ol className="mt-6 space-y-5">
                    {applicationNextSteps.map((step, i) =>
                <li key={step.id} className="flex gap-4">
                        <span
                    className={cn(
                      'grid h-8 w-8 shrink-0 place-items-center rounded-full text-sm font-semibold',
                      i === 0 ? 'bg-ink text-paper' : 'bg-ink/[0.06] text-muted'
                    )}>
                    
                          {i + 1}
                        </span>
                        <div>
                          <p className="font-semibold">
                            {step.title}
                            {i === 0 && <span className="ml-2 text-sm font-medium text-forest-dark">Up next</span>}
                          </p>
                          <p className="mt-0.5 text-muted">{step.body}</p>
                        </div>
                      </li>
                )}
                  </ol>
                </section>
                <div className="mt-4 grid gap-4 sm:grid-cols-3">
                  <StatCard icon={BookOpenIcon} label="Course" value={course?.title ?? 'Not chosen yet'} hint={course ? course.duration : 'Your mentor will help'} />
                  <StatCard icon={HandCoinsIcon} label="Fee support" value={application.needsFeeHelp ? 'Requested' : 'Not requested'} />
                  <StatCard icon={MessageCircleIcon} label="Mentor" value="Calling soon" hint={`On ${formatPhone(application.phone)}`} />
                </div>
              </> :

          <section className="mt-8 rounded-2xl bg-ink p-6 text-paper md:p-8">
                <h2 className="text-2xl font-semibold">Finish your application</h2>
                <p className="mt-2 max-w-md text-paper/75">It takes about 3 minutes. A mentor calls within 3 days of sending it.</p>
                <ButtonLink to="/apply" glow className="mt-6">
                  Continue application
                </ButtonLink>
              </section>
          }
          </>
        }

        {(section === 'learning' || section === 'messages' || section === 'certificate') &&
        <EmptyState {...emptyStates[section]} />
        }

        {section === 'profile' &&
        <>
            <h1 className="text-2xl font-semibold tracking-tight md:text-3xl">Profile</h1>
            <dl className="mt-8 divide-y divide-line border-y border-line">
              {[
            ['Name', user.name],
            ['Phone', formatPhone(user.phone)],
            ['Age', String(user.age)],
            ['Email', user.email ?? 'Not added']].
            map(([label, value]) =>
            <div key={label} className="grid grid-cols-[120px_1fr] gap-4 py-4">
                  <dt className="text-muted">{label}</dt>
                  <dd className="font-medium">{value}</dd>
                </div>
            )}
            </dl>
            <Button
            variant="outline"
            className="mt-8"
            onClick={() => {
              signOut();
              navigate('/');
            }}>
            
              <LogOutIcon className="h-4 w-4" aria-hidden="true" />
              Sign out
            </Button>
          </>
        }
      </div>

      <Celebration
        show={celebrate}
        onDone={() => setCelebrate(false)}
        title={`Welcome to your space, ${firstName}!`}
        message="Your course, mentor messages, and progress all live here."
      />
    </div>);

}

function EmptyState({ image, title, body }: {image: string;title: string;body: string;}) {
  return (
    <div className="flex flex-col items-start rounded-3xl bg-paper p-6 ring-1 ring-line md:p-10">
      <img src={image} alt="" className="w-full max-w-sm rounded-2xl ring-1 ring-line" />
      <h1 className="mt-6 text-2xl font-semibold tracking-tight md:text-3xl">{title}</h1>
      <p className="mt-2 max-w-md text-lg text-muted">{body}</p>
      <ButtonLink to="/dashboard" variant="secondary" className="mt-8">
        Back to overview
      </ButtonLink>
    </div>);

}