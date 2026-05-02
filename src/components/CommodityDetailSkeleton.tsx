export function CommodityDetailSkeleton() {
  return (
    <div className="flex flex-col gap-6 sm:gap-8" aria-hidden="true">
      <div className="rounded-2xl bg-surface border border-neutral-200 shadow-sm p-5 sm:p-8">
        <div className="flex items-center gap-3">
          <span className="h-11 w-11 rounded-lg shimmer" />
          <span className="h-7 w-40 rounded-md shimmer" />
        </div>
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-[1fr_auto_1fr] gap-4 sm:gap-6">
          <SkeletonPriceColumn />
          <span className="hidden sm:block self-center h-5 w-5 rounded-full shimmer" />
          <SkeletonPriceColumn />
        </div>
        <span className="mt-8 block h-5 w-3/4 rounded-md shimmer" />
        <span className="mt-2 block h-5 w-1/2 rounded-md shimmer" />
        <span className="mt-5 inline-block h-7 w-44 rounded-full shimmer" />
      </div>

      <div className="rounded-2xl bg-surface border border-neutral-200 shadow-sm p-5 sm:p-8">
        <span className="h-6 w-48 rounded-md shimmer" />
        <div className="mt-6 flex flex-col gap-6">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="flex flex-col gap-2.5">
              <div className="flex items-center justify-between">
                <span className="h-4 w-32 rounded-md shimmer" />
                <span className="h-4 w-12 rounded-md shimmer" />
              </div>
              <span className="h-1.5 w-full rounded-full shimmer" />
              <span className="h-4 w-3/4 rounded-md shimmer" />
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-2xl bg-surface border border-neutral-200 shadow-sm p-5 sm:p-8">
        <span className="h-6 w-44 rounded-md shimmer" />
        <div className="mt-6 grid grid-cols-2 gap-4 sm:max-w-md">
          <span className="h-16 rounded-xl shimmer" />
          <span className="h-16 rounded-xl shimmer" />
        </div>
        <span className="mt-6 block h-5 w-2/3 rounded-md shimmer" />
      </div>
    </div>
  );
}

function SkeletonPriceColumn() {
  return (
    <div className="rounded-xl border border-neutral-100 bg-neutral-50/60 px-4 sm:px-5 py-4 sm:py-5 flex flex-col gap-3">
      <span className="h-3 w-16 rounded-md shimmer" />
      <span className="h-9 sm:h-12 w-40 rounded-md shimmer" />
      <span className="h-3 w-32 rounded-md shimmer" />
    </div>
  );
}
