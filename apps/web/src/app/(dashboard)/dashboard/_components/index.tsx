import { cn } from "@/lib/utils";

export function Card({ title, action, children, className }: {
  title?: string;
  action?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn(
      "rounded-xl border border-border bg-card p-6 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md hover:border-primary/20",
      className
    )}>
      {title && (
        <div className="mb-5 flex items-center justify-between">
          <h3 className="text-sm font-semibold text-foreground">{title}</h3>
          {action && <div className="text-xs text-muted-foreground">{action}</div>}
        </div>
      )}
      {children}
    </div>
  );
}
