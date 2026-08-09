"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ReactLenis from "lenis/react";
import {
  Sparkles, Search, MessageSquare, ArrowRight,
  Bot, Check, Timer, Users, FileText, Book, CheckSquare, FolderKanban,
  Globe, ChevronDown,
} from "lucide-react";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";

const features = [
  {
    id: "ai-chat",
    badge: "AI Chat",
    title: "Conversations that understand context",
    description:
      "Natural conversations powered by Sant.Ai Intelligence. Designed to help students, developers, and researchers solve problems, generate ideas, and answer complex questions.",
    highlights: ["Context Awareness", "Code Generation", "Multi-language", "Smart Memory"],
    accent: "text-blue-500",
    gradient: "from-blue-500/20 via-blue-500/5 to-transparent",
    mockup: <ChatMockup />,
  },
  {
    id: "ai-workspace",
    badge: "AI Workspace",
    title: "Everything works together",
    description:
      "A collaborative environment where projects, files, conversations, notes, and AI work together in one connected space.",
    highlights: ["Project Organization", "AI Context", "Team Collaboration", "File Management"],
    accent: "text-purple-500",
    gradient: "from-purple-500/20 via-purple-500/5 to-transparent",
    mockup: <WorkspaceMockup />,
  },
  {
    id: "ai-learning",
    badge: "AI Learning Companion",
    title: "Adapts to how you learn",
    description:
      "An intelligent academic mentor that adapts to every student's learning style with personalized tutoring and interactive quizzes.",
    highlights: ["Personalized Learning", "AI Tutor", "Interactive Quiz", "Progress Tracking"],
    accent: "text-emerald-500",
    gradient: "from-emerald-500/20 via-emerald-500/5 to-transparent",
    mockup: <LearningMockup />,
  },
  {
    id: "ai-research",
    badge: "AI Research Assistant",
    title: "Accelerate your research",
    description:
      "Accelerate academic research using AI-powered paper analysis, citation generation, knowledge extraction, and document summarization.",
    highlights: ["Paper Analysis", "Citation Generator", "AI Summarizer", "Knowledge Graph"],
    accent: "text-amber-500",
    gradient: "from-amber-500/20 via-amber-500/5 to-transparent",
    mockup: <ResearchMockup />,
  },
  {
    id: "ai-search",
    badge: "AI Search",
    title: "Find what matters",
    description:
      "Semantic search across research papers, university resources, documentation, discussions, and curated knowledge bases.",
    highlights: ["Semantic Search", "Research Papers", "Community Knowledge", "Intelligent Discovery"],
    accent: "text-indigo-500",
    gradient: "from-indigo-500/20 via-indigo-500/5 to-transparent",
    mockup: <SearchMockup />,
  },
];

function ChatMockup() {
  return (
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
              {["Summarize a paper", "Write code", "Explain concept"].map((p) => (
                <span key={p} className="rounded-md border border-border/40 bg-card px-2 py-0.5 text-[9px] text-muted">{p}</span>
              ))}
            </div>
          </div>
        </div>
        <div className="flex items-start gap-2.5 justify-end">
          <div className="rounded-2xl rounded-tr-sm bg-primary/10 px-3.5 py-2.5 text-[11px] leading-relaxed text-text max-w-[75%]">
            Can you help me understand how transformer neural networks work?
          </div>
          <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-surface text-[9px] font-medium text-text">Y</div>
        </div>
        <div className="flex items-start gap-2.5">
          <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary"><Bot className="h-3.5 w-3.5" /></div>
          <div className="flex items-center gap-1 rounded-2xl rounded-tl-sm bg-surface/60 px-4 py-3">
            <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-muted [animation-delay:0ms]" />
            <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-muted [animation-delay:150ms]" />
            <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-muted [animation-delay:300ms]" />
          </div>
        </div>
      </div>
      <div className="mt-3 flex items-center gap-2 rounded-lg border border-border/40 bg-surface/20 px-3 py-2">
        <input disabled className="flex-1 bg-transparent text-[10px] text-text outline-none placeholder:text-muted/40" placeholder="Ask AI MU anything..." />
        <div className="flex h-6 w-6 items-center justify-center rounded-md bg-primary text-white"><ArrowRight className="h-3 w-3" /></div>
      </div>
    </div>
  );
}

