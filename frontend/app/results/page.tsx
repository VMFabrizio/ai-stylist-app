"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import Navbar from "../../components/Navbar";
import TasteProfileBanner from "../../components/TasteProfileBanner";
import FilterBar, { FilterValues } from "../../components/FilterBar";
import ProductCard from "../../components/ProductCard";
import EmptyState from "../../components/EmptyState";
import LoadingSpinner from "../../components/LoadingSpinner";
import { useQuizResult } from "../../context/QuizContext";
import { fetchRecommendations } from "../../services/api";

export default function ResultsPage() {
  const { result } = useQuizResult();
  const [filters, setFilters] = useState<FilterValues>({
    category: "",
    color: "",
    price: "",
    tag: "",
    search: "",
  });
  const [items, setItems] = useState(result?.catalog_matches ?? []);
  const [loading, setLoading] = useState(false);
  const [fetchError, setFetchError] = useState<string | null>(null);

  const sourceItems = result?.catalog_matches ?? [];

  const categories = useMemo(
    () => Array.from(new Set(sourceItems.map((item) => item.category))).sort(),
    [sourceItems]
  );
  const colors = useMemo(
    () => Array.from(new Set(sourceItems.map((item) => item.color))).sort(),
    [sourceItems]
  );
  const prices = useMemo(
    () => Array.from(new Set(sourceItems.map((item) => item.price_range))).sort(),
    [sourceItems]
  );
  const tags = useMemo(
    () =>
      Array.from(new Set(sourceItems.flatMap((item) => item.style_tags.map((tag) => tag.toLowerCase())))).sort(),
    [sourceItems]
  );

  useEffect(() => {
    if (!result) {
      setItems([]);
      return;
    }

    const runSearch = async () => {
      setLoading(true);
      setFetchError(null);
      try {
        const data = await fetchRecommendations({
          user_id: result.user_id,
          preferences: result.preferences as Record<string, { tag: string }[]>,
          responses: result.responses,
          filters,
        });
        setItems(data.items);
      } catch (err) {
        setFetchError(err instanceof Error ? err.message : "Unable to load recommendations");
      } finally {
        setLoading(false);
      }
    };

    runSearch();
  }, [filters, result]);

  const handleFilter = (overrides: Partial<FilterValues>) => {
    setFilters((prev) => ({ ...prev, ...overrides }));
  };

  if (!result) {
    return (
      <>
        <Navbar />
        <div className="mx-auto flex min-h-screen max-w-4xl flex-col items-center justify-center gap-6 px-6 py-16 text-center">
          <EmptyState
            title="Quiz your taste"
            description="Start a style quiz to unlock curated recommendations."
            actionLabel="Take the Quiz"
            actionHref="/quiz"
          />
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <main className="mx-auto max-w-6xl space-y-8 px-6 py-12">
        <TasteProfileBanner
          summary={result.taste_summary}
          tags={[...result.preferences.style_archetypes, ...result.preferences.color_preferences]
            .slice(0, 5)
            .map((entry) => entry.tag)}
        />
        <FilterBar
          categories={categories}
          colors={colors}
          prices={prices}
          tags={tags}
          values={filters}
          onFilter={handleFilter}
        />
        <div className="flex flex-wrap items-center justify-between gap-4">
          <p className="text-xs uppercase tracking-[0.4em] text-slate-400">
            Showing {items.length} curated looks
          </p>
          <Link
            href="/quiz"
            className="rounded-full border border-white/20 px-5 py-2 text-[0.65rem] uppercase tracking-[0.4em] text-slate-200 transition hover:border-white"
          >
            Retake quiz
          </Link>
        </div>
        {fetchError && (
          <p className="text-sm text-rose-400">{fetchError}</p>
        )}
        {loading ? (
          <div className="py-16">
            <LoadingSpinner />
          </div>
        ) : items.length === 0 ? (
          <EmptyState
            title="Nothing found"
            description="Try resetting filters or retaking the quiz."
            actionLabel="Retake Quiz"
            actionHref="/quiz"
          />
        ) : (
          <section className="grid gap-6 md:grid-cols-2">
            {items.map((item) => (
              <ProductCard
                key={item.id}
                image={item.image_url}
                itemName={item.item_name}
                brand={item.brand}
                description={item.description}
                priceRange={item.price_range}
                tags={item.style_tags}
                color={item.color}
                onView={() => window.open(item.product_url, "_blank")}
              />
            ))}
          </section>
        )}
      </main>
    </>
  );
}
