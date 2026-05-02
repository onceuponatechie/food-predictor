import { Search } from 'lucide-react';
import { formatLongDate } from '../lib/format';

interface HeroProps {
  query: string;
  onQueryChange: (next: string) => void;
  /** ISO date string from the most recent prediction's data_as_of. */
  dataAsOf: string | null;
  referenceMarket: string;
}

export function Hero({ query, onQueryChange, dataAsOf, referenceMarket }: HeroProps) {
  return (
    <section
      aria-labelledby="hero-headline"
      className={[
        'relative overflow-hidden rounded-2xl',
        'border border-primary-100',
        'bg-gradient-to-br from-primary-50 via-primary-50 to-primary-100/60',
        'px-5 sm:px-8 lg:px-12 py-8 sm:py-10 lg:py-14',
      ].join(' ')}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-primary-200/40 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-32 bottom-[-80px] h-72 w-72 rounded-full bg-primary-100/60 blur-3xl"
      />

      <div className="relative max-w-2xl">
        <span className="inline-flex items-center gap-2 rounded-full bg-surface/70 backdrop-blur px-3 py-1 text-micro font-medium uppercase tracking-wider text-primary-700 border border-primary-100">
          <span className="h-1.5 w-1.5 rounded-full bg-primary-500" />
          Free · Updated weekly
        </span>

        <h1
          id="hero-headline"
          className="mt-5 text-h1 sm:text-display font-semibold tracking-tight text-neutral-900"
        >
          Know what food prices will do, and why.
        </h1>

        <p className="mt-4 text-body-lg text-neutral-700 max-w-xl">
          Free price forecasts for everyday Nigerian commodities, updated weekly.
          Built for the household.
        </p>

        <div className="mt-7 sm:mt-8">
          <HeroSearch query={query} onQueryChange={onQueryChange} />
        </div>

        {dataAsOf ? (
          <p className="mt-4 text-caption text-neutral-500">
            Predictions updated {formatLongDate(dataAsOf)}. Reference market: {referenceMarket}.
          </p>
        ) : null}
      </div>
    </section>
  );
}

function HeroSearch({
  query,
  onQueryChange,
}: Pick<HeroProps, 'query' | 'onQueryChange'>) {
  return (
    <label
      className={[
        'flex items-center gap-3 h-12 sm:h-14 rounded-xl bg-surface',
        'border border-primary-100 shadow-sm',
        'pl-4 pr-2',
        'focus-within:shadow-focus focus-within:border-primary-300',
        'transition-all duration-base',
      ].join(' ')}
    >
      <Search
        className="h-5 w-5 text-neutral-500 shrink-0"
        strokeWidth={2}
        aria-hidden="true"
      />
      <input
        type="search"
        inputMode="search"
        autoComplete="off"
        value={query}
        onChange={(e) => onQueryChange(e.target.value)}
        placeholder="Search a food item — tomato, rice, yam…"
        aria-label="Search food items"
        className="flex-1 min-w-0 bg-transparent border-0 outline-none text-body sm:text-body-lg placeholder:text-neutral-500 text-neutral-900"
      />
    </label>
  );
}
