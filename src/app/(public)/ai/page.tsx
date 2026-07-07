"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import {
  Sparkles,
  Brain,
  FileSearch,
  BookOpenText,
  Search,
  MessageSquare,
  Users,
  Shield,
  GraduationCap,
  BarChart3,
  ArrowRight,
  Check,
  Loader2,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Bot,
  Lightbulb,
  Globe,
  Code,
  FolderKanban,
  FileText,
  CheckSquare,
  Book,
  Timer,
} from "lucide-react";
import { cn } from "@/lib/utils";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";

/* ─── FAQ data ────────────────────────────────────── */

const faqs = [
  {
    q: "What is AI MU?",
    a: "AI MU is Sant.Ai's flagship AI platform, designed specifically for universities, students, developers, and communities. It provides intelligent tools for research, learning, collaboration, and innovation within the academic ecosystem.",
  },
  {
    q: "When will AI MU launch?",
    a: "AI MU is currently in active development. We are rolling out features progressively, starting with AI Search & Research Assistant in Q3 2026, followed by AI Workspace & Summarizer in Q4 2026, and the full platform launch in Q1 2027.",
  },
  {
    q: "Is AI MU free for students?",
    a: "Yes. AI MU will be free for all Sant.Ai users, with premium tiers for advanced features. Students and faculty members get full access as part of the university ecosystem.",
  },
  {
    q: "Can I contribute to AI MU's development?",
    a: "Absolutely. AI MU is being built with direct input from our community. Join the waitlist to get early access, participate in beta testing, and share feedback that shapes the platform.",
  },
  {
    q: "What makes AI MU different from other AI tools?",
    a: "AI MU is purpose-built for the academic ecosystem. It integrates with Sant.Ai's existing community, projects, and knowledge base, providing context-aware AI assistance tailored to university students, researchers, and developers.",
  },
];

/* ─── Capabilities ────────────────────────────────── */

const capabilities = [
  {
    id: "ai-chat",
    badge: "🤖",
    title: "AI Chat",
    description:
      "Natural conversations powered by Sant.Ai Intelligence. Designed to help students, developers, and researchers solve problems, generate ideas, and answer complex questions.",
    highlights: [
      "Context Awareness",
      "Code Generation",
      "Multi-language",
      "Smart Memory",
    ],
    icon: MessageSquare,
  },
  {
    id: "ai-workspace",
    badge: "🧠",
    title: "AI Workspace",
    description:
      "A collaborative environment where projects, files, conversations, notes, and AI work together in one connected space.",
    highlights: [
      "Project Organization",
      "AI Context",
      "Team Collaboration",
      "File Management",
    ],
    icon: Brain,
  },
  {
    id: "ai-learning",
    badge: "📚",
    title: "AI Learning Companion",
    description:
      "An intelligent academic mentor that adapts to every student's learning style with personalized tutoring and interactive quizzes.",
    highlights: [
      "Personalized Learning",
      "AI Tutor",
      "Interactive Quiz",
      "Progress Tracking",
    ],
    icon: Sparkles,
  },
  {
    id: "ai-research",
    badge: "🔬",
    title: "AI Research Assistant",
    description:
      "Accelerate academic research using AI-powered paper analysis, citation generation, knowledge extraction, and document summarization.",
    highlights: [
      "Paper Analysis",
      "Citation Generator",
      "AI Summarizer",
      "Knowledge Graph",
    ],
    icon: FileSearch,
  },
  {
    id: "ai-search",
    badge: "🔎",
    title: "AI Search",
    description:
      "Semantic search across research papers, university resources, documentation, discussions, and curated knowledge bases.",
    highlights: [
      "Semantic Search",
      "Research Papers",
      "Community Knowledge",
      "Intelligent Discovery",
    ],
    icon: Search,
  },
];

/* ─── Capability Mockup Component ─────────────────── */

