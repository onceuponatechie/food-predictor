import { useEffect, useMemo, useState } from 'react';
import { Hero } from '../components/Hero';
import { CommodityCard } from '../components/CommodityCard';
import { CommodityCardSkeleton } from '../components/CommodityCardSkeleton';
import { EmptySearchState } from '../components/EmptySearchState';
import { getAllCommodities } from '../mock-data/predictions';
import type { PredictionResponse } from '../types/prediction';

export function Landing() {
  const [predictions, setPredictions] = useState<PredictionResponse[] | null>(null);
  const [query, setQuery] = useState('');

  useEffect(() => {
    let cancelled = false;
    getAllCommodities().then((data) => {
      if (!cancelled) setPredictions(data);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  const trimmedQuery = query.trim();

  const filtered = useMemo(() => {
    if (!predictions) return null;
    if (!trimmedQuery) return predictions;
    const needle = trimmedQuery.toLowerCase();
    return predictions.filter(
      (p) =>
        p.food_item.toLowerCase().includes(needle) ||
        p.food_item_id.toLowerCase().includes(needle),
    );
  }, [predictions, trimmedQuery]);

  const headerMeta = predictions?.[0] ?? null;
  const isLoading = predictions === null;
  const showEmpty = !!filtered && filtered.length === 0 && trimmedQuery.length > 0;

  return (
    <div className="flex flex-col gap-8 sm:gap-10">
      <Hero
        query={query}
        onQueryChange={setQuery}
        dataAsOf={headerMeta?.data_as_of ?? null}
        referenceMarket={headerMeta?.reference_market ?? 'Mile 12, Lagos'}
      />

      <section aria-labelledby="commodities-heading" className="flex flex-col gap-5">
        <div className="flex items-end justify-between gap-3">
          <div>
            <h2
              id="commodities-heading"
              className="text-h2 font-semibold text-neutral-900"
            >
              Tracked commodities
            </h2>
            <p className="mt-1 text-caption text-neutral-500">
              {isLoading
                ? 'Loading the latest forecasts…'
                : `${filtered?.length ?? 0} item${(filtered?.length ?? 0) === 1 ? '' : 's'}${trimmedQuery ? ` matching "${trimmedQuery}"` : ''}`}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5">
          {isLoading
            ? Array.from({ length: 8 }).map((_, i) => <CommodityCardSkeleton key={i} />)
            : showEmpty
              ? <EmptySearchState query={trimmedQuery} />
              : filtered!.map((p) => (
                  <CommodityCard key={p.food_item_id} prediction={p} />
                ))}
        </div>
      </section>
    </div>
  );
}
