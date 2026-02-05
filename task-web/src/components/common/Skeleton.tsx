
interface SkeletonProps {
  className?: string;
  variant?: "rectangle" | "circle" | "rounded";
}

export function Skeleton({ className = "", variant = "rectangle" }: SkeletonProps) {
  const baseClasses = "animate-pulse bg-slate-200";
  
  const variantClasses = {
    rectangle: "",
    circle: "rounded-full",
    rounded: "rounded-2xl",
  };

  return (
    <div 
      className={`${baseClasses} ${variantClasses[variant]} ${className}`} 
      aria-hidden="true" 
    />
  );
}