function CapabilityMockup({
  cap,
  compact,
}: {
  cap: (typeof capabilities)[number];
  compact?: boolean;
}) {
  const mockups: Record<string, React.ReactNode> = {
    "AI Chat": (
      <div className="flex flex-col h-full">
        <div className="space-y-3 flex-1">
          <div className="flex items-start gap-2.5">
            <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <Bot className="h-3.5 w-3.5" />
            </div>
            <div className="rounded-2xl rounded-tl-sm bg-surface/60 px-3.5 py-2.5 text-[11px] leading-relaxed text-text max-w-[80%]">
              Hello! I&apos;m AI MU. I can help you with research, coding,
              studying, and more. What would you like to explore?
              <div className="mt-2 flex flex-wrap gap-1.5">
                {["Summarize a paper", "Write code", "Explain concept"].map(
                  (p) => (
                    <span
                      key={p}
                      className="rounded-md border border-border/40 bg-card px-2 py-0.5 text-[9px] text-muted"
                    >
                      {p}
                    </span>
                  ),
                )}
              </div>
            </div>
          </div>
          <div className="flex items-start gap-2.5 justify-end">
            <div className="rounded-2xl rounded-tr-sm bg-primary/10 px-3.5 py-2.5 text-[11px] leading-relaxed text-text max-w-[75%]">
              Can you help me understand how transformer neural networks work?
            </div>
            <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-surface text-[9px] font-medium text-text">
              Y
            </div>
          </div>
          {!compact && (
            <div className="flex items-start gap-2.5">
              <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <Bot className="h-3.5 w-3.5" />
              </div>
              <div className="flex items-center gap-1 rounded-2xl rounded-tl-sm bg-surface/60 px-4 py-3">
                <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-muted [animation-delay:0ms]" />
                <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-muted [animation-delay:150ms]" />
                <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-muted [animation-delay:300ms]" />
              </div>
            </div>
          )}
        </div>
        <div className="mt-3 flex items-center gap-2 rounded-lg border border-border/40 bg-surface/20 px-3 py-2">
          <input
            disabled
            className="flex-1 bg-transparent text-[10px] text-text outline-none placeholder:text-muted/40"
            placeholder="Ask AI MU anything..."
          />
          <div className="flex h-6 w-6 items-center justify-center rounded-md bg-primary text-white">
            <ArrowRight className="h-3 w-3" />
          </div>
        </div>
      </div>
    ),
    "AI Workspace": (
      <div className="flex h-full gap-4">
        <div className="w-28 shrink-0 space-y-1">
          {[
            { icon: FolderKanban, label: "Projects" },
            { icon: FileText, label: "Files" },
            { icon: Book, label: "Notes" },
            { icon: CheckSquare, label: "Tasks" },
          ].map((s, i) => {
            const Icon = s.icon;
            return (
              <div
                key={s.label}
                className={`flex items-center gap-2 rounded-md px-2.5 py-1.5 text-[9px] ${i === 0 ? "bg-primary/10 font-medium text-primary" : "text-muted hover:bg-surface/30"}`}
              >
                <Icon className="h-3 w-3" />
                {s.label}
              </div>
            );
          })}
        </div>
        <div className="flex-1 space-y-2.5">
          <div className="grid grid-cols-2 gap-2">
            {[
              { title: "Neural Network Analysis", files: "12", members: "3" },
              { title: "NLP Research Paper", files: "8", members: "2" },
              { title: "Data Pipeline Design", files: "15", members: "4" },
              { title: "ML Model Training", files: "6", members: "2" },
            ].map((p) => (
              <div key={p.title} className="rounded-lg bg-surface/30 p-2.5">
                <p className="text-[10px] font-medium text-text">{p.title}</p>
                <div className="mt-1.5 flex items-center gap-2 text-[8px] text-muted">
                  <span className="flex items-center gap-1">
                    <FileText className="h-2.5 w-2.5" />
                    {p.files}
                  </span>
                  <span className="flex items-center gap-1">
                    <Users className="h-2.5 w-2.5" />
                    {p.members}
                  </span>
                </div>
              </div>
            ))}
          </div>
          {!compact && (
            <div className="flex items-center gap-2 rounded-lg border border-dashed border-border/50 p-2.5 text-[9px] text-muted">
              <span className="rounded-md bg-primary/10 px-2 py-0.5 text-[8px] font-medium text-primary">
                + New Project
              </span>
            </div>
          )}
        </div>
      </div>
    ),
    "AI Learning Companion": (
      <div className="flex flex-col h-full space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[11px] font-medium text-text">
              Introduction to Machine Learning
            </p>
            <p className="text-[9px] text-muted">
              Module 4 of 12 &middot; Supervised Learning
            </p>
          </div>
          <span className="rounded-md bg-emerald-500/10 px-2 py-0.5 text-[9px] font-medium text-emerald-600 dark:text-emerald-400">
            In Progress
          </span>
        </div>
        <div className="h-2 w-full rounded-full bg-border/40">
          <div className="h-2 w-[35%] rounded-full bg-emerald-500 transition-all" />
        </div>
        <div className="rounded-xl border border-border/40 bg-surface/20 p-4">
          <p className="text-[10px] font-medium text-text">Question 4 of 10</p>
          <p className="mt-2 text-[11px] leading-relaxed text-text">
            What is the primary goal of supervised learning?
          </p>
          <div className="mt-3 space-y-1.5">
            {[
              "To find hidden patterns in unlabeled data",
              "To learn a mapping from inputs to outputs using labeled data",
              "To cluster similar data points together",
            ].map((opt, i) => (
              <div
                key={i}
                className={`rounded-lg border px-3 py-2 text-[10px] ${i === 1 ? "border-emerald-300 bg-emerald-50 text-emerald-700 dark:border-emerald-700 dark:bg-emerald-950/30 dark:text-emerald-300" : "border-border/40 text-text"}`}
              >
                {i === 1 && (
                  <Check className="mr-1.5 inline h-3 w-3 text-emerald-500" />
                )}
                {opt}
              </div>
            ))}
          </div>
        </div>
        {!compact && (
          <div className="flex items-center justify-between text-[9px] text-muted">
            <span>
              <Check className="mr-1 inline h-3 w-3 text-emerald-400" />
              Score: 75%
            </span>
            <span className="flex items-center gap-1">
              <Timer className="h-3 w-3" />
              12:34 remaining
            </span>
          </div>
        )}
      </div>
    ),
    "AI Research Assistant": (
      <div className="flex h-full gap-4">
        <div className="w-28 shrink-0 space-y-1">
          {[
            "Abstract",
            "Introduction",
            "Methodology",
            "Results",
            "Citations",
          ].map((s, i) => (
            <div
              key={s}
              className={`rounded-md px-2.5 py-1.5 text-[9px] ${i === 0 ? "bg-amber-500/10 font-medium text-amber-600 dark:text-amber-400" : "text-muted hover:bg-surface/30"}`}
            >
              {s}
            </div>
          ))}
        </div>
        <div className="flex-1 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-medium text-text">
              Attention Is All You Need
            </span>
            <span className="rounded-md bg-amber-500/10 px-2 py-0.5 text-[8px] font-medium text-amber-600 dark:text-amber-400">
              Summarized
            </span>
          </div>
          <p className="text-[10px] leading-relaxed text-text">
            The dominant sequence transduction models are based on complex
            recurrent or convolutional neural networks... The best performing
            models connect the encoder and decoder through an attention
            mechanism.
          </p>
          <div className="flex flex-wrap gap-1.5">
            {["Extract Key Points", "Cite This", "Find Similar"].map((t) => (
              <span
                key={t}
                className="rounded-md border border-border/40 bg-card px-2 py-0.5 text-[8px] text-muted"
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>
    ),
    "AI Search": (
      <div className="flex flex-col h-full space-y-3">
        <div className="flex items-center gap-2 rounded-xl border border-border/40 bg-surface/20 px-3.5 py-2.5">
          <Search className="h-3.5 w-3.5 shrink-0 text-muted" />
          <input
            disabled
            placeholder="Search research papers, discussions, documentation..."
            className="flex-1 bg-transparent text-[10px] text-text outline-none"
          />
          <span className="rounded-md bg-indigo-500/10 px-1.5 py-0.5 text-[8px] font-medium text-indigo-600 dark:text-indigo-400">
            Semantic
          </span>
        </div>
        <div className="flex items-center gap-1.5">
          {["All", "Papers", "Community", "Docs"].map((f, i) => (
            <span
              key={f}
              className={`rounded-md px-2 py-1 text-[8px] ${i === 0 ? "bg-indigo-500/10 font-medium text-indigo-600 dark:text-indigo-400" : "text-muted"}`}
            >
              {f}
            </span>
          ))}
        </div>
        <div className="space-y-2 flex-1">
          {[
            {
              title: "Transformer Models in NLP: A Comprehensive Survey",
              source: "Research Paper · 2024",
            },
            {
              title: "Building Scalable Microservices with Node.js",
              source: "Community Discussion · 15 replies",
            },
            {
              title: "Introduction to Reinforcement Learning",
              source: "Course Material · Universitas Indonesia",
            },
          ].map((r) => (
            <div
              key={r.title}
              className="rounded-lg border border-border/30 bg-surface/10 p-2.5"
            >
              <p className="text-[10px] font-medium text-text">{r.title}</p>
              <p className="mt-0.5 text-[8px] text-muted">{r.source}</p>
            </div>
          ))}
        </div>
      </div>
    ),
  };

  return (
    <div className={compact ? "p-0" : "h-full"}>
      {mockups[cap.title] ?? (
        <div className="flex items-center justify-center py-8 text-[11px] text-muted">
          Preview coming soon
        </div>
      )}
    </div>
  );
}

/* ─── Roadmap ──────────────────────────────────────── */

const roadmap = [
  {
    phase: "Q3 2026",
    label: "AI Search & Research Assistant Beta",
    status: "In Development",
  },
  { phase: "Q4 2026", label: "AI Workspace & Summarizer", status: "Next" },
  {
    phase: "Q1 2027",
    label: "AI Learning Companion & Full Launch",
    status: "Planned",
  },
];

/* ─── Component ────────────────────────────────────── */

export default function AIPage() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [slideIdx, setSlideIdx] = useState(0);
  const [isInteracting, setIsInteracting] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [panelProgress, setPanelProgress] = useState<number[]>([]);
  const [activePanel, setActivePanel] = useState(0);
  const storyRefs = useRef<(HTMLElement | null)[]>([]);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  function handleTouchStart(e: React.TouchEvent) {
    touchStartX.current = e.touches[0].clientX;
    setIsInteracting(true);
  }

  function handleTouchEnd(e: React.TouchEvent) {
    touchEndX.current = e.changedTouches[0].clientX;
    const diff = touchStartX.current - touchEndX.current;
    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        setSlideIdx((prev) => Math.min(prev + 1, capabilities.length - 1));
      } else {
        setSlideIdx((prev) => Math.max(prev - 1, 0));
      }
    }
    setTimeout(() => setIsInteracting(false), 3000);
  }

  useEffect(() => {
    if (isInteracting) return;
    const id = setInterval(() => {
      setSlideIdx((prev) => (prev + 1) % capabilities.length);
    }, 3000);
    return () => clearInterval(id);
  }, [isInteracting]);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  useEffect(() => {
    if (reducedMotion || capabilities.length === 0) return;

    setPanelProgress(capabilities.map(() => 0));

    const thresholdSteps = Array.from({ length: 61 }, (_, i) => i / 60);

    const obs = new IntersectionObserver(
      (entries) => {
        setPanelProgress((prev) => {
          if (prev.length === 0) return prev;
          const next = [...prev];
          entries.forEach((entry) => {
            const idx = storyRefs.current.findIndex(
              (el) => el === entry.target,
            );
            if (idx !== -1 && idx < next.length) {
              const rect = entry.boundingClientRect;
              const vh = window.innerHeight;
              const raw = 1 - rect.top / vh;
              next[idx] = Math.max(0, Math.min(1, raw));
            }
          });
          return next;
        });
      },
      { threshold: thresholdSteps },
    );

    const currentRefs = storyRefs.current;
    currentRefs.forEach((el) => {
      if (el) obs.observe(el);
    });

    return () => obs.disconnect();
  }, [reducedMotion]);

  useEffect(() => {
    let maxProgress = -1;
    let maxIdx = -1;
    panelProgress.forEach((p, i) => {
      if (p > maxProgress) {
        maxProgress = p;
        maxIdx = i;
      }
    });
    if (maxIdx !== -1) setActivePanel(maxIdx);
  }, [panelProgress]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1000));
    setLoading(false);
    setSubmitted(true);
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        {/* ── Hero ── */}
        <section className="relative overflow-hidden pt-24 pb-20 md:pt-32 md:pb-28">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/5 via-transparent to-transparent" />
          <div className="container-main relative z-10">
            <div className="mx-auto max-w-3xl text-center">
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-xs font-medium text-primary">
                <Sparkles className="h-3 w-3" />
                Developer Preview
              </div>
              <div className="mb-4 flex items-center justify-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary shadow-sm">
                  <Bot className="h-6 w-6 text-white" />
                </div>
                <span className="font-heading text-3xl font-bold tracking-tight text-text md:text-4xl">
                  AI MU
                </span>
              </div>
              <p className="mx-auto max-w-xl text-sm leading-relaxed text-secondary md:text-base">
                Sant.Ai&apos;s flagship AI platform purpose-built for
                universities, students, and developers. Intelligent tools for
                research, learning, collaboration, and innovation.
              </p>
              <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                <a
                  href="#waitlist"
                  className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-white shadow-sm transition-all hover:bg-primary/90"
                >
                  Join Waitlist <ArrowRight className="h-4 w-4" />
                </a>
                <a
                  href="#capabilities"
                  className="inline-flex items-center gap-2 rounded-lg border border-border bg-card px-5 py-2.5 text-sm font-medium text-text shadow-sm transition-all hover:bg-surface"
                >
                  Explore Capabilities
                </a>
              </div>
              <div className="mt-6 flex flex-wrap items-center justify-center gap-4 text-[10px] text-muted">
                <span className="flex items-center gap-1">
                  <GraduationCap className="h-3 w-3" />
                  For Universities
                </span>
                <span className="flex items-center gap-1">
                  <Users className="h-3 w-3" />
                  For Students
                </span>
                <span className="flex items-center gap-1">
                  <Lightbulb className="h-3 w-3" />
                  For Researchers
                </span>
                <span className="flex items-center gap-1">
                  <Globe className="h-3 w-3" />
                  For Communities
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* ── Introduction ── */}
        <section className="border-t border-border py-16 md:py-20">
          <div className="container-main">
            <div className="mx-auto max-w-2xl text-center">
              <p className="mb-1 font-mono text-xs font-semibold uppercase tracking-widest text-primary">
                Introducing
              </p>
              <h2 className="font-heading text-2xl font-bold tracking-tight text-text md:text-3xl">
                Intelligence for the Academic Ecosystem
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-secondary">
                AI MU is being built from the ground up for the unique needs of
                higher education. It integrates with Sant.Ai&apos;s community,
                projects, and knowledge base to provide context-aware AI
                assistance helping students learn faster, researchers discover
                more, and developers build better.
              </p>
            </div>
            <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  icon: Brain,
                  title: "Context-Aware",
                  desc: "Understands your study program, projects, and community to deliver relevant assistance.",
                },
                {
                  icon: Users,
                  title: "Collaborative",
                  desc: "Share AI interactions with your team, cite sources, and build on each other's work.",
                },
                {
                  icon: Shield,
                  title: "Academic Integrity",
                  desc: "Built-in citation generation, source verification, and plagiarism-aware output.",
                },
                {
                  icon: MessageSquare,
                  title: "Natural Interaction",
                  desc: "Chat, voice, and document-based interfaces designed for academic workflows.",
                },
                {
                  icon: BarChart3,
                  title: "Progress Analytics",
                  desc: "Track your learning progress, research output, and AI usage patterns.",
                },
                {
                  icon: GraduationCap,
                  title: "Curriculum-Aligned",
                  desc: "Trained on academic materials aligned with Indonesian university curricula.",
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="rounded-xl border border-border bg-card p-5 transition-all hover:border-primary/20 hover:shadow-sm"
                >
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <item.icon className="h-4.5 w-4.5" />
                  </div>
                  <h3 className="mt-3 text-sm font-semibold text-text">
                    {item.title}
                  </h3>
                  <p className="mt-1 text-xs leading-relaxed text-secondary">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Capabilities (Desktop: Sticky Storytelling) ── */}
        <section id="capabilities" className="relative">
          {/* Mobile + Tablet header */}
          <div className="container-main lg:hidden">
            <div className="mx-auto mb-10 max-w-2xl text-center pt-16 md:pt-20">
              <p className="mb-1 font-mono text-xs font-semibold uppercase tracking-widest text-primary">
                Capabilities
              </p>
              <h2 className="font-heading text-2xl font-bold tracking-tight text-text md:text-3xl">
                Coming Soon
              </h2>
              <p className="mt-3 text-sm text-secondary">
                AI MU is being built in phases. Here&apos;s what we&apos;re
                working on.
              </p>
            </div>

            {/* Mobile Carousel */}
            <div className="md:hidden pb-16 md:pb-20">
              <div className="relative overflow-hidden rounded-xl">
                <div
                  className="flex transition-transform duration-300 ease-out"
                  style={{ transform: `translateX(-${slideIdx * 100}%)` }}
                  onTouchStart={handleTouchStart}
                  onTouchEnd={handleTouchEnd}
                >
                  {capabilities.map((cap) => (
                    <div key={cap.title} className="w-full shrink-0 px-0.5">
                      <div className="overflow-hidden rounded-xl border border-border bg-card shadow-sm">
                        <div className="p-4 min-h-[200px] flex items-center">
                          <CapabilityMockup cap={cap} compact />
                        </div>
                        <div className="border-t border-border/40 bg-surface/5 p-4">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <span className="text-lg">{cap.badge}</span>
                              <h3 className="text-sm font-semibold text-text">
                                {cap.title}
                              </h3>
                            </div>
                            <span className="rounded-full border border-amber-200 bg-amber-50 px-2 py-0.5 text-[9px] font-medium text-amber-700 dark:border-amber-800 dark:bg-amber-950/30 dark:text-amber-300">
                              Coming Soon
                            </span>
                          </div>
                          <p className="mt-1.5 text-xs leading-relaxed text-secondary">
                            {cap.description}
                          </p>
                          <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1">
                            {cap.highlights.map((h) => (
                              <span
                                key={h}
                                className="text-[9px] text-muted flex items-center gap-1"
                              >
                                <span className="h-1 w-1 rounded-full bg-primary/40" />
                                {h}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div
                className="mt-4 flex items-center justify-center gap-1.5"
                role="tablist"
                aria-label="Feature slides"
              >
                {capabilities.map((_, i) => (
                  <button
                    key={i}
                    role="tab"
                    aria-selected={i === slideIdx}
                    aria-label={`Slide ${i + 1}`}
                    onClick={() => setSlideIdx(i)}
                    className={`h-1.5 rounded-full transition-all ${
                      i === slideIdx ? "w-5 bg-primary" : "w-1.5 bg-border"
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Tablet Cards */}
            <div className="hidden md:block lg:hidden pb-16 md:pb-20">
              <div className="space-y-4">
                {capabilities.map((cap, i) => (
                  <div
                    key={cap.title}
                    className="overflow-hidden rounded-xl border border-border bg-card shadow-sm transition-all duration-300 ease-out"
                  >
                    <div className="p-4 min-h-[180px] flex items-center bg-surface/10">
                      <CapabilityMockup cap={cap} compact />
                    </div>
                    <div className="border-t border-border/40 bg-surface/5 p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="text-lg">{cap.badge}</span>
                          <h3 className="text-sm font-semibold text-text">
                            {cap.title}
                          </h3>
                        </div>
                        <span className="rounded-full border border-amber-200 bg-amber-50 px-2 py-0.5 text-[9px] font-medium text-amber-700 dark:border-amber-800 dark:bg-amber-950/30 dark:text-amber-300">
                          Coming Soon
                        </span>
                      </div>
                      <p className="mt-1.5 text-xs leading-relaxed text-secondary">
                        {cap.description}
                      </p>
                      <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1">
                        {cap.highlights.map((h) => (
                          <span
                            key={h}
                            className="text-[9px] text-muted flex items-center gap-1"
                          >
                            <span className="h-1 w-1 rounded-full bg-primary/40" />
                            {h}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Desktop: Sticky Scroll Storytelling */}
          <div className="hidden lg:block bg-white dark:bg-black">
            <div className="mx-auto max-w-7xl">
              {capabilities.map((cap, i) => {
                const p = reducedMotion ? 1 : (panelProgress[i] ?? 0);
                const hold = 0.75;
                const isActive = i === activePanel;
                const zIndex = i + 1;

                let translateY = "0%";
                let opacity = 1;
                if (!reducedMotion) {
                  if (i === 0) {
                    translateY = "0%";
                    opacity = 1;
                  } else {
                    const slideIn = Math.max(0, Math.min(1, p / hold));
                    translateY = `${(1 - slideIn) * 100}%`;
                    opacity = 1;
                  }
                }

                return (
                  <section
                    key={cap.id}
                    ref={(el) => {
                      storyRefs.current[i] = el;
                    }}
                    className="relative"
                    style={{
                      minHeight: "280vh",
                      marginTop: i > 0 ? "-100vh" : undefined,
                      pointerEvents: isActive ? "auto" : "none",
                    }}
                  >
                    <div
                      className="sticky top-0 h-screen"
                      style={{ zIndex, overflow: "hidden" }}
                      role="region"
                      aria-label={`${cap.title} capability`}
                      aria-hidden={!isActive}
                    >
                      <div
                        className="flex h-full items-center justify-center px-8 py-10 will-change-transform bg-white dark:bg-black"
                        style={{
                          transform: `translateY(${translateY})`,
                          opacity,
                          transition: reducedMotion
                            ? "none"
                            : i === 0
                              ? "none"
                              : "transform 0.15s linear, opacity 0.15s linear",
                        }}
                      >
                        <div className="flex w-full max-w-6xl items-center gap-14">
                          {/* Left: 40% - Info */}
                          <div className="w-[38%] shrink-0">
                            <span
                              className="text-3xl"
                              role="img"
                              aria-hidden="true"
                            >
                              {cap.badge}
                            </span>
                            <div className="mt-2">
                              <span className="rounded-full border border-amber-200 bg-amber-50 px-2.5 py-0.5 text-[10px] font-medium text-amber-700 dark:border-amber-800 dark:bg-amber-950/30 dark:text-amber-300">
                                Coming Soon
                              </span>
                            </div>
                            <h3 className="mt-5 font-heading text-3xl font-bold tracking-tight text-text">
                              {cap.title}
                            </h3>
                            <p className="mt-3 text-sm leading-relaxed text-secondary">
                              {cap.description}
                            </p>
                            <ul className="mt-5 flex flex-wrap gap-x-5 gap-y-2">
                              {cap.highlights.map((h) => (
                                <li
                                  key={h}
                                  className="flex items-center gap-1.5 text-[11px] text-text"
                                >
                                  <span className="h-1 w-1 rounded-full bg-primary" />
                                  {h}
                                </li>
                              ))}
                            </ul>
                          </div>

                          {/* Right: 60% - Mockup */}
                          <div className="flex-1">
                            <div className="overflow-hidden rounded-xl border border-border/60 bg-card shadow-sm">
                              {/* Browser chrome */}
                              <div className="flex items-center gap-1.5 border-b border-border/40 bg-surface/20 px-3 py-2.5">
                                <div className="flex items-center gap-1">
                                  <div className="h-2.5 w-2.5 rounded-full bg-red-400/70" />
                                  <div className="h-2.5 w-2.5 rounded-full bg-amber-400/70" />
                                  <div className="h-2.5 w-2.5 rounded-full bg-emerald-400/70" />
                                </div>
                                <div className="mx-auto flex items-center gap-1.5 rounded-md bg-surface/40 px-2.5 py-1 text-[10px] text-muted">
                                  <Globe className="h-3 w-3" />
                                  ai-mu.sant.ai/{cap.id}
                                </div>
                                <div className="flex items-center gap-1">
                                  <span className="text-[8px] text-muted">
                                    {cap.badge}
                                  </span>
                                </div>
                              </div>
                              {/* Mockup body */}
                              <div className="p-5">
                                <div className="rounded-lg bg-gradient-to-br from-primary/[0.04] to-surface/30 p-5 min-h-[240px]">
                                  <CapabilityMockup cap={cap} />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </section>
                );
              })}
            </div>

            {/* Progress indicator */}
            <div className="fixed right-6 top-1/2 -translate-y-1/2 z-50 hidden xl:flex flex-col gap-2">
              {capabilities.map((_, i) => (
                <div
                  key={i}
                  className={`rounded-full transition-all duration-500 ${
                    i === activePanel
                      ? "h-4 w-1.5 bg-primary"
                      : "h-1.5 w-1.5 bg-border/40 hover:bg-border/60"
                  }`}
                />
              ))}
            </div>
          </div>
        </section>

        {/* ── Roadmap ── */}
        <section className="border-t border-border bg-section-alt py-16 md:py-20">
          <div className="container-main">
            <div className="mx-auto max-w-2xl text-center">
              <p className="mb-1 font-mono text-xs font-semibold uppercase tracking-widest text-primary">
                Timeline
              </p>
              <h2 className="font-heading text-2xl font-bold tracking-tight text-text md:text-3xl">
                Development Roadmap
              </h2>
              <p className="mt-3 text-sm text-secondary">
                Our planned journey to bring AI MU to the Sant.Ai ecosystem.
              </p>
            </div>
            <div className="relative mx-auto mt-10 max-w-2xl">
              <div className="absolute left-6 top-0 h-full w-px bg-gradient-to-b from-primary/40 via-primary/20 to-transparent" />
              <div className="space-y-8">
                {roadmap.map((item, i) => (
                  <div key={item.phase} className="relative pl-14">
                    <div
                      className={cn(
                        "absolute left-4.5 flex h-5 w-5 items-center justify-center rounded-full border-2 bg-card",
                        i === 0 ? "border-primary" : "border-border",
                      )}
                    >
                      {i === 0 && (
                        <div className="h-2 w-2 rounded-full bg-primary" />
                      )}
                    </div>
                    <div className="rounded-xl border border-border bg-card p-4 transition-all hover:border-primary/20">
                      <div className="flex items-center justify-between">
                        <span className="rounded-md bg-primary/10 px-2 py-0.5 text-[10px] font-semibold text-primary">
                          {item.phase}
                        </span>
                        <span
                          className={cn(
                            "text-[9px] font-medium",
                            i === 0 ? "text-emerald-500" : "text-muted",
                          )}
                        >
                          {item.status}
                        </span>
                      </div>
                      <p className="mt-2 text-xs text-text">{item.label}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── Waitlist ── */}
        <section
          id="waitlist"
          className="border-t border-border py-16 md:py-20"
        >
          <div className="container-main">
            <div className="mx-auto max-w-md text-center">
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10">
                <Sparkles className="h-6 w-6 text-primary" />
              </div>
              <h2 className="font-heading text-2xl font-bold text-text">
                Get Early Access
              </h2>
              <p className="mt-2 text-sm text-secondary">
                Join the waitlist to be the first to experience AI MU when it
                launches.
              </p>

              {submitted ? (
                <div className="mt-6 flex items-center justify-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 dark:border-emerald-800 dark:bg-emerald-950/30">
                  <Check className="h-4 w-4 text-emerald-500 dark:text-emerald-400" />
                  <span className="text-sm font-medium text-emerald-700 dark:text-emerald-300">
                    You&apos;re on the list! We&apos;ll notify you when we
                    launch.
                  </span>
                </div>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  className="mt-6 flex flex-col gap-3 sm:flex-row"
                >
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    required
                    className="flex-1 rounded-lg border border-border bg-card px-4 py-2.5 text-sm text-text outline-none transition-colors placeholder:text-muted focus:border-primary"
                  />
                  <button
                    type="submit"
                    disabled={loading}
                    className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-white shadow-sm transition-all hover:bg-primary/90 disabled:opacity-50"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Subscribing...
                      </>
                    ) : (
                      "Notify Me"
                    )}
                  </button>
                </form>
              )}
              <p className="mt-3 text-[10px] text-muted">
                No spam. Unsubscribe anytime.
              </p>
            </div>
          </div>
        </section>

        {/* ── FAQ ── */}
        <section className="border-t border-border bg-section-alt py-16 md:py-20">
          <div className="container-main">
            <div className="mx-auto max-w-2xl">
              <div className="text-center">
                <p className="mb-1 font-mono text-xs font-semibold uppercase tracking-widest text-primary">
                  FAQ
                </p>
                <h2 className="font-heading text-2xl font-bold tracking-tight text-text md:text-3xl">
                  Frequently Asked Questions
                </h2>
              </div>
              <div className="mt-8 space-y-2">
                {faqs.map((faq, i) => (
                  <div
                    key={i}
                    className="rounded-xl border border-border bg-card overflow-hidden transition-all hover:border-primary/20"
                  >
                    <button
                      onClick={() => setOpenFaq(openFaq === i ? null : i)}
                      className="flex w-full items-center justify-between px-5 py-3.5 text-left text-sm font-medium text-text transition-colors hover:bg-surface"
                    >
                      {faq.q}
                      <ChevronDown
                        className={cn(
                          "h-4 w-4 shrink-0 text-muted transition-transform duration-200",
                          openFaq === i && "rotate-180",
                        )}
                      />
                    </button>
                    <div
                      className={cn(
                        "overflow-hidden transition-all duration-300",
                        openFaq === i ? "max-h-40" : "max-h-0",
                      )}
                    >
                      <p className="border-t border-border px-5 py-3.5 text-xs leading-relaxed text-secondary">
                        {faq.a}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