function WorkspaceMockup() {
  return (
    <div className="flex h-full gap-4">
      <div className="w-28 shrink-0 space-y-1">
        {[{ icon: FolderKanban, label: "Projects" }, { icon: FileText, label: "Files" }, { icon: Book, label: "Notes" }, { icon: CheckSquare, label: "Tasks" }].map((s, i) => {
          const Icon = s.icon;
          return (
            <div key={s.label} className={`flex items-center gap-2 rounded-md px-2.5 py-1.5 text-[9px] ${i === 0 ? "bg-primary/10 font-medium text-primary" : "text-muted hover:bg-surface/30"}`}>
              <Icon className="h-3 w-3" />{s.label}
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
                <span className="flex items-center gap-1"><FileText className="h-2.5 w-2.5" />{p.files}</span>
                <span className="flex items-center gap-1"><Users className="h-2.5 w-2.5" />{p.members}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function LearningMockup() {
  return (
    <div className="flex flex-col h-full space-y-3">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-[11px] font-medium text-text">Introduction to Machine Learning</p>
          <p className="text-[9px] text-muted">Module 4 of 12 &middot; Supervised Learning</p>
        </div>
        <span className="rounded-md bg-emerald-500/10 px-2 py-0.5 text-[9px] font-medium text-emerald-600 dark:text-emerald-400">In Progress</span>
      </div>
      <div className="h-2 w-full rounded-full bg-border/40"><div className="h-2 w-[35%] rounded-full bg-emerald-500 transition-all" /></div>
      <div className="rounded-xl border border-border/40 bg-surface/20 p-4">
        <p className="text-[10px] font-medium text-text">Question 4 of 10</p>
        <p className="mt-2 text-[11px] leading-relaxed text-text">What is the primary goal of supervised learning?</p>
        <div className="mt-3 space-y-1.5">
          {[
            "To find hidden patterns in unlabeled data",
            "To learn a mapping from inputs to outputs using labeled data",
            "To cluster similar data points together",
          ].map((opt, i) => (
            <div key={i} className={`rounded-lg border px-3 py-2 text-[10px] ${i === 1 ? "border-emerald-300 bg-emerald-50 text-emerald-700 dark:border-emerald-700 dark:bg-emerald-950/30 dark:text-emerald-300" : "border-border/40 text-text"}`}>
              {i === 1 && <Check className="mr-1.5 inline h-3 w-3 text-emerald-500" />}{opt}
            </div>
          ))}
        </div>
      </div>
      <div className="flex items-center justify-between text-[9px] text-muted">
        <span><Check className="mr-1 inline h-3 w-3 text-emerald-400" />Score: 75%</span>
        <span className="flex items-center gap-1"><Timer className="h-3 w-3" />12:34 remaining</span>
      </div>
    </div>
  );
}

function ResearchMockup() {
  return (
    <div className="flex h-full gap-4">
      <div className="w-28 shrink-0 space-y-1">
        {["Abstract", "Introduction", "Methodology", "Results", "Citations"].map((s, i) => (
          <div key={s} className={`rounded-md px-2.5 py-1.5 text-[9px] ${i === 0 ? "bg-amber-500/10 font-medium text-amber-600 dark:text-amber-400" : "text-muted hover:bg-surface/30"}`}>{s}</div>
        ))}
      </div>
      <div className="flex-1 space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-medium text-text">Attention Is All You Need</span>
          <span className="rounded-md bg-amber-500/10 px-2 py-0.5 text-[8px] font-medium text-amber-600 dark:text-amber-400">Summarized</span>
        </div>
        <p className="text-[10px] leading-relaxed text-text">
          The dominant sequence transduction models are based on complex recurrent or convolutional neural networks... The best performing models connect the encoder and decoder through an attention mechanism.
        </p>
        <div className="flex flex-wrap gap-1.5">
          {["Extract Key Points", "Cite This", "Find Similar"].map((t) => (
            <span key={t} className="rounded-md border border-border/40 bg-card px-2 py-0.5 text-[8px] text-muted">{t}</span>
          ))}
        </div>
      </div>
    </div>
  );
}

function SearchMockup() {
  return (
    <div className="flex flex-col h-full space-y-3">
      <div className="flex items-center gap-2 rounded-xl border border-border/40 bg-surface/20 px-3.5 py-2.5">
        <Search className="h-3.5 w-3.5 shrink-0 text-muted" />
        <input disabled placeholder="Search research papers, discussions, documentation..." className="flex-1 bg-transparent text-[10px] text-text outline-none" />
        <span className="rounded-md bg-indigo-500/10 px-1.5 py-0.5 text-[8px] font-medium text-indigo-600 dark:text-indigo-400">Semantic</span>
      </div>
      <div className="flex items-center gap-1.5">
        {["All", "Papers", "Community", "Docs"].map((f, i) => (
          <span key={f} className={`rounded-md px-2 py-1 text-[8px] ${i === 0 ? "bg-indigo-500/10 font-medium text-indigo-600 dark:text-indigo-400" : "text-muted"}`}>{f}</span>
        ))}
      </div>
      <div className="space-y-2 flex-1">
        {[
          { title: "Transformer Models in NLP: A Comprehensive Survey", source: "Research Paper \u00b7 2024" },
          { title: "Building Scalable Microservices with Node.js", source: "Community Discussion \u00b7 15 replies" },
          { title: "Introduction to Reinforcement Learning", source: "Course Material \u00b7 Universitas Indonesia" },
        ].map((r) => (
          <div key={r.title} className="rounded-lg border border-border/30 bg-surface/10 p-2.5">
            <p className="text-[10px] font-medium text-text">{r.title}</p>
            <p className="mt-0.5 text-[8px] text-muted">{r.source}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

const faqs = [
  { q: "What is AI MU?", a: "AI MU is Sant.Ai's flagship AI platform, designed specifically for universities, students, developers, and communities. It provides intelligent tools for research, learning, collaboration, and innovation within the academic ecosystem." },
  { q: "When will AI MU launch?", a: "AI MU is currently in active development. We are rolling out features progressively, starting with AI Search & Research Assistant in Q3 2026, followed by AI Workspace & Summarizer in Q4 2026, and the full platform launch in Q1 2027." },
  { q: "Is AI MU free for students?", a: "Yes. AI MU will be free for all Sant.Ai users, with premium tiers for advanced features. Students and faculty members get full access as part of the university ecosystem." },
  { q: "Can I contribute to AI MU's development?", a: "Absolutely. AI MU is being built with direct input from our community. Join the waitlist to get early access, participate in beta testing, and share feedback that shapes the platform." },
  { q: "What makes AI MU different from other AI tools?", a: "AI MU is purpose-built for the academic ecosystem. It integrates with Sant.Ai's existing community, projects, and knowledge base, providing context-aware AI assistance tailored to university students, researchers, and developers." },
];

const roadmap = [
  { phase: "Q3 2026", label: "AI Search & Research Assistant Beta", status: "In Development" },
  { phase: "Q4 2026", label: "AI Workspace & Summarizer", status: "Next" },
  { phase: "Q1 2027", label: "AI Learning Companion & Full Launch", status: "Planned" },
];

export default function AIPage() {
  const container = useRef<HTMLDivElement>(null);
  const panelsRef = useRef<(HTMLDivElement | null)[]>([]);
  const dotsRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.registerPlugin(ScrollTrigger);

      const panels = panelsRef.current.filter(Boolean) as HTMLDivElement[];
      if (panels.length === 0) return;

      panels.forEach((panel, i) => {
        if (i === 0) {
          gsap.set(panel, { y: "0%", scale: 1, opacity: 1 });
        } else {
          gsap.set(panel, { y: "100%", scale: 0.7, opacity: 0 });
        }
      });

      const dots = dotsRef.current?.querySelectorAll<HTMLDivElement>(".dot");

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container.current,
          start: "top top",
          end: `+=${window.innerHeight * (panels.length * 3)}`,
          pin: true,
          scrub: 0.5,
          pinSpacing: true,
          onUpdate: (self) => {
            if (!dots || dots.length === 0) return;
            const idx = Math.min(Math.floor(self.progress * panels.length), panels.length - 1);
            dots.forEach((dot, i) => {
              if (i === idx) {
                dot.style.width = "1.5rem";
                dot.style.backgroundColor = "var(--color-primary, #2563eb)";
              } else {
                dot.style.width = "0.375rem";
                dot.style.backgroundColor = "";
              }
            });
          },
        },
      });

      for (let i = 0; i < panels.length - 1; i++) {
        const current = panels[i];
        const next = panels[i + 1];
        if (!current || !next) continue;

        tl.to(current, { scale: 0.7, opacity: 0, duration: 1, ease: "none" }, i);
        tl.to(next, { y: "0%", scale: 1, opacity: 1, duration: 1, ease: "none" }, i);
      }

      const resizeObserver = new ResizeObserver(() => ScrollTrigger.refresh());
      if (container.current) resizeObserver.observe(container.current);

      return () => {
        resizeObserver.disconnect();
        tl.kill();
        ScrollTrigger.getAll().forEach((t) => t.kill());
      };
    },
    { scope: container },
  );

  return (
    <ReactLenis root>
      <div className="flex min-h-screen flex-col">
        <Navbar />
        <main className="flex-1">
          {/* Hero */}
          <section className="relative flex min-h-screen items-center justify-center overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-background pointer-events-none" />
            <div className="relative z-10 mx-auto max-w-4xl px-4 text-center md:px-8">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-surface/50 px-4 py-1.5 text-xs text-muted">
                <Sparkles className="h-3.5 w-3.5 text-primary" />
                Introducing AI MU
              </div>
              <h1 className="font-heading text-4xl font-bold leading-tight text-text md:text-6xl lg:text-7xl">
                Intelligence for the
                <span className="block text-primary">Academic Ecosystem</span>
              </h1>
              <p className="mt-6 mx-auto max-w-2xl text-base leading-relaxed text-muted">
                AI MU is purpose-built for universities, students, and researchers.
                Chat, learn, research, and collaborate with AI that understands your academic context.
              </p>
              <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                <span className="flex items-center gap-2 rounded-lg bg-surface/50 px-3 py-2 text-[11px] text-muted">
                  <Globe className="h-3.5 w-3.5 text-primary" />
                  Coming Q3 2026
                </span>
              </div>
            </div>
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 animate-bounce pb-8">
              <div className="h-10 w-6 rounded-full border-2 border-border flex items-start justify-center pt-2">
                <div className="h-2 w-1 rounded-full bg-muted animate-pulse" />
              </div>
            </div>
          </section>

          {/* Sticky Feature Panels */}
          <div ref={container} className="relative">
            <div className="relative h-screen w-full overflow-hidden">
              {features.map((feature, i) => (
                <div
                  key={feature.id}
                  ref={(el) => { panelsRef.current[i] = el; }}
                  className="absolute inset-0 flex items-center justify-center"
                >
                  <div className="mx-auto w-full max-w-7xl px-4 md:px-8">
                    <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-16">
                      <div className="space-y-6">
                        <span className={`inline-flex items-center gap-1.5 rounded-full border border-border bg-surface/50 px-3 py-1 text-[10px] font-medium ${feature.accent}`}>
                          <Sparkles className="h-3 w-3" />
                          {feature.badge}
                        </span>
                        <h2 className="font-heading text-3xl font-bold leading-tight text-text md:text-4xl">
                          {feature.title}
                        </h2>
                        <p className="text-sm leading-relaxed text-muted">
                          {feature.description}
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {feature.highlights.map((h) => (
                            <span key={h} className="flex items-center gap-1 rounded-md bg-surface/50 px-2.5 py-1 text-[11px] text-text">
                              <Check className="h-3 w-3 text-primary" />
                              {h}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className="relative">
                        <div className={`absolute -inset-8 rounded-[32px] opacity-30 bg-gradient-to-b ${feature.gradient} blur-2xl`} />
                        <div className="relative rounded-2xl border border-border/40 bg-card p-5 shadow-sm">
                          {feature.mockup}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Progress indicators */}
            <div ref={dotsRef} className="pointer-events-none fixed bottom-8 right-8 z-50 flex gap-1.5">
              {features.map((_, i) => (
                <div key={i} className="dot h-1.5 w-1.5 rounded-full bg-border transition-all duration-300" />
              ))}
            </div>
          </div>

          {/* Roadmap */}
          <section className="py-24">
            <div className="mx-auto max-w-3xl px-4 md:px-8">
              <div className="text-center mb-12">
                <h2 className="font-heading text-3xl font-bold text-text">Roadmap</h2>
                <p className="mt-2 text-sm text-muted">What&apos;s coming next</p>
              </div>
              <div className="space-y-0">
                {roadmap.map((item, i) => (
                  <div key={i} className="relative flex items-start gap-6 pb-8 last:pb-0">
                    <div className="flex flex-col items-center">
                      <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 text-[10px] font-bold ${
                        i === 0 ? "border-primary bg-primary/10 text-primary" :
                        i === 1 ? "border-purple-500 bg-purple-500/10 text-purple-500" :
                        "border-border bg-surface/50 text-muted"
                      }`}>{i + 1}</div>
                      {i < roadmap.length - 1 && <div className="mt-2 w-px flex-1 bg-border" />}
                    </div>
                    <div className="pt-1">
                      <p className="text-[10px] font-medium uppercase tracking-wider text-primary">{item.phase}</p>
                      <p className="mt-1 text-sm font-medium text-text">{item.label}</p>
                      <span className={`mt-1 inline-block rounded-full px-2 py-0.5 text-[9px] font-medium ${
                        item.status === "In Development" ? "bg-emerald-500/10 text-emerald-500" :
                        item.status === "Next" ? "bg-purple-500/10 text-purple-500" :
                        "bg-surface/50 text-muted"
                      }`}>{item.status}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* FAQ */}
          <section className="border-t border-border py-24">
            <div className="mx-auto max-w-3xl px-4 md:px-8">
              <div className="text-center mb-12">
                <h2 className="font-heading text-3xl font-bold text-text">FAQ</h2>
                <p className="mt-2 text-sm text-muted">Common questions about AI MU</p>
              </div>
              <div className="space-y-2">
                {faqs.map((faq, i) => (
                  <details key={i} className="group rounded-xl border border-border bg-surface/20 open:bg-surface/30 transition-colors">
                    <summary className="flex cursor-pointer items-center justify-between px-5 py-4 text-sm font-medium text-text list-none">
                      {faq.q}
                      <ChevronDown className="h-4 w-4 shrink-0 text-muted transition-transform group-open:rotate-180" />
                    </summary>
                    <div className="px-5 pb-4 text-xs leading-relaxed text-muted">{faq.a}</div>
                  </details>
                ))}
              </div>
            </div>
          </section>

          {/* CTA */}
          <section className="border-t border-border py-24">
            <div className="mx-auto max-w-2xl px-4 text-center md:px-8">
              <h2 className="font-heading text-3xl font-bold text-text">Be part of the future</h2>
              <p className="mt-3 text-sm text-muted">
                AI MU is being built with direct input from the community.
                Join the waitlist to get early access and help shape the platform.
              </p>
              <a href="/waitlist" className="mt-8 inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-medium text-white transition-opacity hover:opacity-90">
                Join Waitlist
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </ReactLenis>
  );
}
