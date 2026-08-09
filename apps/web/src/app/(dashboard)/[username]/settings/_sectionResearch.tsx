"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { updateProfileSettings } from "@/lib/actions";

interface Research {
  researchInterests: string;
  currentResearchTopic: string;
  favoriteAcademicFields: string;
  academicGoals: string;
}

interface Props {
  researchProfile: Research;
}

const defaultResearch: Research = {
  researchInterests: "",
  currentResearchTopic: "",
  favoriteAcademicFields: "",
  academicGoals: "",
};

export default function SectionResearch({ researchProfile }: Props) {
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState<Research>({ ...defaultResearch, ...researchProfile });

  const hasChanges = JSON.stringify(form) !== JSON.stringify({ ...defaultResearch, ...researchProfile });

  const handleSave = async () => {
    setSaving(true);
    try {
      await updateProfileSettings({ researchProfile: form });
      toast.success("Research profile updated");
    } catch (e: any) {
      toast.error(e.message || "Failed to update");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-sm font-semibold text-text">Research Profile</h3>
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
      <div className="space-y-3">
        <div>
          <label className="mb-1 block text-xs text-muted">Research Interests</label>
          <input
            value={form.researchInterests}
            onChange={(e) => setForm({ ...form, researchInterests: e.target.value })}
            placeholder="e.g., Machine Learning, NLP, Computer Vision"
            className="w-full rounded-lg border border-border bg-surface/50 px-3 py-2 text-sm text-text outline-none placeholder:text-muted/50 focus:border-primary/30"
          />
        </div>
        <div>
          <label className="mb-1 block text-xs text-muted">Current Research Topic</label>
          <input
            value={form.currentResearchTopic}
            onChange={(e) => setForm({ ...form, currentResearchTopic: e.target.value })}
            placeholder="e.g., Sentiment Analysis for Indonesian Tweets"
            className="w-full rounded-lg border border-border bg-surface/50 px-3 py-2 text-sm text-text outline-none placeholder:text-muted/50 focus:border-primary/30"
          />
        </div>
        <div>
          <label className="mb-1 block text-xs text-muted">Favorite Academic Fields</label>
          <input
            value={form.favoriteAcademicFields}
            onChange={(e) => setForm({ ...form, favoriteAcademicFields: e.target.value })}
            placeholder="e.g., Mathematics, Statistics, Linguistics"
            className="w-full rounded-lg border border-border bg-surface/50 px-3 py-2 text-sm text-text outline-none placeholder:text-muted/50 focus:border-primary/30"
          />
        </div>
        <div>
          <label className="mb-1 block text-xs text-muted">Academic Goals</label>
          <textarea
            value={form.academicGoals}
            onChange={(e) => setForm({ ...form, academicGoals: e.target.value })}
            rows={2}
            placeholder="What do you hope to achieve in your academic journey?"
            className="w-full rounded-lg border border-border bg-surface/50 px-3 py-2 text-sm text-text outline-none placeholder:text-muted/50 focus:border-primary/30 resize-none"
          />
        </div>
        <p className="text-[10px] text-muted">All fields are optional.</p>
      </div>
    </div>
  );
}
