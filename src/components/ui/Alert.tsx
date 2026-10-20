import { motion } from 'framer-motion';
import { AlertTriangleIcon, CheckCircle2Icon, InfoIcon } from 'lucide-react';
import { cn } from '../../utils/cn';

interface AlertProps {
  tone: 'error' | 'success' | 'info';
  title?: string;
  children: React.ReactNode;
  action?: React.ReactNode;
}

const tones = {
  error: { box: 'bg-danger-soft text-danger', icon: AlertTriangleIcon },
  success: { box: 'bg-forest-soft text-forest-dark', icon: CheckCircle2Icon },
  info: { box: 'bg-sand/60 text-ink', icon: InfoIcon }
};

export function Alert({ tone, title, children, action }: AlertProps) {
  const { box, icon: Icon } = tones[tone];
  return (
    <motion.div
      role={tone === 'error' ? 'alert' : 'status'}
      initial={{ opacity: 0, y: -4 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.18, ease: [0.23, 1, 0.32, 1] }}
      className={cn('flex gap-3 rounded-xl px-4 py-3.5 text-sm', box)}>
      
      <Icon className="mt-0.5 h-[18px] w-[18px] shrink-0" aria-hidden="true" />
      <div className="flex-1">
        {title && <p className="font-semibold">{title}</p>}
        <div className={cn(title && 'mt-0.5', 'leading-relaxed')}>{children}</div>
        {action && <div className="mt-3">{action}</div>}
      </div>
    </motion.div>);

}