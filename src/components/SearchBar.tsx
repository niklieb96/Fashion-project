"use client";

import { Search, X } from "lucide-react";
import { useState, useRef, useEffect } from "react";

interface SearchBarProps {
  onSearch: (query: string) => void;
}

export default function SearchBar({ onSearch }: SearchBarProps) {
  const [value, setValue] = useState("");
  const [focused, setFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      onSearch(value);
    }, 300);
    return () => clearTimeout(timer);
  }, [value, onSearch]);

  return (
    <div
      className={`flex items-center rounded-full border transition-all duration-200 ${
        focused
          ? "border-white/[0.16] bg-white/[0.07]"
          : "border-white/[0.07] bg-white/[0.03]"
      } backdrop-blur-sm`}
    >
      <Search className="w-3 h-3 text-white/25 ml-3.5 flex-shrink-0" />
      <input
        ref={inputRef}
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        placeholder="Search..."
        className="flex-1 px-3 py-2 text-xs text-white/65 bg-transparent outline-none placeholder:text-white/20"
      />
      {value && (
        <button
          onClick={() => setValue("")}
          className="mr-3 text-white/25 hover:text-white/50 transition-colors"
        >
          <X className="w-3 h-3" />
        </button>
      )}
    </div>
  );
}
