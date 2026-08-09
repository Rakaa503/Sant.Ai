import { prisma } from "@/lib/db";
import { getAuthSession } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import Link from "next/link";
import { AlertTriangle, Clock } from "lucide-react";

const ALLOWED_ROLES = new Set(["sudo"]);

const statusStyles: Record<string, string> = {
  Operational: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800",
  DegradedPerformance: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-200 dark:border-amber-800",
  PartialOutage: "bg-orange-500/10 text-orange-600 dark:text-orange-400 border-orange-200 dark:border-orange-800",
  MajorOutage: "bg-red-500/10 text-red-600 dark:text-red-400 border-red-200 dark:border-red-800",
  UnderMaintenance: "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-200 dark:border-blue-800",
};

export default async function StatusOverviewPage() {
  const session = await getAuthSession(await headers());
  if (!session?.user?.id) redirect("/login");
  if (!ALLOWED_ROLES.has(session.user.role?.toLowerCase() ?? "")) redirect("/unauthorized");

  const [services, incidents, maintenances] = await Promise.all([
    prisma.statusService.findMany({ orderBy: { order: "asc" } }),
    prisma.incident.findMany({ where: { status: { not: "Resolved" } }, orderBy: { createdAt: "desc" }, take: 5 }),
    prisma.maintenance.findMany({ where: { status: { in: ["scheduled", "in_progress"] } }, orderBy: { scheduledAt: "asc" }, take: 5 }),
  ]);

  const totalServices = services.length;
  const operationalCount = services.filter((s) => s.status === "Operational").length;
  const uptimePercent = totalServices > 0 ? Math.round((operationalCount / totalServices) * 100) : 100;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold text-text">Status Center</h1>
        <p className="text-xs text-muted">Monitor and manage your services, incidents, and maintenance.</p>
      </div>

      {/* KPI Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-xl border border-border bg-card p-4">
          <p className="text-xs text-muted">Total Services</p>
          <p className="mt-1 text-2xl font-bold text-text">{totalServices}</p>
        </div>
        <div className="rounded-xl border border-border bg-card p-4">
          <p className="text-xs text-muted">Active Incidents</p>
          <p className="mt-1 text-2xl font-bold text-text">{incidents.length}</p>
        </div>
        <div className="rounded-xl border border-border bg-card p-4">
          <p className="text-xs text-muted">Uptime</p>
          <p className="mt-1 text-2xl font-bold text-emerald-500">{uptimePercent}%</p>
        </div>
        <div className="rounded-xl border border-border bg-card p-4">
          <p className="text-xs text-muted">Upcoming Maintenance</p>
          <p className="mt-1 text-2xl font-bold text-text">{maintenances.length}</p>
        </div>
      </div>

      {/* Services List */}
      <div className="rounded-xl border border-border bg-card">
        <div className="flex items-center justify-between border-b border-border px-5 py-3">
          <h2 className="text-sm font-semibold text-text">Services</h2>
          <Link href="/dashboard/status/monitors" className="text-[10px] text-primary hover:underline">Manage Monitors</Link>
        </div>
        <div className="divide-y divide-border">
          {services.map((svc) => (
            <div key={svc.id} className="flex items-center justify-between px-5 py-3">
              <div>
                <p className="text-sm font-medium text-text">{svc.name}</p>
                {svc.description && <p className="text-[10px] text-muted">{svc.description}</p>}
              </div>
              <span className={`rounded-full border px-2.5 py-0.5 text-[10px] font-medium ${statusStyles[svc.status] || ""}`}>
                {svc.status === "Operational" ? "✓" : "●"} {svc.status.replace(/([A-Z])/g, " $1").trim()}
              </span>
            </div>
          ))}
          {services.length === 0 && (
            <p className="px-5 py-8 text-center text-xs text-muted">No services configured yet.</p>
          )}
        </div>
      </div>

      {/* Active Incidents & Maintenance */}
      <div className="grid gap-4 lg:grid-cols-2">
        <div className="rounded-xl border border-border bg-card">
          <div className="flex items-center justify-between border-b border-border px-5 py-3">
            <h2 className="text-sm font-semibold text-text">Active Incidents</h2>
            <Link href="/dashboard/status/incidents" className="text-[10px] text-primary hover:underline">View All</Link>
          </div>
          <div className="divide-y divide-border">
            {incidents.map((inc) => (
              <div key={inc.id} className="px-5 py-3">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="h-3.5 w-3.5 text-amber-500 shrink-0" />
                  <p className="text-xs font-medium text-text">{inc.title}</p>
                </div>
                <p className="mt-0.5 text-[10px] text-muted">{inc.status} · {new Date(inc.createdAt).toLocaleDateString()}</p>
              </div>
            ))}
            {incidents.length === 0 && (
              <p className="px-5 py-8 text-center text-xs text-muted">No active incidents. All services operational.</p>
            )}
          </div>
        </div>

        <div className="rounded-xl border border-border bg-card">
          <div className="flex items-center justify-between border-b border-border px-5 py-3">
            <h2 className="text-sm font-semibold text-text">Upcoming Maintenance</h2>
            <Link href="/dashboard/status/maintenance" className="text-[10px] text-primary hover:underline">View All</Link>
          </div>
          <div className="divide-y divide-border">
            {maintenances.map((m) => (
              <div key={m.id} className="px-5 py-3">
                <div className="flex items-center gap-2">
                  <Clock className="h-3.5 w-3.5 text-blue-500 shrink-0" />
                  <p className="text-xs font-medium text-text">{m.title}</p>
                </div>
                <p className="mt-0.5 text-[10px] text-muted">{m.status} · {new Date(m.scheduledAt).toLocaleDateString()}</p>
              </div>
            ))}
            {maintenances.length === 0 && (
              <p className="px-5 py-8 text-center text-xs text-muted">No scheduled maintenance.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
