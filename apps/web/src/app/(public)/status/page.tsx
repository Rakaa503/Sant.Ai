import { prisma } from "@/lib/db";
import { CheckCircle, AlertTriangle, XCircle, Clock, Wrench } from "lucide-react";

const statusConfig: Record<string, { icon: React.ReactNode; color: string; label: string }> = {
  Operational: {
    icon: <CheckCircle className="h-4 w-4" />,
    color: "text-emerald-500",
    label: "All Systems Operational",
  },
  DegradedPerformance: {
    icon: <AlertTriangle className="h-4 w-4" />,
    color: "text-amber-500",
    label: "Degraded Performance",
  },
  PartialOutage: {
    icon: <AlertTriangle className="h-4 w-4" />,
    color: "text-orange-500",
    label: "Partial Outage",
  },
  MajorOutage: {
    icon: <XCircle className="h-4 w-4" />,
    color: "text-red-500",
    label: "Major Outage",
  },
  UnderMaintenance: {
    icon: <Wrench className="h-4 w-4" />,
    color: "text-blue-500",
    label: "Under Maintenance",
  },
};

const statusOrder = ["Operational", "DegradedPerformance", "PartialOutage", "MajorOutage", "UnderMaintenance"];

const severityColors: Record<string, string> = {
  minor: "border-l-amber-500",
  major: "border-l-orange-500",
  critical: "border-l-red-500",
};

export default async function PublicStatusPage() {
  const [services, activeIncidents, scheduledMaintenance] = await Promise.all([
    prisma.statusService.findMany({ orderBy: { order: "asc" } }),
    prisma.incident.findMany({
      where: { status: { not: "Resolved" } },
      include: { services: { include: { service: true } }, updates: { orderBy: { createdAt: "desc" }, take: 1 } },
      orderBy: { createdAt: "desc" },
    }),
    prisma.maintenance.findMany({
      where: { status: { in: ["scheduled", "in_progress"] } },
      include: { services: { include: { service: true } } },
      orderBy: { scheduledAt: "asc" },
    }),
  ]);

  const allOperational = services.every((s) => s.status === "Operational");
  const grouped = statusOrder.map((status) => ({
    status,
    services: services.filter((s) => s.status === status),
    config: statusConfig[status],
  })).filter((g) => g.services.length > 0);

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-2xl px-4 py-16">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-bold text-text">Sant.Ai Status</h1>
          <p className="mt-2 text-sm text-muted">
            {allOperational
              ? "All services are operational."
              : "Some services are experiencing issues."}
          </p>
          <div className={`mt-4 inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-sm font-medium ${
            allOperational
              ? "bg-emerald-500/10 text-emerald-600"
              : "bg-amber-500/10 text-amber-600"
          }`}>
            {allOperational ? (
              <CheckCircle className="h-4 w-4" />
            ) : (
              <AlertTriangle className="h-4 w-4" />
            )}
            {allOperational ? "All Systems Operational" : "Degraded Performance"}
          </div>
          <p className="mt-3 text-xs text-muted">
            {new Date().toLocaleDateString("en-US", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        </div>

        {/* Services */}
        <div className="space-y-2">
          {services.map((svc) => {
            const cfg = statusConfig[svc.status];
            return (
              <div
                key={svc.id}
                className="flex items-center justify-between rounded-xl border border-border bg-card px-5 py-3.5"
              >
                <div className="flex items-center gap-3">
                  <span className={cfg?.color || "text-muted"}>{cfg?.icon}</span>
                  <div>
                    <p className="text-sm font-medium text-text">{svc.name}</p>
                    {svc.description && (
                      <p className="text-xs text-muted">{svc.description}</p>
                    )}
                  </div>
                </div>
                <span className={`text-xs font-medium ${cfg?.color || "text-muted"}`}>
                  {cfg?.label || svc.status}
                </span>
              </div>
            );
          })}
          {services.length === 0 && (
            <p className="py-8 text-center text-sm text-muted">No services configured yet.</p>
          )}
        </div>

        {/* Active Incidents */}
        {activeIncidents.length > 0 && (
          <div className="mt-10">
            <h2 className="mb-4 text-sm font-semibold text-text">Active Incidents</h2>
            <div className="space-y-3">
              {activeIncidents.map((inc) => (
                <div key={inc.id} className={`rounded-xl border border-border bg-card p-5 border-l-4 ${severityColors[inc.severity] || "border-l-amber-500"}`}>
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-2">
                        <AlertTriangle className="h-4 w-4 text-amber-500" />
                        <h3 className="text-sm font-semibold text-text">{inc.title}</h3>
                      </div>
                      <p className="mt-1 text-xs text-muted">{inc.description}</p>
                      {inc.services.length > 0 && (
                        <div className="mt-2 flex flex-wrap gap-1">
                          {inc.services.map((s) => (
                            <span key={s.serviceId} className="rounded-md bg-surface px-2 py-0.5 text-[10px] text-muted">
                              {s.service.name}
                            </span>
                          ))}
                        </div>
                      )}
                      {inc.updates[0] && (
                        <div className="mt-3 rounded-lg bg-surface p-3">
                          <p className="text-[11px] font-medium text-text">{inc.updates[0].status}</p>
                          <p className="mt-0.5 text-[10px] text-muted">{inc.updates[0].message}</p>
                        </div>
                      )}
                    </div>
                    <span className="shrink-0 text-[10px] text-muted">
                      {new Date(inc.createdAt).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Scheduled Maintenance */}
        {scheduledMaintenance.length > 0 && (
          <div className="mt-10">
            <h2 className="mb-4 text-sm font-semibold text-text">Scheduled Maintenance</h2>
            <div className="space-y-3">
              {scheduledMaintenance.map((m) => (
                <div key={m.id} className="rounded-xl border border-border bg-card p-5">
                  <div className="flex items-start gap-3">
                    <Clock className="mt-0.5 h-4 w-4 shrink-0 text-blue-500" />
                    <div>
                      <h3 className="text-sm font-semibold text-text">{m.title}</h3>
                      <p className="mt-1 text-xs text-muted">{m.description}</p>
                      <div className="mt-2 flex items-center gap-2 text-[10px] text-muted">
                        <Clock className="h-3 w-3" />
                        {new Date(m.scheduledAt).toLocaleDateString("en-US", {
                          weekday: "short",
                          month: "short",
                          day: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
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
              ))}
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="mt-12 border-t border-border pt-6 text-center">
          <p className="text-xs text-muted">
            Last checked: {new Date().toLocaleString("en-US", { hour: "2-digit", minute: "2-digit", month: "short", day: "numeric" })}
          </p>
          <p className="mt-1 text-xs text-muted">
            Powered by <span className="font-medium text-text">Sant.Ai</span>
          </p>
        </div>
      </div>
    </div>
  );
}
