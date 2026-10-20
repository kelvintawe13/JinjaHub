import { BuildingIcon } from 'lucide-react';

export function PartnerLogo({ name }: {name?: string;}) {
  return (
    <div className="flex h-20 items-center justify-center gap-2 rounded-2xl border border-dashed border-ink/20 text-sm font-medium text-muted">
      <BuildingIcon className="h-4 w-4" aria-hidden="true" />
      {name ?? 'Partner logo'}
    </div>);

}