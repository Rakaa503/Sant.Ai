import { prisma } from "@/lib/db";
import { getAuthSession } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Plus, Pause, Play, Trash2 } from "lucide-react";

const ALLOWED_ROLES = new Set(["sudo"]);

export default async function MonitorsPage() {
  const session = await getAuthSession(await headers());
  if (!session?.user?.id) redirect("/login");
  if (!ALLOWED_ROLES.has(session.user.role?.toLowerCase() ?? "")) redirect("/unauthorized");

  const monitors = await prisma.monitor.findMany({
    include: { service: true, monitorChecks: { orderBy: { checkedAt: "desc" }, take: 1 } },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-text">Monitors</h1>
          <p className="text-xs text-muted">HTTP, Ping, Port, and SSL monitors for your services.</p>
        </div>
        <Link
          href="/dashboard/status/monitors/new"
          className="inline-flex items-center gap-1.5 rounded-lg bg-primary px-3 py-1.5 text-[11px] font-medium text-white hover:bg-primary/90"
        >
          <Plus className="h-3.5 w-3.5" /> Add Monitor
        </Link>
      </div>

      <div className="rounded-xl border border-border bg-card">
        <div className="grid grid-cols-[1fr_120px_100px_100px_80px] gap-4 border-b border-border px-5 py-3 text-[10px] font-semibold text-muted">
          <span>Name / Service</span>
          <span>Type</span>
          <span>Interval</span>
          <span>Last Check</span>
          <span className="text-right">Actions</span>
        </div>
        <div className="divide-y divide-border">
          {monitors.map((m) => {
            const last = m.monitorChecks[0];
            const isOnline = last?.status === "up";
            return (
              <div key={m.id} className="grid grid-cols-[1fr_120px_100px_100px_80px] gap-4 px-5 py-3 text-xs">
                <div>
                  <p className="font-medium text-text">{m.name}</p>
                  <p className="text-[10px] text-muted">{m.service.name}</p>
                </div>
                <span className="self-center text-muted">{m.type}</span>
                <span className="self-center text-muted">every {m.interval}s</span>
                <div className="flex items-center gap-2 self-center">
                  <span className={`h-2 w-2 rounded-full ${isOnline ? "bg-emerald-500" : "bg-red-500"}`} />
                  <span className="text-muted">{last ? new Date(last.checkedAt).toLocaleDateString() : "Never"}</span>
                </div>
                <div className="flex items-center justify-end gap-1 self-center">
                  <button className="rounded-md p-1 text-muted hover:bg-surface hover:text-text" title={m.paused ? "Resume" : "Pause"}>
                    {m.paused ? <Play className="h-3.5 w-3.5" /> : <Pause className="h-3.5 w-3.5" />}
                  </button>
                  <button className="rounded-md p-1 text-muted hover:bg-surface hover:text-red-500" title="Delete">
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
          {monitors.length === 0 && (
            <p className="px-5 py-8 text-center text-xs text-muted">No monitors configured. Add one to start tracking service health.</p>
          )}
        </div>
      </div>
    </div>
  );
}
