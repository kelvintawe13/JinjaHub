import type { Step } from '../../types/content';

export function StepCard({ step, index }: {step: Step;index: number;}) {
  return (
    <li className="relative">
      <span className="relative z-10 grid h-9 w-9 place-items-center rounded-full bg-ink text-sm font-semibold text-paper">
        {index + 1}
      </span>
      <h3 className="mt-4 text-lg font-semibold tracking-tight">{step.title}</h3>
      <p className="mt-1.5 max-w-xs text-sm leading-relaxed text-muted">{step.body}</p>
    </li>);

}