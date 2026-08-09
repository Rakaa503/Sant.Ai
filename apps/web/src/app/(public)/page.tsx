import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import { ScientificBackground } from "@/components/shared/scientificBackground";
import GuideCarousel from "@/components/shared/guideCarousel";
import ProgramCarousel from "@/components/shared/programCarousel";

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        {/* Hero — Neural network */}
        <section className="relative overflow-hidden section-padding">
          <ScientificBackground variant="neural" className="absolute inset-0">
            <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/60 to-background" />
          </ScientificBackground>
          <div className="container-main relative">
            <div className="mx-auto max-w-3xl text-center">
              <p className="mb-4 editorial-label">Science, Technology & Artificial Intelligence</p>
              <h1 className="editorial-xl text-text">
                Sant.Ai
              </h1>
              <p className="mt-6 editorial-body mx-auto text-muted">
                Ekosistem kolaborasi akademik untuk mahasiswa, peneliti, dan developer.
                Bangun proyek nyata, eksplorasi riset, dan kembangkan solusi AI yang berdampak.
              </p>
              <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                <Link href="/showcase">
                  <Button size="lg" className="gap-2">
                    Lihat Karya <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/community">
                  <Button variant="outline" size="lg">
                    Bergabung
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Programs — Engineering grid */}
        <section className="relative border-t border-border section-padding" id="programs">
          <ScientificBackground variant="grid" className="absolute inset-0">
            <div className="absolute inset-0 bg-background/90" />
          </ScientificBackground>
          <div className="container-main relative">
            <div className="section-header">
              <p className="section-label">Programs</p>
              <h2 className="editorial-md text-text">Tiga program, satu ekosistem</h2>
              <p className="section-desc">
                Setiap program membawa perspektif unik. Bersama, mereka membentuk tim teknologi yang lengkap.
              </p>
            </div>
            <ProgramCarousel />
          </div>
        </section>

        {/* How It Works — Timeline */}
        <section className="border-t border-border section-padding">
          <div className="container-main">
            <div className="section-header">
              <p className="section-label">How it works</p>
              <h2 className="editorial-md text-text">Dari ide menjadi dampak</h2>
              <p className="section-desc">
                Alur kerja sederhana yang mengubah ide proyek menjadi dampak nyata.
              </p>
            </div>
            <GuideCarousel />
          </div>
        </section>

        {/* Community / CTA — Knowledge graph */}
        <section className="relative border-t border-border section-padding">
          <ScientificBackground variant="knowledge" className="absolute inset-0">
            <div className="absolute inset-0 bg-background/90" />
          </ScientificBackground>
          <div className="container-main relative">
            <div className="mx-auto max-w-3xl text-center">
              <p className="editorial-label">Community</p>
              <h2 className="editorial-lg text-text mt-4">Bergabung dengan ekosistem</h2>
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
