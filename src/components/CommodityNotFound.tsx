import { Link } from 'react-router-dom';
import { ArrowRight, MapPinOff } from 'lucide-react';

interface CommodityNotFoundProps {
  attemptedId: string;
}

export function CommodityNotFound({ attemptedId }: CommodityNotFoundProps) {
  return (
    <section className="rounded-2xl bg-surface border border-neutral-200 shadow-sm p-8 sm:p-12 flex flex-col items-center text-center gap-4">
      <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-neutral-100 text-neutral-500">
        <MapPinOff className="h-5 w-5" strokeWidth={1.75} aria-hidden="true" />
      </span>
      <h1 className="text-h2 font-semibold text-neutral-900">
        We don't track "{attemptedId}" yet
      </h1>
      <p className="max-w-md text-body text-neutral-600">
        We're starting with a small set of everyday commodities and adding more
        as we go. Browse what we currently cover.
      </p>
      <Link
        to="/"
        className="mt-2 inline-flex items-center gap-2 rounded-lg bg-primary-500 px-5 h-11 text-body font-medium text-surface hover:bg-primary-600 transition-colors duration-base"
      >
        Browse what we cover
        <ArrowRight className="h-4 w-4" strokeWidth={2} aria-hidden="true" />
      </Link>
    </section>
  );
}
