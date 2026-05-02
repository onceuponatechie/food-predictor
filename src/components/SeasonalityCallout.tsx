import { Sun } from 'lucide-react';

interface SeasonalityCalloutProps {
  note: string;
}

export function SeasonalityCallout({ note }: SeasonalityCalloutProps) {
  return (
    <section
      aria-labelledby="seasonality-heading"
      className="rounded-2xl border border-primary-100 bg-primary-50/60 p-5 sm:p-6 flex gap-4"
    >
      <span
        aria-hidden="true"
        className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-surface text-primary-700 border border-primary-100"
      >
        <Sun className="h-[18px] w-[18px]" strokeWidth={1.75} />
      </span>
      <div className="flex flex-col gap-1.5">
        <h2 id="seasonality-heading" className="text-h3 font-semibold text-neutral-900">
          Is this normal for the season?
        </h2>
        <p className="text-body text-neutral-700 leading-relaxed">{note}</p>
      </div>
    </section>
  );
}
