import { ArrowDown, ArrowUp } from 'lucide-react';
import type { FeatureContribution, XaiExplanation } from '../types/prediction';
import { formatSignedPercent } from '../lib/format';

interface XaiExplanationBlockProps {
  explanation: XaiExplanation;
}

/** Visual scale for the impact bar: 6pp maps to 100% width. Larger impacts cap. */
const BAR_SCALE_PP = 6;

export function XaiExplanationBlock({ explanation }: XaiExplanationBlockProps) {
  const sorted = explanation.feature_contributions
    .slice()
    .sort((a, b) => Math.abs(b.impact_percentage) - Math.abs(a.impact_percentage));

  return (
    <section
      aria-labelledby="why-heading"
      className="rounded-2xl bg-surface border border-neutral-200 shadow-sm p-5 sm:p-8"
    >
      <h2 id="why-heading" className="text-h2 font-semibold text-neutral-900">
        Why this prediction
      </h2>
      <p className="mt-1.5 text-caption text-neutral-500">
        Ordered by how much each factor moves the forecast.
      </p>

      <ol className="mt-6 flex flex-col gap-6">
        {sorted.map((feature) => (
          <FeatureRow key={feature.feature_key} feature={feature} />
        ))}
      </ol>

      <p className="mt-7 pt-5 border-t border-neutral-100 text-caption text-neutral-500">
        Base market trend contributes about{' '}
        <span className="numeric font-medium text-neutral-700">
          {formatSignedPercent(explanation.base_market_trend)}
        </span>
        .
      </p>
    </section>
  );
}

interface FeatureRowProps {
  feature: FeatureContribution;
}

function FeatureRow({ feature }: FeatureRowProps) {
  const isIncrease = feature.direction === 'increase';
  const magnitude = Math.abs(feature.impact_percentage);
  const widthPct = Math.min((magnitude / BAR_SCALE_PP) * 100, 100);

  const Arrow = isIncrease ? ArrowUp : ArrowDown;
  const arrowTone = isIncrease ? 'text-rising-600 bg-rising-50' : 'text-falling-600 bg-falling-50';
  const barTone = isIncrease ? 'bg-rising-400' : 'bg-falling-400';
  const valueTone = isIncrease ? 'text-rising-700' : 'text-falling-700';

  const signed = (isIncrease ? '+' : '−') + magnitude.toFixed(1) + '%';

  return (
    <li className="flex flex-col gap-2.5">
      <div className="flex items-center justify-between gap-3">
        <span className="flex items-center gap-2.5 min-w-0">
          <span
            className={['inline-flex h-6 w-6 items-center justify-center rounded-md shrink-0', arrowTone].join(' ')}
            aria-hidden="true"
          >
            <Arrow className="h-3.5 w-3.5" strokeWidth={2.25} />
          </span>
          <span className="text-body font-medium text-neutral-900 truncate">
            {feature.feature_label}
          </span>
        </span>
        <span className={['text-body font-semibold numeric shrink-0', valueTone].join(' ')}>
          {signed}
        </span>
      </div>

      <div
        className="h-1.5 w-full rounded-full bg-neutral-100 overflow-hidden"
        role="img"
        aria-label={`${feature.feature_label} contributes ${signed} to the forecast`}
      >
        <div
          className={['h-full rounded-full transition-[width] duration-slow ease-standard', barTone].join(' ')}
          style={{ width: `${widthPct}%` }}
        />
      </div>

      <p className="text-caption text-neutral-600 leading-relaxed">
        {feature.plain_explanation}
      </p>
    </li>
  );
}
