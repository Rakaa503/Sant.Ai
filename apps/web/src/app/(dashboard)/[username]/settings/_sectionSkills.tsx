"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Loader2, X } from "lucide-react";
import { updateProfileSettings } from "@/lib/actions";

const SUGGESTED_SKILLS = [
  "React", "Next.js", "Laravel", "Python", "TypeScript",
  "Node.js", "Docker", "PostgreSQL", "Tailwind CSS", "Figma",
  "Go", "Rust", "GraphQL", "Redis", "Kubernetes",
  "Vue.js", "Angular", "Flutter", "Swift", "Java",
];

interface Props {
  skills: string[];
}

export default function SectionSkills({ skills }: Props) {
  const [saving, setSaving] = useState(false);
  const [items, setItems] = useState<string[]>(skills);
  const [input, setInput] = useState("");

  const hasChanges = JSON.stringify(items.sort()) !== JSON.stringify([...skills].sort());

  const handleSave = async () => {
    setSaving(true);
    try {
      await updateProfileSettings({ skills: items });
      toast.success("Skills updated");
    } catch (e: any) {
      toast.error(e.message || "Failed to update");
    } finally {
      setSaving(false);
    }
  };

  const addSkill = (skill: string) => {
    if (!items.includes(skill)) {
      setItems([...items, skill]);
    }
  };

  const removeSkill = (skill: string) => {
    setItems(items.filter((s) => s !== skill));
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && input.trim()) {
      e.preventDefault();
      const val = input.trim();
      if (!items.includes(val)) {
        setItems([...items, val]);
      }
      setInput("");
    }
  };

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-sm font-semibold text-text">Skills</h3>
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
      <div className="mb-3 flex flex-wrap gap-1.5">
        {items.map((item) => (
          <span
            key={item}
            className="inline-flex items-center gap-1 rounded-lg border border-emerald-500/20 bg-emerald-500/10 px-2.5 py-1 text-[11px] font-medium text-emerald-600 dark:text-emerald-400"
          >
            {item}
            <button onClick={() => removeSkill(item)} className="hover:opacity-70">
              <X className="h-3 w-3" />
            </button>
          </span>
        ))}
      </div>
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Type and press Enter to add..."
        className="mb-3 w-full rounded-lg border border-border bg-surface/50 px-3 py-2 text-sm text-text outline-none placeholder:text-muted/50 focus:border-primary/30"
      />
      <p className="mb-2 text-[11px] text-muted">Suggestions</p>
      <div className="flex flex-wrap gap-1.5">
        {SUGGESTED_SKILLS.filter((s) => !items.includes(s)).map((s) => (
          <button
            key={s}
            onClick={() => addSkill(s)}
            className="rounded-lg border border-border px-2.5 py-1 text-[11px] text-muted transition-colors hover:border-primary/30 hover:text-text"
          >
            + {s}
          </button>
        ))}
      </div>
    </div>
  );
}
