"use client";
import { CATEGORIES } from "@/lib/constants";

export default function FilterBar({ activeCategory, onCategoryChange }: { activeCategory: string; onCategoryChange: (c: string) => void }) {
  return (
    <div className="flex flex-wrap gap-2">
      {CATEGORIES.map(category => (
        <button key={category} onClick={() => onCategoryChange(category)}
          className={`px-4 py-1.5 text-xs uppercase tracking-widest transition-all duration-150 border ${
            activeCategory === category
              ? "bg-stone-900 text-white border-stone-900"
              : "bg-transparent text-stone-500 border-stone-200 hover:border-stone-400 hover:text-stone-800"
          }`}>{category}</button>
      ))}
    </div>
  );
}
