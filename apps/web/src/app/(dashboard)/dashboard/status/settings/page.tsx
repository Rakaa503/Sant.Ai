import { prisma } from "@/lib/db";
import { getAuthSession } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { Globe, Lock, Palette, Eye } from "lucide-react";

const ALLOWED_ROLES = new Set(["sudo"]);

export default async function StatusSettingsPage() {
  const session = await getAuthSession(await headers());
  if (!session?.user?.id) redirect("/login");
  if (!ALLOWED_ROLES.has(session.user.role?.toLowerCase() ?? "")) redirect("/unauthorized");

  const settings = await prisma.statusPageSettings.findUnique({ where: { id: "default" } });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold text-text">Status Page Settings</h1>
        <p className="text-xs text-muted">Configure your public status page appearance and behavior.</p>
      </div>

      {settings ? (
        <div className="space-y-4">
          <div className="rounded-xl border border-border bg-card p-5">
            <div className="flex items-center gap-2">
              <Globe className="h-4 w-4 text-primary" />
              <h2 className="text-sm font-semibold text-text">General</h2>
            </div>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <div>
                <p className="text-[10px] font-medium uppercase tracking-wider text-muted">Title</p>
                <p className="mt-1 text-sm text-text">{settings.title}</p>
              </div>
              <div>
                <p className="text-[10px] font-medium uppercase tracking-wider text-muted">Custom Domain</p>
                <p className="mt-1 text-sm text-text">{settings.customDomain || "Not set"}</p>
              </div>
              <div className="sm:col-span-2">
                <p className="text-[10px] font-medium uppercase tracking-wider text-muted">Description</p>
                <p className="mt-1 text-sm text-text">{settings.description || "Not set"}</p>
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-border bg-card p-5">
            <div className="flex items-center gap-2">
              <Palette className="h-4 w-4 text-primary" />
              <h2 className="text-sm font-semibold text-text">Appearance</h2>
            </div>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <div>
                <p className="text-[10px] font-medium uppercase tracking-wider text-muted">Theme</p>
                <p className="mt-1 text-sm text-text capitalize">{settings.theme}</p>
              </div>
              <div>
                <p className="text-[10px] font-medium uppercase tracking-wider text-muted">Brand Color</p>
                <div className="mt-1 flex items-center gap-2">
                  <span className="h-4 w-4 rounded-full border border-border" style={{ backgroundColor: settings.brandColor }} />
                  <span className="text-sm text-text">{settings.brandColor}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-border bg-card p-5">
            <div className="flex items-center gap-2">
              <Eye className="h-4 w-4 text-primary" />
              <h2 className="text-sm font-semibold text-text">Display Options</h2>
            </div>
            <div className="mt-4 grid gap-4 sm:grid-cols-3">
              <div className="flex items-center justify-between rounded-lg bg-surface px-4 py-3">
                <p className="text-xs text-text">Show Uptime</p>
                <span className={`text-xs font-medium ${settings.showUptime ? "text-emerald-500" : "text-muted"}`}>
                  {settings.showUptime ? "On" : "Off"}
                </span>
              </div>
              <div className="flex items-center justify-between rounded-lg bg-surface px-4 py-3">
                <p className="text-xs text-text">Show Response Time</p>
                <span className={`text-xs font-medium ${settings.showResponseTime ? "text-emerald-500" : "text-muted"}`}>
                  {settings.showResponseTime ? "On" : "Off"}
                </span>
              </div>
              <div className="flex items-center justify-between rounded-lg bg-surface px-4 py-3">
                <p className="text-xs text-text">Show History</p>
                <span className={`text-xs font-medium ${settings.showHistory ? "text-emerald-500" : "text-muted"}`}>
                  {settings.showHistory ? "On" : "Off"}
                </span>
              </div>
            </div>
            <div className="mt-3">
              <p className="text-[10px] font-medium uppercase tracking-wider text-muted">History Days</p>
              <p className="mt-1 text-sm text-text">{settings.historyDays} days</p>
            </div>
          </div>

          <div className="rounded-xl border border-border bg-card p-5">
            <div className="flex items-center gap-2">
              <Lock className="h-4 w-4 text-primary" />
              <h2 className="text-sm font-semibold text-text">Access</h2>
            </div>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <div className="flex items-center justify-between rounded-lg bg-surface px-4 py-3">
                <p className="text-xs text-text">Public API Access</p>
                <span className={`text-xs font-medium ${settings.publicApiAccess ? "text-emerald-500" : "text-muted"}`}>
                  {settings.publicApiAccess ? "On" : "Off"}
                </span>
              </div>
              <div className="flex items-center justify-between rounded-lg bg-surface px-4 py-3">
                <p className="text-xs text-text">Password Protected</p>
                <span className={`text-xs font-medium ${settings.password ? "text-emerald-500" : "text-muted"}`}>
                  {settings.password ? "Yes" : "No"}
                </span>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center rounded-xl border border-border bg-card py-12">
          <Globe className="h-8 w-8 text-muted" />
          <p className="mt-3 text-sm font-medium text-text">No Settings Configured</p>
          <p className="mt-1 text-xs text-muted">Default settings will be used for the public status page.</p>
        </div>
      )}
    </div>
  );
}
