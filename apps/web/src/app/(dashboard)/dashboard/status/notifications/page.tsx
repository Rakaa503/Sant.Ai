import { prisma } from "@/lib/db";
import { getAuthSession } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Plus, Mail, Slack, MessageCircle, Globe, Webhook, ToggleLeft, ToggleRight } from "lucide-react";

const ALLOWED_ROLES = new Set(["sudo"]);

const providerIcons: Record<string, React.ReactNode> = {
  email: <Mail className="h-4 w-4" />,
  slack: <Slack className="h-4 w-4" />,
  discord: <MessageCircle className="h-4 w-4" />,
  telegram: <MessageCircle className="h-4 w-4" />,
  webhook: <Webhook className="h-4 w-4" />,
};

export default async function NotificationsPage() {
  const session = await getAuthSession(await headers());
  if (!session?.user?.id) redirect("/login");
  if (!ALLOWED_ROLES.has(session.user.role?.toLowerCase() ?? "")) redirect("/unauthorized");

  const providers = await prisma.notificationProvider.findMany({ orderBy: { createdAt: "desc" } });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-text">Notifications</h1>
          <p className="text-xs text-muted">Configure notification channels for incident alerts.</p>
        </div>
        <Link
          href="/dashboard/status/notifications/new"
          className="inline-flex items-center gap-1.5 rounded-lg bg-primary px-3 py-1.5 text-[11px] font-medium text-white hover:bg-primary/90"
        >
          <Plus className="h-3.5 w-3.5" /> Add Channel
        </Link>
      </div>

      <div className="rounded-xl border border-border bg-card">
        <div className="grid grid-cols-[1fr_120px_100px_80px] gap-4 border-b border-border px-5 py-3 text-[10px] font-semibold text-muted">
          <span>Name</span>
          <span>Type</span>
          <span>Status</span>
          <span className="text-right">Enabled</span>
        </div>
        <div className="divide-y divide-border">
          {providers.map((p) => (
            <div key={p.id} className="grid grid-cols-[1fr_120px_100px_80px] gap-4 px-5 py-3 text-xs">
              <div className="flex items-center gap-2">
                <span className="text-muted">{providerIcons[p.type] || <Globe className="h-4 w-4" />}</span>
                <span className="font-medium text-text">{p.name}</span>
              </div>
              <span className="self-center text-muted capitalize">{p.type}</span>
              <span className={`self-center font-medium ${p.enabled ? "text-emerald-500" : "text-muted"}`}>
                {p.enabled ? "Active" : "Disabled"}
              </span>
              <div className="flex items-center justify-end self-center">
                {p.enabled ? <ToggleRight className="h-5 w-5 text-emerald-500" /> : <ToggleLeft className="h-5 w-5 text-muted" />}
              </div>
            </div>
          ))}
          {providers.length === 0 && (
            <p className="px-5 py-8 text-center text-xs text-muted">No notification channels configured.</p>
          )}
        </div>
      </div>
    </div>
  );
}
