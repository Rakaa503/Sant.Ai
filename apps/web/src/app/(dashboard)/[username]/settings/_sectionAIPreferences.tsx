"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { updateProfileSettings } from "@/lib/actions";

interface AIPrefs {
  preferredLanguage: string;
  preferredResponseStyle: string;
  aiPersonalization: boolean;
  conversationMemory: boolean;
  smartSuggestions: boolean;
}

interface Props {
  aiPreferences: AIPrefs;
}

const LANGUAGES = ["Indonesian", "English"];
const RESPONSE_STYLES = ["Concise", "Detailed", "Academic", "Practical", "Step-by-step"];

const defaultPrefs: AIPrefs = {
  preferredLanguage: "Indonesian",
  preferredResponseStyle: "Concise",
  aiPersonalization: true,
  conversationMemory: true,
  smartSuggestions: true,
};

export default function SectionAIPreferences({ aiPreferences }: Props) {
  const [saving, setSaving] = useState(false);
  const [prefs, setPrefs] = useState<AIPrefs>({ ...defaultPrefs, ...aiPreferences });

  const hasChanges = JSON.stringify(prefs) !== JSON.stringify({ ...defaultPrefs, ...aiPreferences });

  const handleSave = async () => {
    setSaving(true);
    try {
      await updateProfileSettings({ aiPreferences: prefs });
      toast.success("AI preferences updated");
    } catch (e: any) {
      toast.error(e.message || "Failed to update");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-sm font-semibold text-text">AI MU Preferences</h3>
        {hasChanges && (
          <button
            onClick={handleSave}
            disabled={saving}
            className="flex items-center gap-1.5 rounded-md bg-text px-3 py-1.5 text-[11px] font-medium text-background transition-opacity hover:opacity-90 disabled:opacity-50"
          >
            {saving && <Loader2 className="h-3 w-3 animate-spin" />}
            {saving ? "Saving..." : "Save"}
          </button>
        )}
      </div>
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="mb-1 block text-xs text-muted">Preferred Language</label>
            <select
              value={prefs.preferredLanguage}
              onChange={(e) => setPrefs({ ...prefs, preferredLanguage: e.target.value })}
              className="w-full rounded-lg border border-border bg-surface/50 px-3 py-2 text-sm text-text outline-none focus:border-primary/30"
            >
              {LANGUAGES.map((l) => (
                <option key={l} value={l}>{l}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="mb-1 block text-xs text-muted">Response Style</label>
            <select
              value={prefs.preferredResponseStyle}
              onChange={(e) => setPrefs({ ...prefs, preferredResponseStyle: e.target.value })}
              className="w-full rounded-lg border border-border bg-surface/50 px-3 py-2 text-sm text-text outline-none focus:border-primary/30"
            >
              {RESPONSE_STYLES.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>
        </div>
        <div className="space-y-2">
          <ToggleRow
            label="AI Personalization"
            description="Allow AI MU to learn from your interactions"
            checked={prefs.aiPersonalization}
            onChange={(v) => setPrefs({ ...prefs, aiPersonalization: v })}
          />
          <ToggleRow
            label="Conversation Memory"
            description="AI MU remembers context across conversations"
            checked={prefs.conversationMemory}
            onChange={(v) => setPrefs({ ...prefs, conversationMemory: v })}
          />
          <ToggleRow
            label="Smart Suggestions"
            description="Get proactive suggestions based on your activity"
            checked={prefs.smartSuggestions}
            onChange={(v) => setPrefs({ ...prefs, smartSuggestions: v })}
          />
        </div>
      </div>
    </div>
  );
}

function ToggleRow({ label, description, checked, onChange }: {
  label: string;
  description: string;
  checked: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <div className="flex items-center justify-between rounded-lg border border-border bg-surface/50 px-3 py-2.5">
      <div>
        <p className="text-xs font-medium text-text">{label}</p>
        <p className="text-[10px] text-muted">{description}</p>
      </div>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        className={`relative h-5 w-9 shrink-0 rounded-full transition-colors ${checked ? "bg-primary" : "bg-border"}`}
      >
        <span className={`absolute left-0.5 top-0.5 h-4 w-4 rounded-full bg-white transition-transform ${checked ? "translate-x-4" : "translate-x-0"}`} />
      </button>
    </div>
  );
}
