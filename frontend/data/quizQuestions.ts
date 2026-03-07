export type QuizOption = {
  value: string;
  label: string;
  description: string;
  tags: string[];
};

export type QuizQuestion = {
  id: string;
  prompt: string;
  options: QuizOption[];
};

export const quizQuestions: QuizQuestion[] = [
  {
    id: "color",
    prompt: "Which palette feels most you?",
    options: [
      { value: "neutrals", label: "Muted neutrals", description: "cream, sand, and charcoal for a low-contrast look.", tags: ["neutral", "minimalist"] },
      { value: "pops", label: "Bold pops", description: "color-blocked reds or deep jewel tones.", tags: ["bold", "modern"] },
      { value: "pastel", label: "Soft pastels", description: "powder blues, blush, and lavender.", tags: ["feminine", "calm"] },
      { value: "black", label: "Monochrome black", description: "all-black, edgy statements with texture.", tags: ["edgy", "streetwear"] },
    ],
  },
  {
    id: "silhouette",
    prompt: "Choose your preferred silhouette mood.",
    options: [
      { value: "tailored", label: "Tailored structure", description: "Sharp shoulders with crisp separations.", tags: ["tailored", "clean"] },
      { value: "flowy", label: "Flowy ease", description: "Soft, draped layers and effortless volume.", tags: ["flowy", "bohemian"] },
      { value: "oversized", label: "Oversized energy", description: "Dropped shoulders and roomy cuts.", tags: ["oversized", "streetwear"] },
      { value: "fitted", label: "Fitted polish", description: "Sculpted tops and sleek bottoms.", tags: ["fitted", "minimalist"] },
    ],
  },
  {
    id: "brands",
    prompt: "Which vibe best describes your go-to inspiration?",
    options: [
      { value: "editorial", label: "Editorial fashion houses", description: "Clean runway tailoring and premium fabrications.", tags: ["luxury", "quiet luxury"] },
      { value: "sneaker", label: "Sneaker culture", description: "Underground drops and elevated street silhouettes.", tags: ["streetwear", "sporty"] },
      { value: "vintage", label: "Vintage archive", description: "Retro florals, high waists, and heritage prints.", tags: ["vintage", "feminine"] },
      { value: "atelier", label: "Independent atelier", description: "Conceptual silhouettes and artful textures.", tags: ["avant-garde", "structured"] },
    ],
  },
  {
    id: "occasion",
    prompt: "Pick the occasion you're styling for right now.",
    options: [
      { value: "rooftop", label: "Rooftop dinner", description: "City views and luxe layering.", tags: ["evening", "modern"] },
      { value: "office", label: "Creative office", description: "Polished but wearable for lengthy days.", tags: ["workwear", "tailored"] },
      { value: "weekend", label: "Weekend wander", description: "Comfort-forward but chic.", tags: ["casual", "green"] },
      { value: "event", label: "Art opening", description: "Bold statements meant to turn heads.", tags: ["avant-garde", "edgy"] },
    ],
  },
  {
    id: "budget",
    prompt: "What budget feels right for curated pieces?",
    options: [
      { value: "investment", label: "Investment pieces", description: "Quality, long-lasting staples.", tags: ["luxury", "quiet luxury"] },
      { value: "midrange", label: "Mid-range gems", description: "Modern brands with thoughtful craft.", tags: ["modern", "premium"] },
      { value: "everyday", label: "Everyday staples", description: "Affordable, wearable foundations.", tags: ["casual", "comfort"] },
      { value: "experimental", label: "Experimental finds", description: "Conceptual or limited-run pieces.", tags: ["avant-garde", "edgy"] },
    ],
  },
  {
    id: "vibe",
    prompt: "Pick the vibe that feels most you.",
    options: [
      { value: "effortless", label: "Effortless refinement", description: "Soft edges with expert tailoring.", tags: ["minimalist", "calm"] },
      { value: "electric", label: "Electric energy", description: "High contrast and statement accessories.", tags: ["edgy", "bold"] },
      { value: "dreamy", label: "Dreamy romantic", description: "Pastels, ruffles, and luminous textures.", tags: ["feminine", "soft"] },
      { value: "grounded", label: "Grounded earthiness", description: "Organic colors and tactile layers.", tags: ["workwear", "earth"] },
    ],
  },
  {
    id: "fit",
    prompt: "What feels best on your body right now?",
    options: [
      { value: "relaxed", label: "Relaxed ease", description: "Roomy, breathable fits for comfort.", tags: ["relaxed", "casual"] },
      { value: "structured", label: "Structured tailoring", description: "Crisp lines that feel purposeful.", tags: ["structured", "tailored"] },
      { value: "sleek", label: "Sleek silhouettes", description: "Fitted, close-to-the-body confidence.", tags: ["fitted", "minimalist"] },
      { value: "oversized", label: "Oversized drama", description: "Bold volumes with dropped shoulders.", tags: ["oversized", "streetwear"] },
    ],
  },
];
