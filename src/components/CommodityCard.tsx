import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import type { PredictionResponse } from '../types/prediction';
import { classifyTrend, formatNaira } from '../lib/format';
import { getCommodityIcon } from '../lib/commodity-icons';
import { PriceChangeBadge } from './PriceChangeBadge';
import { ConfidenceIndicator } from './ConfidenceIndicator';

interface CommodityCardProps {
  prediction: PredictionResponse;
}

const ICON_TONE = {
  rising: 'bg-rising-50 text-rising-600',
  falling: 'bg-falling-50 text-falling-600',
  stable: 'bg-primary-50 text-primary-600',
} as const;

export function CommodityCard({ prediction }: CommodityCardProps) {
  const trend = classifyTrend(prediction.predicted_percentage_change);
  const Icon = getCommodityIcon(prediction.food_item_id);

  const topDriver = prediction.xai_explanation.feature_contributions
    .slice()
    .sort((a, b) => Math.abs(b.impact_percentage) - Math.abs(a.impact_percentage))[0];

  const driverPreview = topDriver
    ? `Driven by ${topDriver.feature_label.toLowerCase()}`
    : 'Stable market signals';

  return (
    <Link
      to={`/commodity/${prediction.food_item_id}`}
      className={[
        'group relative flex flex-col gap-5 rounded-xl bg-surface p-5 sm:p-6',
        'border border-neutral-200/80 shadow-sm',
        'transition-all duration-base ease-standard',
        'hover:-translate-y-0.5 hover:shadow-md hover:border-neutral-200',
        'focus-visible:-translate-y-0.5 focus-visible:shadow-md',
      ].join(' ')}
      aria-label={`${prediction.food_item} forecast — see full details`}
    >
      <div className="flex items-start justify-between gap-3">
        <span
          className={[
            'inline-flex h-10 w-10 items-center justify-center rounded-lg',
            ICON_TONE[trend],
          ].join(' ')}
          aria-hidden="true"
        >
          <Icon className="h-5 w-5" strokeWidth={1.75} />
        </span>
        <PriceChangeBadge
          change={prediction.predicted_percentage_change}
          suffix="in 4 weeks"
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <h3 className="text-h3 font-semibold text-neutral-900">
          {prediction.food_item}
        </h3>
        <p
          className="text-h2 font-semibold tracking-tight text-neutral-900 numeric"
          aria-label={`Current price ${formatNaira(prediction.current_price_ngn)}`}
        >
          {formatNaira(prediction.current_price_ngn)}
        </p>
        <p className="text-caption text-neutral-500">Current price</p>
      </div>

      <p className="text-body text-neutral-600 line-clamp-2">{driverPreview}</p>

      <div className="mt-auto flex items-center justify-between border-t border-neutral-100 pt-4">
        <ConfidenceIndicator level={prediction.confidence_level} />
        <span className="inline-flex items-center gap-1 text-caption font-medium text-neutral-500 transition-colors duration-base group-hover:text-neutral-900">
          Details
          <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={2} aria-hidden="true" />
        </span>
      </div>
    </Link>
  );
}
