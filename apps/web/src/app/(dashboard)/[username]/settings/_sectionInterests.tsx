"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Loader2, X } from "lucide-react";
import { updateProfileSettings } from "@/lib/actions";

const SUGGESTED_INTERESTS = [
  "Artificial Intelligence",
  "Data Science",
  "Web Development",
  "Machine Learning",
  "UI/UX Design",
  "Cyber Security",
  "Mobile Development",
  "Cloud Computing",
  "Internet of Things",
  "Robotics",
  "Open Source",
  "DevOps",
  "Blockchain",
  "Game Development",
  "Computer Vision",
  "Natural Language Processing",
];

interface Props {
  interests: string[];
}

export default function SectionInterests({ interests }: Props) {
  const [saving, setSaving] = useState(false);
  const [items, setItems] = useState<string[]>(interests);
  const [input, setInput] = useState("");

  const hasChanges = JSON.stringify(items.sort()) !== JSON.stringify([...interests].sort());

  const handleSave = async () => {
    setSaving(true);
    try {
      await updateProfileSettings({ interests: items });
      toast.success("Interests updated");
    } catch (e: any) {
      toast.error(e.message || "Failed to update");
    } finally {
      setSaving(false);
    }
  };

  const addInterest = (interest: string) => {
    if (!items.includes(interest)) {
      setItems([...items, interest]);
    }
  };

  const removeInterest = (interest: string) => {
    setItems(items.filter((i) => i !== interest));
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
        <h3 className="text-sm font-semibold text-text">Academic Interests</h3>
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
            className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-2.5 py-1 text-[11px] font-medium text-primary"
          >
            {item}
            <button onClick={() => removeInterest(item)} className="hover:text-primary/70">
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
        {SUGGESTED_INTERESTS.filter((s) => !items.includes(s)).map((s) => (
          <button
            key={s}
            onClick={() => addInterest(s)}
            className="rounded-full border border-border px-2.5 py-1 text-[11px] text-muted transition-colors hover:border-primary/30 hover:text-text"
          >
            + {s}
          </button>
        ))}
      </div>
    </div>
  );
}
