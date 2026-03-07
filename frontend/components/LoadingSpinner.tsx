"use client";

export default function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center">
      <div className="h-16 w-16 animate-spin rounded-full border-4 border-t-amber-300 border-b-white/20 border-l-transparent border-r-transparent" />
    </div>
  );
}
