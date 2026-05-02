export function CommodityCardSkeleton() {
  return (
    <div
      className="flex flex-col gap-5 rounded-xl bg-surface p-5 sm:p-6 border border-neutral-200/80 shadow-sm"
      aria-hidden="true"
    >
      <div className="flex items-start justify-between gap-3">
        <span className="h-10 w-10 rounded-lg bg-neutral-100 shimmer" />
        <span className="h-7 w-28 rounded-full bg-neutral-100 shimmer" />
      </div>

      <div className="flex flex-col gap-2">
        <span className="h-5 w-32 rounded-md bg-neutral-100 shimmer" />
        <span className="h-8 w-40 rounded-md bg-neutral-100 shimmer" />
        <span className="h-3 w-24 rounded-md bg-neutral-100 shimmer" />
      </div>

      <span className="h-4 w-full rounded-md bg-neutral-100 shimmer" />
      <span className="h-4 w-3/4 rounded-md bg-neutral-100 shimmer -mt-3" />

      <div className="mt-auto flex items-center justify-between border-t border-neutral-100 pt-4">
        <span className="h-3 w-28 rounded-md bg-neutral-100 shimmer" />
        <span className="h-3 w-12 rounded-md bg-neutral-100 shimmer" />
      </div>
    </div>
  );
}
