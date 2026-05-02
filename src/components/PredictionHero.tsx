import { ArrowRight, ArrowDown } from 'lucide-react';
import type { PredictionResponse } from '../types/prediction';
import { classifyTrend, formatNaira, formatSignedPercent } from '../lib/format';
import { getCommodityIcon } from '../lib/commodity-icons';
import { ConfidenceBadge } from './ConfidenceBadge';

interface PredictionHeroProps {
  prediction: PredictionResponse;
}

const TREND_ACCENT = {
  rising: { text: 'text-rising-700', bg: 'bg-rising-50', border: 'border-rising-100' },
  falling: { text: 'text-falling-700', bg: 'bg-falling-50', border: 'border-falling-100' },
  stable: { text: 'text-neutral-700', bg: 'bg-neutral-100', border: 'border-neutral-200' },
} as const;

function summarize(prediction: PredictionResponse): string {
  const trend = classifyTrend(prediction.predicted_percentage_change);
  const magnitude = Math.abs(prediction.predicted_percentage_change).toFixed(1);

  const drivers = prediction.xai_explanation.feature_contributions
    .slice()
    .sort((a, b) => Math.abs(b.impact_percentage) - Math.abs(a.impact_percentage))
    .slice(0, 2)
    .map((f) => f.feature_label.toLowerCase());

  const driverText =
    drivers.length === 2
      ? `${drivers[0]} and ${drivers[1]}`
      : drivers[0] ?? 'broad market signals';

  if (trend === 'rising') {
    return `${prediction.food_item} is likely to rise about ${magnitude}% over the next four weeks, mostly because of ${driverText}.`;
  }
  if (trend === 'falling') {
    return `${prediction.food_item} is likely to ease about ${magnitude}% over the next four weeks, mostly because of ${driverText}.`;
  }
  return `${prediction.food_item} is likely to stay roughly stable over the next four weeks. ${
    drivers[0] ? `Watch ${drivers[0]} as the main thing that could change this.` : ''
  }`.trim();
}

export function PredictionHero({ prediction }: PredictionHeroProps) {
  const trend = classifyTrend(prediction.predicted_percentage_change);
  const accent = TREND_ACCENT[trend];
  const Icon = getCommodityIcon(prediction.food_item_id);

  return (
    <section className="rounded-2xl bg-surface border border-neutral-200 shadow-sm p-5 sm:p-8">
      <div className="flex items-center gap-3">
        <span
          className={[
            'inline-flex h-11 w-11 items-center justify-center rounded-lg',
            accent.bg,
            accent.text,
          ].join(' ')}
          aria-hidden="true"
        >
          <Icon className="h-[22px] w-[22px]" strokeWidth={1.75} />
        </span>
        <h1 className="text-h1 font-semibold tracking-tight text-neutral-900">
          {prediction.food_item}
        </h1>
      </div>

      <div className="mt-6 sm:mt-8 grid grid-cols-1 sm:grid-cols-[1fr_auto_1fr] items-stretch gap-4 sm:gap-6">
        <PriceColumn
          label="Today"
          value={formatNaira(prediction.current_price_ngn)}
          caption={`at ${prediction.reference_market}`}
        />

        <div
          aria-hidden="true"
          className="flex sm:flex-col items-center justify-center text-neutral-300"
        >
          <ArrowDown className="h-5 w-5 sm:hidden" strokeWidth={1.75} />
          <ArrowRight className="h-5 w-5 hidden sm:block" strokeWidth={1.75} />
        </div>

        <PriceColumn
          label="In 4 weeks"
          value={formatNaira(prediction.predicted_price_ngn)}
          caption={
            <span
              className={[
                'inline-flex items-center gap-1 rounded-full border px-2 py-0.5 numeric font-medium',
                accent.bg,
                accent.text,
                accent.border,
              ].join(' ')}
            >
              {formatSignedPercent(prediction.predicted_percentage_change)}
            </span>
          }
          emphasized
          accentText={accent.text}
        />
      </div>

      <p className="mt-6 sm:mt-8 text-body-lg text-neutral-700 max-w-3xl">
        {summarize(prediction)}
      </p>

      <div className="mt-5">
        <ConfidenceBadge level={prediction.confidence_level} />
      </div>
    </section>
  );
}

interface PriceColumnProps {
  label: string;
  value: string;
  caption: React.ReactNode;
  emphasized?: boolean;
  accentText?: string;
}

function PriceColumn({ label, value, caption, emphasized, accentText }: PriceColumnProps) {
  return (
    <div
      className={[
        'flex flex-col gap-2 rounded-xl px-4 sm:px-5 py-4 sm:py-5',
        emphasized ? 'bg-neutral-50 border border-neutral-200' : 'bg-neutral-50/60 border border-neutral-100',
      ].join(' ')}
    >
      <span className="text-micro font-medium uppercase tracking-wider text-neutral-500">
        {label}
      </span>
      <span
        className={[
          'numeric font-semibold tracking-tight text-h1 sm:text-display',
          emphasized && accentText ? accentText : 'text-neutral-900',
        ].join(' ')}
      >
        {value}
      </span>
      <span className="text-caption text-neutral-500">{caption}</span>
    </div>
  );
}
