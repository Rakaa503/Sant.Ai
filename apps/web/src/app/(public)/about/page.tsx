"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import { ScientificBackground } from "@/components/shared/scientificBackground";
import { ArrowRight, BookOpen, Users, Lightbulb, Rocket } from "lucide-react";

const values = [
  {
    title: "Open Knowledge",
    description: "Segala yang kita bangun terbuka by default. Code, ideas, dan pengetahuan harus dapat diakses oleh semua.",
    icon: BookOpen,
  },
  {
    title: "Cross-Disciplinary",
    description: "Breakthrough terpenting terjadi di perpotongan bidang. Kami mendorong kolaborasi lintas science, engineering, dan design.",
    icon: Users,
  },
  {
    title: "Learn by Building",
    description: "Pengalaman praktis mengalahkan teori saja. Kami memprioritaskan proyek dan hands-on work.",
    icon: Lightbulb,
  },
  {
    title: "Community-Driven",
    description: "Platform dibentuk oleh anggotanya. Kontribusi, feedback, dan diskusi mengemudi roadmap.",
    icon: Rocket,
  },
];

const milestones = [
  { year: "2026 Q2", title: "Founding", description: "Sant.Ai didirikan sebagai Innovation & Technology Hub di bawah Fakultas Ilmu Komputer." },
  { year: "2026 Q3", title: "AI MU Beta", description: "Peluncuran AI Search & Research Assistant untuk mahasiswa dan peneliti." },
  { year: "2026 Q4", title: "AI Workspace", description: "Rilis AI Workspace & Summarizer untuk kolaborasi riset." },
  { year: "2027 Q1", title: "Full Launch", description: "Peluncuran penuh AI Learning Companion dan ekosistem Sant.Ai." },
];

export default function AboutPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        {/* Hero */}
        <section className="relative overflow-hidden section-padding">
          <ScientificBackground variant="neural" className="absolute inset-0">
            <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/60 to-background" />
          </ScientificBackground>
          <div className="container-main relative">
            <div className="mx-auto max-w-3xl text-center">
              <p className="mb-4 editorial-label">About</p>
              <h1 className="editorial-xl text-text">Membangun ekosistem terbuka untuk Science, Technology, dan Artificial Intelligence</h1>
              <p className="mt-6 editorial-body mx-auto text-muted">
                Sant.Ai adalah platform kolaborasi untuk mahasiswa, peneliti, dan developer.
                Kami percaya bahwa teknologi terbaik lahir dari kolaborasi lintas disiplin dan pembelajaran berbasis proyek nyata.
              </p>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="border-t border-border section-padding">
          <div className="container-main">
            <div className="section-header text-center">
              <p className="section-label">Values</p>
              <h2 className="editorial-md text-text">Nilai yang kami pegang</h2>
            </div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {values.map((value) => {
                const Icon = value.icon;
                return (
                  <div key={value.title} className="rounded-2xl border border-border bg-card p-6">
                    <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                      <Icon className="h-5 w-5" />
                    </div>
                    <h3 className="font-heading text-sm font-bold text-text">{value.title}</h3>
                    <p className="mt-2 text-xs leading-relaxed text-muted">{value.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Milestones */}
        <section className="border-t border-border section-padding">
          <div className="container-main">
            <div className="section-header text-center">
              <p className="section-label">Milestones</p>
              <h2 className="editorial-md text-text">Perjalanan kami</h2>
            </div>
            <div className="mx-auto max-w-2xl space-y-0">
              {milestones.map((item, i) => (
                <div key={i} className="relative flex items-start gap-6 pb-8 last:pb-0">
                  <div className="flex flex-col items-center">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 border-primary bg-primary/10 text-[10px] font-bold text-primary">
                      {i + 1}
                    </div>
                    {i < milestones.length - 1 && <div className="mt-2 w-px flex-1 bg-border" />}
                  </div>
                  <div className="pt-1">
                    <p className="text-[10px] font-medium uppercase tracking-wider text-primary">{item.year}</p>
                    <p className="mt-1 text-sm font-medium text-text">{item.title}</p>
                    <p className="mt-1 text-xs text-muted">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="border-t border-border section-padding">
          <ScientificBackground variant="knowledge" className="absolute inset-0">
            <div className="absolute inset-0 bg-background/90" />
          </ScientificBackground>
          <div className="container-main relative">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="editorial-lg text-text">Bergabung dengan ekosistem</h2>
              <p className="section-desc mx-auto mt-4">
                Jadilah bagian dari komunitas pembangun, kreator, dan inovator yang terus berkembang.
              </p>
              <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                <Link href="/register">
                  <Button size="lg" className="gap-2">
                    Mulai <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/community">
                  <Button variant="outline" size="lg">
                    Jelajahi komunitas
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
