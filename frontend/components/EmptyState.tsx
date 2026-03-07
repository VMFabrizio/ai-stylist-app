"use client";

import Link from "next/link";

export default function EmptyState({
  title,
  description,
  actionLabel,
  actionHref,
}: {
  title: string;
  description: string;
  actionLabel: string;
  actionHref: string;
}) {
  return (
    <div className="text-center">
      <p className="text-sm uppercase tracking-[0.5em] text-slate-400">No results</p>
      <h3 className="mt-3 text-2xl font-semibold"> {title}</h3>
      <p className="mt-2 text-slate-300">{description}</p>
      <Link
        href={actionHref}
        className="mt-5 inline-flex rounded-full border border-white/30 px-6 py-3 text-xs font-semibold uppercase tracking-[0.4em] text-white transition hover:border-white"
      >
        {actionLabel}
      </Link>
    </div>
  );
}
