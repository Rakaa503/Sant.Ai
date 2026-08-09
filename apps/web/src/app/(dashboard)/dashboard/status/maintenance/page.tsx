import { prisma } from "@/lib/db";
import { getAuthSession } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Plus, Clock, Calendar } from "lucide-react";

const ALLOWED_ROLES = new Set(["sudo"]);

const statusStyles: Record<string, string> = {
  scheduled: "bg-blue-500/10 text-blue-600 border-blue-200 dark:border-blue-800",
  in_progress: "bg-amber-500/10 text-amber-600 border-amber-200 dark:border-amber-800",
  completed: "bg-emerald-500/10 text-emerald-600 border-emerald-200 dark:border-emerald-800",
  cancelled: "bg-muted/10 text-muted border-border",
};

export default async function MaintenancePage() {
  const session = await getAuthSession(await headers());
  if (!session?.user?.id) redirect("/login");
  if (!ALLOWED_ROLES.has(session.user.role?.toLowerCase() ?? "")) redirect("/unauthorized");

  const maintenances = await prisma.maintenance.findMany({
    include: { services: { include: { service: true } } },
    orderBy: { scheduledAt: "desc" },
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-text">Maintenance</h1>
          <p className="text-xs text-muted">Schedule and manage maintenance windows.</p>
        </div>
        <Link
          href="/dashboard/status/maintenance/new"
          className="inline-flex items-center gap-1.5 rounded-lg bg-primary px-3 py-1.5 text-[11px] font-medium text-white hover:bg-primary/90"
        >
          <Plus className="h-3.5 w-3.5" /> Schedule
        </Link>
      </div>

      <div className="space-y-3">
        {maintenances.map((m) => (
          <div key={m.id} className="rounded-xl border border-border bg-card p-5">
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-start gap-3">
                <Calendar className="mt-0.5 h-4 w-4 shrink-0 text-blue-500" />
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-semibold text-text">{m.title}</h3>
                    <span className={`rounded-full border px-2 py-0.5 text-[10px] font-medium capitalize ${statusStyles[m.status] || ""}`}>
                      {m.status.replace("_", " ")}
                    </span>
                  </div>
                  <p className="mt-1 text-xs text-muted">{m.description}</p>
                  <div className="mt-2 flex items-center gap-3 text-[10px] text-muted">
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {new Date(m.scheduledAt).toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" })}
                    </span>
                    {m.completedAt && (
                      <span>Completed {new Date(m.completedAt).toLocaleDateString("en-US", { month: "short", day: "numeric" })}</span>
                    )}
                  </div>
                  {m.services.length > 0 && (
                    <div className="mt-2 flex flex-wrap gap-1">
                      {m.services.map((s) => (
                        <span key={s.serviceId} className="rounded-md bg-surface px-2 py-0.5 text-[10px] text-muted">
                          {s.service.name}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
        {maintenances.length === 0 && (
          <div className="flex flex-col items-center justify-center rounded-xl border border-border bg-card py-12">
            <Calendar className="h-8 w-8 text-muted" />
            <p className="mt-3 text-sm font-medium text-text">No Maintenance Scheduled</p>
            <p className="mt-1 text-xs text-muted">Schedule maintenance windows to notify users of planned downtime.</p>
          </div>
        )}
      </div>
    </div>
  );
}
