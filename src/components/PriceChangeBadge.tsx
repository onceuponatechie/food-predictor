import { ArrowDownRight, ArrowUpRight, Minus } from 'lucide-react';
import { classifyTrend, formatSignedPercent, type PriceTrend } from '../lib/format';

interface PriceChangeBadgeProps {
  /** Signed percentage change, e.g. 8.5 or -10. */
  change: number;
  /** Optional trailing label, e.g. "in 4 weeks". */
  suffix?: string;
  size?: 'sm' | 'md';
}

const TONE: Record<PriceTrend, { container: string; icon: typeof ArrowUpRight }> = {
  rising: {
    container: 'bg-rising-50 text-rising-700 border-rising-100',
    icon: ArrowUpRight,
  },
  falling: {
    container: 'bg-falling-50 text-falling-700 border-falling-100',
    icon: ArrowDownRight,
  },
  stable: {
    container: 'bg-neutral-100 text-neutral-600 border-neutral-200',
    icon: Minus,
  },
};

export function PriceChangeBadge({ change, suffix, size = 'md' }: PriceChangeBadgeProps) {
  const trend = classifyTrend(change);
  const tone = TONE[trend];
  const Icon = tone.icon;

  const sizing =
    size === 'sm'
      ? 'h-6 px-2 text-micro gap-1'
      : 'h-7 px-2.5 text-caption gap-1.5';

  return (
    <span
      className={[
        'inline-flex items-center rounded-full border font-medium',
        'numeric',
        sizing,
        tone.container,
      ].join(' ')}
      aria-label={`Predicted change ${formatSignedPercent(change)}${suffix ? ' ' + suffix : ''}`}
    >
      <Icon
        className={size === 'sm' ? 'h-3 w-3' : 'h-3.5 w-3.5'}
        strokeWidth={2.25}
        aria-hidden="true"
      />
      <span>{formatSignedPercent(change)}</span>
      {suffix ? <span className="font-normal opacity-80">{suffix}</span> : null}
    </span>
  );
}
