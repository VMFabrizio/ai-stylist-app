"use client";

import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 border-b border-white/10 bg-slate-950/90 backdrop-blur-lg">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="text-xl font-bold tracking-tight">
          AI Stylist
        </Link>
        <div className="flex items-center gap-6 text-xs uppercase tracking-[0.35em]">
          <Link href="/quiz" className="text-slate-300 hover:text-white">
            Quiz
          </Link>
          <Link href="/results" className="text-slate-300 hover:text-white">
            Results
          </Link>
        </div>
      </div>
    </nav>
  );
}
