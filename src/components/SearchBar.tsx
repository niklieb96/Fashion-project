"use client";
import { Search, X } from "lucide-react";
import { useState, useRef, useEffect } from "react";

export default function SearchBar({ onSearch }: { onSearch: (q: string) => void }) {
  const [value, setValue] = useState("");
  const [focused, setFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => onSearch(value), 300);
    return () => clearTimeout(timer);
  }, [value, onSearch]);

  return (
    <div className={`flex items-center border transition-colors duration-150 ${focused ? "border-stone-900" : "border-stone-200"} bg-white`}>
      <Search className="w-3.5 h-3.5 text-stone-400 ml-3 flex-shrink-0" />
      <input ref={inputRef} type="text" value={value} onChange={e => setValue(e.target.value)}
        onFocus={() => setFocused(true)} onBlur={() => setFocused(false)} placeholder="Search items..."
        className="flex-1 px-3 py-2 text-sm text-stone-800 bg-transparent outline-none placeholder:text-stone-300" />
      {value && <button onClick={() => setValue("")} className="mr-2 text-stone-400 hover:text-stone-600 transition-colors"><X className="w-3.5 h-3.5" /></button>}
    </div>
  );
}
