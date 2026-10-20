import { motion, useReducedMotion } from 'framer-motion';
import { AwardIcon, MessageCircleIcon } from 'lucide-react';
import { ButtonLink } from '../ui/ButtonLink';
import { Chip } from '../ui/Chip';

const HERO_IMAGE = "/aeb18857-193b-4223-899b-f2f4e0f9d12c.jpg";
const ease = [0.23, 1, 0.32, 1] as const;

export function Hero() {
  const reduce = useReducedMotion();
  const float = (delay: number) => ({
    initial: reduce ? false : { opacity: 0, y: 8, scale: 0.96 },
    animate: { opacity: 1, y: 0, scale: 1 },
    transition: { duration: 0.28, ease, delay }
  });

  return (
    <section aria-labelledby="hero-title" className="overflow-hidden">
      <div className="mx-auto grid max-w-page items-center gap-10 px-4 pb-8 pt-6 md:px-6 md:pt-10 lg:pb-12 lg:grid-cols-[1.05fr_0.95fr]">
        <div>
          <div className="flex flex-wrap gap-2">
            <Chip tone="forest" className="px-3 py-1">
              For ages 14 to 21 in Jinja
            </Chip>
            <Chip tone="gold" className="px-3 py-1">
              Free of charge
            </Chip>
          </div>
          <h1 id="hero-title" className="mt-5 text-5xl font-semibold tracking-tight lg:text-6xl">
            Skills that lead to work
          </h1>
          <p className="mt-4 max-w-md text-lg leading-relaxed text-muted">
            Hands-on courses in farming, tourism, computers and business, with a mentor beside you from your first class to your first job.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <ButtonLink to="/courses" size="lg" glow>
              Explore courses
            </ButtonLink>
            <ButtonLink to="/#how" size="lg" variant="secondary">
              How it works
            </ButtonLink>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-md lg:max-w-none">
          <div className="aspect-[4/5] overflow-hidden rounded-2xl bg-paper ring-1 ring-line">
            <img src={HERO_IMAGE} alt="Two young learners at the Edu-Hub, one with a laptop and one holding a seedling" className="h-full w-full object-cover" />
          </div>

          <motion.div
            {...float(0.15)}
            className="absolute left-3 top-8 flex items-center gap-3 rounded-2xl bg-paper p-3 pr-4 shadow-[0_12px_30px_-12px_rgba(27,27,25,0.3)] lg:-left-10">
            
            <span className="grid h-9 w-9 place-items-center rounded-lg bg-forest text-ink">
              <AwardIcon className="h-[18px] w-[18px]" aria-hidden="true" />
            </span>
            <div>
              <p className="text-sm font-semibold leading-tight">Certificate earned</p>
              <p className="text-xs text-muted">Ready to share</p>
            </div>
          </motion.div>

          <motion.div
            {...float(0.2)}
            className="absolute right-3 top-[44%] max-w-[230px] rounded-2xl bg-paper p-3.5 shadow-[0_12px_30px_-12px_rgba(27,27,25,0.3)] lg:-right-8">
            
            <div className="flex items-center gap-2 text-xs font-medium text-forest-dark">
              <MessageCircleIcon className="h-4 w-4" aria-hidden="true" />
              Your mentor
            </div>
            <p className="mt-1.5 text-sm leading-snug">“How did today's farm visit go? Call me if anything was unclear.”</p>
          </motion.div>

          <motion.div
            {...float(0.25)}
            className="absolute bottom-6 left-3 w-[220px] rounded-2xl bg-paper p-4 shadow-[0_12px_30px_-12px_rgba(27,27,25,0.3)] lg:-left-8">
            
            <div className="flex items-baseline justify-between text-sm">
              <span className="font-semibold">Your progress</span>
              <span className="text-muted">Module 3 of 6</span>
            </div>
            <div className="mt-3 h-2 overflow-hidden rounded-full bg-forest-soft" role="presentation">
              <div className="h-full w-1/2 rounded-full bg-forest" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>);

}