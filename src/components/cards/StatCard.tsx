import { BoxIcon } from "lucide-react";
interface StatCardProps {
  label: string;
  value: string;
  hint?: string;
  icon: typeof BoxIcon;
}
export function StatCard({
  label,
  value,
  hint,
  icon: Icon
}: StatCardProps) {
  return <div className="flex flex-col rounded-2xl bg-paper p-5 ring-1 ring-line">
      <div className="flex items-center gap-2 text-sm text-muted">
        <Icon className="h-4 w-4" aria-hidden="true" />
        {label}
      </div>
      <p className="mt-3 text-xl font-semibold tracking-tight">{value}</p>
      {hint && <p className="mt-auto pt-1 text-sm text-muted">{hint}</p>}
    </div>;
}