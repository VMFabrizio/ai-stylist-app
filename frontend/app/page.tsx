"use client";

import Link from "next/link";
import HeroSection from "../components/HeroSection";
import Navbar from "../components/Navbar";
import ProductCard from "../components/ProductCard";

const sampleLooks = [
  {
    title: "Quiet Minimal Layers",
    description: "Soft neutrals with architectural tailoring for effortless evenings.",
    tags: ["minimalist", "neutral", "tailored"],
    color: "Cream",
  },
  {
    title: "Urban Luxe Edge",
    description: "Dark luxury staples with a pop of metallic hardware.",
    tags: ["edgy", "monochrome", "modern"],
    color: "Black",
  },
  {
    title: "Effortless Sport-Luxe",
    description: "Relaxed jogger silhouettes elevated with polished materials.",
    tags: ["sporty", "relaxed", "premium"],
    color: "Slate",
  },
];

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main className="mx-auto max-w-6xl px-6 py-10 space-y-12">
        <HeroSection />
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.4em] text-slate-400">
                curated looks
              </p>
              <h3 className="text-2xl font-semibold">Sample style stories</h3>
            </div>
            <Link
              href="/quiz"
              className="text-sm font-semibold uppercase tracking-wide text-amber-300"
            >
              Start quiz →
            </Link>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {sampleLooks.map((look) => (
              <ProductCard
                key={look.title}
                image="https://images.unsplash.com/photo-1503341455253-b2e723bb3dbb?auto=format&fit=crop&w=800&q=80"
                itemName={look.title}
                brand="AI Atelier"
                description={look.description}
                priceRange="$150-$320"
                tags={look.tags}
                color={look.color}
                onView={() => {}}
              />
            ))}
          </div>
        </section>
      </main>
    </>
  );
}
