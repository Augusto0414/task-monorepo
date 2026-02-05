import { Skeleton } from "../../../components/common/Skeleton";

export function SummaryCardSkeleton() {
  return (
    <div className="flex flex-col gap-1 rounded-2xl bg-white p-5 shadow-[0px_18px_40px_rgba(112,144,176,0.12)] border border-slate-50">
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-2">
          <Skeleton className="h-3 w-16 rounded-lg" />
          <Skeleton className="h-8 w-12 rounded-lg" />
        </div>
        <Skeleton variant="circle" className="h-12 w-12" />
      </div>
    </div>
  );
}
