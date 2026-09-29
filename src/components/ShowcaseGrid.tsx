"use client";

import { useCallback, useEffect, useState } from "react";
import { FashionItem } from "@/lib/types";
import ItemCard from "./ItemCard";
import FilterBar from "./FilterBar";
import SearchBar from "./SearchBar";
import { Loader2 } from "lucide-react";

export default function ShowcaseGrid() {
  const [items, setItems] = useState<FashionItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const fetchItems = useCallback(async (cat: string, q: string) => {
    setLoading(true);
    const params = new URLSearchParams();
    if (q) params.set("q", q);
    else if (cat !== "All") params.set("category", cat);
    const res = await fetch(`/api/items?${params}`);
    const data = await res.json();
    setItems(data.items || []);
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchItems(category, searchQuery);
  }, [category, searchQuery, fetchItems]);

  const handleCategoryChange = (cat: string) => {
    setCategory(cat);
    setSearchQuery("");
  };

  const handleSearch = (q: string) => {
    setSearchQuery(q);
    if (q) setCategory("All");
  };

  return (
    <div>
      {/* Controls */}
      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <div className="flex-1">
          <FilterBar
            activeCategory={searchQuery ? "All" : category}
            onCategoryChange={handleCategoryChange}
          />
        </div>
        <div className="w-full sm:w-64">
          <SearchBar onSearch={handleSearch} />
        </div>
      </div>

      {/* Count */}
      <p className="text-xs text-stone-400 uppercase tracking-widest mb-6">
        {loading ? "Loading..." : `${items.length} item${items.length !== 1 ? "s" : ""}`}
      </p>

      {/* Grid */}
      {loading ? (
        <div className="flex items-center justify-center py-24">
          <Loader2 className="w-6 h-6 text-stone-300 animate-spin" />
        </div>
      ) : items.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 text-center">
          <p className="text-stone-400 text-sm mb-2">No items found</p>
          <p className="text-stone-300 text-xs">
            {searchQuery
              ? `No results for "${searchQuery}"`
              : "Add items via the admin panel"}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {items.map((item) => (
            <ItemCard key={item.id} item={item} />
          ))}
        </div>
      )}
    </div>
  );
}
