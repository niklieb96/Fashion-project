import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import type { Brand } from "@/lib/types";

export default function BrandCard({ brand }: { brand: Brand }) {
  return (
    <Link
      href={`/brand/${encodeURIComponent(brand.name)}`}
      className="group block border border-stone-100 hover:border-stone-300 hover:shadow-sm transition-all duration-200 p-7 bg-white"
    >
      {brand.image_url && (
        <div className="relative h-8 mb-6">
          <Image
            src={brand.image_url}
            alt={brand.name}
            fill
            className="object-contain object-left"
            sizes="200px"
          />
        </div>
      )}
      <h3 className="text-xl font-light text-stone-900 mb-2.5 group-hover:text-stone-600 transition-colors">
        {brand.name}
      </h3>
      {brand.description && (
        <p className="text-sm text-stone-500 leading-relaxed line-clamp-3 mb-5">
          {brand.description}
        </p>
      )}
      <div className="flex items-center gap-1.5 text-xs text-stone-400 group-hover:text-stone-700 transition-colors">
        <span className="uppercase tracking-widest">View collection</span>
        <ArrowRight className="w-3 h-3" />
      </div>
    </Link>
  );
}
