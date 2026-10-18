"use client";

import { useCallback, useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Loader2 } from "lucide-react";
import { FashionItem } from "@/lib/types";
import ItemCard from "@/components/ItemCard";

export default function CategoryPage() {
  const params = useParams();
  const categoryName = decodeURIComponent(params.name as string);
  const [items, setItems] = useState<FashionItem[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchItems = useCallback(async () => {
    setLoading(true);
    const res = await fetch(`/api/items?category=${encodeURIComponent(categoryName)}`);
    const data = await res.json();
    setItems(data.items || []);
    setLoading(false);
  }, [categoryName]);

  useEffect(() => {
    fetchItems();
  }, [fetchItems]);

  return (
    <div className="min-h-screen bg-white">
      <header className="sticky top-0 z-10 border-b border-stone-100 bg-white/95 backdrop-blur-sm">
        <div className="max-w-screen-xl mx-auto px-6 py-4">
          <Link
            href="/"
            className="flex items-center gap-1.5 text-xs text-stone-400 hover:text-stone-700 transition-colors uppercase tracking-widest w-fit"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Back
          </Link>
        </div>
      </header>

      <main className="max-w-screen-xl mx-auto px-6 py-16">
        <div className="mb-12">
          <p className="text-[10px] tracking-[0.3em] uppercase text-stone-400 mb-3">Category</p>
          <h1 className="text-4xl font-light text-stone-900">{categoryName}</h1>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-24">
            <Loader2 className="w-5 h-5 text-stone-300 animate-spin" />
          </div>
        ) : items.length === 0 ? (
          <div className="py-24 text-center border border-dashed border-stone-200">
            <p className="text-stone-400 text-sm">No items in this category yet</p>
          </div>
        ) : (
          <>
            <p className="text-xs text-stone-400 uppercase tracking-widest mb-8">
              {items.length} item{items.length !== 1 ? "s" : ""}
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {items.map((item) => (
                <ItemCard key={item.id} item={item} />
              ))}
            </div>
          </>
        )}
      </main>
    </div>
  );
}
