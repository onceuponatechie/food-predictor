import { SearchX } from 'lucide-react';

interface EmptySearchStateProps {
  query: string;
}

export function EmptySearchState({ query }: EmptySearchStateProps) {
  return (
    <div
      role="status"
      className="col-span-full flex flex-col items-center text-center gap-3 rounded-xl border border-dashed border-neutral-200 bg-surface px-6 py-12"
    >
      <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-neutral-100 text-neutral-500">
        <SearchX className="h-5 w-5" strokeWidth={1.75} aria-hidden="true" />
      </span>
      <p className="text-body-lg font-medium text-neutral-900">
        We don't track "{query}" yet
      </p>
      <p className="max-w-md text-body text-neutral-500">
        It's on our list. For now, try searching for{' '}
        <span className="font-medium text-neutral-700">tomato</span>,{' '}
        <span className="font-medium text-neutral-700">rice</span>, or{' '}
        <span className="font-medium text-neutral-700">yam</span>.
      </p>
    </div>
  );
}
