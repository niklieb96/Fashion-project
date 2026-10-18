import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function CategoryCard({ category }: { category: string }) {
  return (
    <Link
      href={`/category/${encodeURIComponent(category)}`}
      className="group flex items-center justify-between border border-stone-100 hover:border-stone-300 hover:bg-stone-50 transition-all duration-200 px-4 py-4"
    >
      <span className="text-sm text-stone-600 group-hover:text-stone-900 transition-colors font-light">
        {category}
      </span>
      <ArrowRight className="w-3.5 h-3.5 text-stone-300 group-hover:text-stone-500 transition-colors" />
    </Link>
  );
}
