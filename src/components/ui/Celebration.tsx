import { useEffect, useMemo } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Flower2Icon, SparklesIcon } from 'lucide-react';

const PETAL_COLORS = [
  { fill: '#F76707', stroke: '#C2410C' },
  { fill: '#FFB25C', stroke: '#C2410C' },
  { fill: '#FFF3EB', stroke: '#C2410C' },
  { fill: '#FF7B22', stroke: '#7C2D12' },
  { fill: '#FFFFFF', stroke: '#C2410C' },
];

interface CelebrationProps {
  /** Controls visibility; mount/unmount with AnimatePresence-friendly state. */
  show: boolean;
  /** Called automatically once the celebration has finished playing. */
  onDone: () => void;
  title: string;
  message?: string;
  /** Total time before onDone fires, ms. */
  duration?: number;
}

interface Petal {
  id: number;
  left: number;
  delay: number;
  duration: number;
  size: number;
  color: (typeof PETAL_COLORS)[number];
  spin: number;
  sway: number;
}

/** Falling-flower celebration overlay, shown briefly after a successful enrol/apply action. */
export function Celebration({
  show,
  onDone,
  title,
  message,
  duration = 4200,
}: CelebrationProps) {
  const petals = useMemo<Petal[]>(
    () =>
      Array.from({ length: 28 }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        delay: Math.random() * 1.2,
        duration: 2.4 + Math.random() * 2,
        size: 18 + Math.random() * 24,
        color: PETAL_COLORS[i % PETAL_COLORS.length],
        spin: i % 2 === 0 ? 360 : -360,
        sway: i % 2 === 0 ? 14 : -14,
      })),
    []
  );

  useEffect(() => {
    if (!show) return;
    const timer = setTimeout(onDone, duration);
    return () => clearTimeout(timer);
  }, [show, duration, onDone]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          aria-hidden="true"
          className="pointer-events-none fixed inset-0 z-50 overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { delay: 0.4, duration: 0.3 } }}>
          {petals.map((petal) => (
            <motion.div
              key={petal.id}
              className="absolute -top-12"
              style={{ left: `${petal.left}%` }}
              initial={{ y: -60, opacity: 0, rotate: 0, x: 0 }}
              animate={{
                y: '110vh',
                opacity: [0, 1, 1, 1, 0.9],
                rotate: petal.spin,
                x: [0, petal.sway, -petal.sway / 2, petal.sway / 2, 0],
              }}
              transition={{
                duration: petal.duration,
                delay: petal.delay,
                ease: 'easeIn',
                opacity: { duration: petal.duration, times: [0, 0.08, 0.8, 1] },
                x: {
                  duration: petal.duration,
                  times: [0, 0.3, 0.6, 0.8, 1],
                },
              }}>
              <Flower2Icon
                strokeWidth={2}
                width={petal.size}
                height={petal.size}
                fill={petal.color.fill}
                stroke={petal.color.stroke}
              />
            </motion.div>
          ))}

          {/* Center burst card */}
          <motion.div
            className="absolute inset-x-0 top-1/2 flex -translate-y-1/2 justify-center px-6"
            initial={{ opacity: 0, scale: 0.6, y: 28 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, transition: { duration: 0.25 } }}>
            <div className="max-w-sm rounded-3xl bg-paper p-8 text-center shadow-[0_24px_60px_-20px_rgba(27,27,25,0.35)] ring-1 ring-line">
              <motion.span
                className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-forest"
                initial={{ scale: 0.3, rotate: -30 }}
                animate={{ scale: [0.3, 1.18, 1], rotate: 0 }}
                transition={{ delay: 0.3, duration: 0.55, ease: 'backOut' }}>
                <SparklesIcon className="h-7 w-7 text-ink" aria-hidden="true" />
              </motion.span>
              <h2 className="mt-5 text-xl font-semibold tracking-tight">{title}</h2>
              {message && (
                <p className="mt-2 text-sm leading-relaxed text-muted">{message}</p>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
