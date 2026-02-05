import { Skeleton } from "../../../components/common/Skeleton";

export function TaskCardSkeleton() {
  return (
    <div className="flex flex-col gap-4 rounded-2xl bg-white p-5 shadow-sm border border-slate-100">
      <div className="flex flex-col gap-2">
        <Skeleton className="h-4 w-3/4 rounded-lg" />
        <Skeleton className="h-3 w-full rounded-lg" />
        <Skeleton className="h-3 w-5/6 rounded-lg" />
      </div>

      <div className="flex items-center justify-between border-t border-slate-50 pt-3">
        <Skeleton className="h-5 w-16 rounded-lg" />
        <Skeleton variant="circle" className="h-7 w-7" />
      </div>
    </div>
  );
}
