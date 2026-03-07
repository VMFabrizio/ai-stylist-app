"use client";

import { createContext, useContext, useMemo, useState } from "react";

type PreferenceBucket = {
  tag: string;
  score?: number;
};

type QuizResult = {
  user_id: string;
  taste_summary: string;
  preferences: {
    style_archetypes: PreferenceBucket[];
    color_preferences: PreferenceBucket[];
    fit_preferences: PreferenceBucket[];
  };
  catalog_matches: {
    id: string;
    item_name: string;
    brand: string;
    description: string;
    price_range: string;
    category: string;
    color: string;
    style_tags: string[];
    image_url: string;
    product_url: string;
  }[];
  responses: { image_id: string; liked: boolean; tags: string[] }[];
};

type QuizContextValue = {
  result: QuizResult | null;
  setResult: (value: QuizResult) => void;
};

const QuizContext = createContext<QuizContextValue | undefined>(undefined);

export function QuizProvider({ children }: { children: React.ReactNode }) {
  const [result, setResult] = useState<QuizResult | null>(null);
  const value = useMemo(() => ({ result, setResult }), [result]);

  return <QuizContext.Provider value={value}>{children}</QuizContext.Provider>;
}

export function useQuizResult() {
  const context = useContext(QuizContext);
  if (!context) {
    throw new Error("useQuizResult must be used inside QuizProvider");
  }
  return context;
}
