import { Link } from 'react-router-dom';
import type { PredictionResponse } from '../types/prediction';
import { classifyTrend, formatNaira } from '../lib/format';
import { getCommodityIcon } from '../lib/commodity-icons';
import { PriceChangeBadge } from './PriceChangeBadge';

interface RelatedCommoditiesProps {
  current: PredictionResponse;
  all: PredictionResponse[];
}

export function RelatedCommodities({ current, all }: RelatedCommoditiesProps) {
  const others = all.filter((p) => p.food_item_id !== current.food_item_id).slice(0, 3);
  if (others.length === 0) return null;

  return (
    <section
      aria-labelledby="related-heading"
      className="flex flex-col gap-4"
    >
      <h2 id="related-heading" className="text-h2 font-semibold text-neutral-900">
        Other commodities to watch
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {others.map((p) => (
          <CompactCard key={p.food_item_id} prediction={p} />
        ))}
      </div>
    </section>
  );
}

interface CompactCardProps {
  prediction: PredictionResponse;
}

const ICON_TONE = {
  rising: 'bg-rising-50 text-rising-600',
  falling: 'bg-falling-50 text-falling-600',
  stable: 'bg-primary-50 text-primary-600',
} as const;

function CompactCard({ prediction }: CompactCardProps) {
  const trend = classifyTrend(prediction.predicted_percentage_change);
  const Icon = getCommodityIcon(prediction.food_item_id);

  return (
    <Link
      to={`/commodity/${prediction.food_item_id}`}
      className={[
        'flex items-center gap-4 rounded-xl bg-surface p-4',
        'border border-neutral-200/80 shadow-sm',
        'transition-all duration-base ease-standard',
        'hover:-translate-y-0.5 hover:shadow-md',
      ].join(' ')}
      aria-label={`${prediction.food_item} — see full forecast`}
    >
      <span
        className={['inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg', ICON_TONE[trend]].join(' ')}
        aria-hidden="true"
      >
        <Icon className="h-5 w-5" strokeWidth={1.75} />
      </span>
      <div className="flex flex-col min-w-0 flex-1">
        <span className="text-body font-semibold text-neutral-900 truncate">
          {prediction.food_item}
        </span>
        <span className="text-caption text-neutral-500 numeric">
          {formatNaira(prediction.current_price_ngn)}
        </span>
      </div>
      <PriceChangeBadge change={prediction.predicted_percentage_change} size="sm" />
    </Link>
  );
}
