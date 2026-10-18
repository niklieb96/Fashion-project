"use client";

import { CATEGORIES } from "@/lib/constants";

interface FilterBarProps {
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}

export default function FilterBar({ activeCategory, onCategoryChange }: FilterBarProps) {
  return (
    <div className="flex flex-wrap gap-1.5">
      {CATEGORIES.map((category) => (
        <button
          key={category}
          onClick={() => onCategoryChange(category)}
          className={`px-3.5 py-1.5 text-[10px] uppercase tracking-[0.15em] rounded-full transition-all duration-200 border ${
            activeCategory === category
              ? "bg-white/[0.1] text-white/85 border-white/[0.16]"
              : "bg-transparent text-white/28 border-white/[0.07] hover:border-white/[0.13] hover:text-white/50"
          }`}
        >
          {category}
        </button>
      ))}
    </div>
  );
}
