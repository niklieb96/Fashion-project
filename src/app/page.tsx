import Link from "next/link";
import { Settings } from "lucide-react";
import { getAllBrands } from "@/lib/db";
import { CATEGORIES } from "@/lib/constants";
import BrandCard from "@/components/BrandCard";
import CategoryCard from "@/components/CategoryCard";

export const dynamic = "force-dynamic";

export default async function Home() {
  let brands = [];
  try {
    brands = await getAllBrands();
  } catch {}

  const browsableCategories = CATEGORIES.filter((c) => c !== "All");

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="sticky top-0 z-10 border-b border-stone-100 bg-white/95 backdrop-blur-sm">
        <div className="max-w-screen-xl mx-auto px-6 py-4 flex items-center justify-between">
          <h1 className="text-sm font-medium tracking-[0.2em] uppercase text-stone-900">
            Fashion Archive
          </h1>
          <Link
            href="/admin"
            className="flex items-center gap-1.5 text-xs text-stone-400 hover:text-stone-700 transition-colors uppercase tracking-widest"
          >
            <Settings className="w-3.5 h-3.5" />
            Manage
          </Link>
        </div>
      </header>

      {/* Brands */}
      <section className="max-w-screen-xl mx-auto px-6 py-20">
        <div className="mb-12">
          <p className="text-[10px] tracking-[0.3em] uppercase text-stone-400 mb-3">
            Our Selection
          </p>
          <h2 className="text-4xl font-light text-stone-900">The Brands</h2>
        </div>
        {brands.length === 0 ? (
          <div className="py-20 text-center border border-dashed border-stone-200">
            <p className="text-stone-400 text-sm mb-2">No brands yet</p>
            <Link
              href="/admin"
              className="text-xs text-stone-400 hover:text-stone-700 underline transition-colors"
            >
              Add brands from the admin panel
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {brands.map((brand) => (
              <BrandCard key={brand.id} brand={brand} />
            ))}
          </div>
        )}
      </section>

      {/* Categories */}
      <section className="border-t border-stone-100">
        <div className="max-w-screen-xl mx-auto px-6 py-20">
          <div className="mb-12">
            <p className="text-[10px] tracking-[0.3em] uppercase text-stone-400 mb-3">
              Discover
            </p>
            <h2 className="text-4xl font-light text-stone-900">Browse by Category</h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
            {browsableCategories.map((cat) => (
              <CategoryCard key={cat} category={cat} />
            ))}
          </div>
        </div>
      </section>

      {/* About */}
      <section className="border-t border-stone-100">
        <div className="max-w-screen-xl mx-auto px-6 py-20">
          <div className="max-w-2xl">
            <p className="text-[10px] tracking-[0.3em] uppercase text-stone-400 mb-3">
              Our Story
            </p>
            <h2 className="text-4xl font-light text-stone-900 mb-10">About the Archive</h2>
            <div className="space-y-5 text-stone-600 leading-relaxed text-[15px]">
              <p>
                Fashion Archive is a personal curation of clothing, footwear, and accessories that
                balance craft, function, and lasting style. What began as a simple collection of
                saved links has grown into a considered guide to the brands and pieces that define
                a thoughtful wardrobe.
              </p>
              <p>
                Each brand featured here has been selected for its commitment to quality materials,
                considered design, and enduring relevance. We believe in buying less, but better
                — in pieces that outlast trends and grow more meaningful with wear.
              </p>
              <p>
                This archive is a living document. It grows slowly, deliberately, and only with
                things worth keeping.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-stone-100">
        <div className="max-w-screen-xl mx-auto px-6 py-8">
          <p className="text-xs text-stone-300 text-center tracking-widest uppercase">
            Fashion Archive
          </p>
        </div>
      </footer>
    </div>
  );
}
