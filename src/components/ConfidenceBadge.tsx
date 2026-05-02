import { useEffect, useId, useRef, useState } from 'react';
import { Info } from 'lucide-react';
import type { ConfidenceLevel } from '../types/prediction';

interface ConfidenceBadgeProps {
  level: ConfidenceLevel;
}

const LABEL: Record<ConfidenceLevel, string> = {
  high: 'High confidence',
  moderate: 'Moderate confidence',
  low: 'Low confidence',
};

const EXPLANATION: Record<ConfidenceLevel, string> = {
  high:
    "We're very sure about this prediction. Past forecasts at this confidence level have stayed close to actual prices.",
  moderate:
    "The model is reasonably sure, but conditions could shift. Treat the number as a best estimate.",
  low:
    'Signals are mixed right now. Use this as a rough guide and check back next week.',
};

const TONE: Record<ConfidenceLevel, string> = {
  high: 'bg-primary-50 text-primary-700 border-primary-100',
  moderate: 'bg-neutral-100 text-neutral-700 border-neutral-200',
  low: 'bg-neutral-100 text-neutral-600 border-neutral-200',
};

const DOT: Record<ConfidenceLevel, string> = {
  high: 'bg-primary-500',
  moderate: 'bg-neutral-400',
  low: 'bg-neutral-300 ring-1 ring-neutral-400',
};

export function ConfidenceBadge({ level }: ConfidenceBadgeProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const tooltipId = useId();

  useEffect(() => {
    if (!open) return;
    function onDoc(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') setOpen(false);
    }
    document.addEventListener('mousedown', onDoc);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onDoc);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  return (
    <div ref={ref} className="relative inline-block">
      <button
        type="button"
        aria-describedby={tooltipId}
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
        onFocus={() => setOpen(true)}
        onBlur={() => setOpen(false)}
        className={[
          'inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-caption font-medium transition-colors duration-base',
          TONE[level],
        ].join(' ')}
      >
        <span aria-hidden="true" className={['inline-block h-1.5 w-1.5 rounded-full', DOT[level]].join(' ')} />
        <span>{LABEL[level]}</span>
        <Info className="h-3.5 w-3.5 opacity-60" strokeWidth={2} aria-hidden="true" />
      </button>

      {open ? (
        <div
          id={tooltipId}
          role="tooltip"
          className={[
            'absolute left-0 top-full z-20 mt-2 w-72 max-w-[calc(100vw-2rem)]',
            'rounded-lg border border-neutral-200 bg-surface p-3 shadow-md',
            'text-caption text-neutral-700',
          ].join(' ')}
        >
          {EXPLANATION[level]}
        </div>
      ) : null}
    </div>
  );
}
