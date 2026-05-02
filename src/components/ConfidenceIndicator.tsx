import type { ConfidenceLevel } from '../types/prediction';

interface ConfidenceIndicatorProps {
  level: ConfidenceLevel;
}

const LABEL: Record<ConfidenceLevel, string> = {
  high: 'High confidence',
  moderate: 'Moderate confidence',
  low: 'Low confidence',
};

const DOT: Record<ConfidenceLevel, string> = {
  high: 'bg-primary-500',
  moderate: 'bg-neutral-400',
  low: 'bg-neutral-300 ring-1 ring-neutral-400',
};

export function ConfidenceIndicator({ level }: ConfidenceIndicatorProps) {
  return (
    <span className="inline-flex items-center gap-1.5 text-micro font-medium uppercase tracking-wide text-neutral-500">
      <span
        aria-hidden="true"
        className={['inline-block h-1.5 w-1.5 rounded-full', DOT[level]].join(' ')}
      />
      <span>{LABEL[level]}</span>
    </span>
  );
}
