"use client";

import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="rounded-3xl border border-white/10 bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 p-8 shadow-2xl shadow-amber-600/10">
      <div className="max-w-3xl space-y-5">
        <p className="text-sm uppercase tracking-[0.4em] text-amber-200">
          Discover your style
        </p>
        <h1 className="text-4xl font-semibold leading-tight text-white md:text-5xl">
          AI styling that learns your taste from photos and swipe answers.
        </h1>
        <p className="text-lg text-slate-300">
          Take the visual quiz, generate a personalized taste profile, and let our curation engine
          match you to premium fashion pieces across aesthetics you already love.
        </p>
        <div className="flex flex-wrap gap-4">
          <Link
            href="/quiz"
            className="rounded-full bg-amber-300/80 px-6 py-3 text-sm font-semibold uppercase tracking-[0.35em] text-slate-950 shadow-lg shadow-amber-300/40 transition hover:bg-amber-300"
          >
            Take the Style Quiz
          </Link>
          <Link
            href="/results"
            className="rounded-full border border-white/30 px-6 py-3 text-sm font-semibold uppercase tracking-[0.35em] text-white transition hover:border-white"
          >
            Explore Taste Profiles
          </Link>
        </div>
      </div>
    </section>
  );
}
