import type { HistoricalAccuracy } from '../types/prediction';
import { formatLongDate, formatSignedPercent } from '../lib/format';

interface AccuracyTransparencyProps {
  accuracy: HistoricalAccuracy;
}

export function AccuracyTransparency({ accuracy }: AccuracyTransparencyProps) {
  return (
    <section
      aria-labelledby="accuracy-heading"
      className="rounded-2xl bg-surface border border-neutral-200 shadow-sm p-5 sm:p-8"
    >
      <h2 id="accuracy-heading" className="text-h2 font-semibold text-neutral-900">
        How we did last time
      </h2>
      <p className="mt-1.5 text-caption text-neutral-500">
        Forecast issued {formatLongDate(accuracy.last_prediction_date)}.
      </p>

      <dl className="mt-6 grid grid-cols-2 gap-4 sm:max-w-md">
        <ReadingPair label="We predicted" value={formatSignedPercent(accuracy.last_predicted_change)} />
        <ReadingPair label="Actual move" value={formatSignedPercent(accuracy.last_actual_change)} emphasis />
      </dl>

      <p className="mt-6 text-body text-neutral-700 leading-relaxed max-w-3xl">
        {accuracy.accuracy_note}
      </p>
    </section>
  );
}

interface ReadingPairProps {
  label: string;
  value: string;
  emphasis?: boolean;
}

function ReadingPair({ label, value, emphasis }: ReadingPairProps) {
  return (
    <div className="flex flex-col gap-1 rounded-xl border border-neutral-100 bg-neutral-50/60 px-4 py-3">
      <dt className="text-micro font-medium uppercase tracking-wider text-neutral-500">{label}</dt>
      <dd
        className={[
          'numeric font-semibold tracking-tight text-h2',
          emphasis ? 'text-neutral-900' : 'text-neutral-700',
        ].join(' ')}
      >
        {value}
      </dd>
    </div>
  );
}
