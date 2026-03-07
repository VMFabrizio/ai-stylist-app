"use client";

import clsx from "clsx";

type ProductCardProps = {
  image: string;
  itemName: string;
  brand: string;
  description: string;
  priceRange: string;
  tags: string[];
  color?: string;
  onView?: () => void;
};

export default function ProductCard({
  image,
  itemName,
  brand,
  description,
  priceRange,
  tags,
  color,
  onView,
}: ProductCardProps) {
  return (
    <article className="flex flex-col gap-4 rounded-3xl border border-white/10 bg-white/5 p-5 shadow-lg shadow-black/30 transition-all hover:-translate-y-1 hover:border-amber-300/40">
      <div className="relative h-56 overflow-hidden rounded-2xl">
        <img
          src={image}
          alt={itemName}
          className="h-full w-full object-cover transition duration-300 ease-in-out hover:scale-105"
        />
        {color && (
          <span className="absolute right-4 top-4 rounded-full bg-white/60 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-slate-900">
            {color}
          </span>
        )}
      </div>
      <div className="space-y-1">
        <h3 className="text-lg font-semibold">{itemName}</h3>
        <p className="text-sm uppercase tracking-[0.4em] text-slate-400">{brand}</p>
      </div>
      <p className="text-sm text-slate-300">{description}</p>
      <div className="flex flex-wrap gap-2">
        {tags.map((tag) => (
          <span
            key={tag}
            className="rounded-full border border-white/20 px-3 py-1 text-[0.65rem] uppercase tracking-[0.3em] text-slate-300"
          >
            {tag}
          </span>
        ))}
      </div>
      <div className="flex items-center justify-between text-sm text-slate-100">
        <span className="text-base font-semibold">{priceRange}</span>
        <button
          type="button"
          onClick={onView}
          className="rounded-full bg-white/20 px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-white transition hover:bg-white/40"
        >
          View Item
        </button>
      </div>
    </article>
  );
}
