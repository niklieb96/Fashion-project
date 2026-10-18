"use client";

import { FashionItem } from "@/lib/types";
import { ExternalLink, Star } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

export default function ItemCard({ item }: { item: FashionItem }) {
  const [imgError, setImgError] = useState(false);

  return (
    <a
      href={item.link}
      target="_blank"
      rel="noopener noreferrer"
      className="group block bg-white border border-stone-100 hover:border-stone-300 hover:shadow-sm transition-all duration-200"
    >
      <div className="relative aspect-[3/4] bg-stone-50 overflow-hidden">
        {item.image_url && !imgError ? (
          <Image
            src={item.image_url}
            alt={`${item.brand} ${item.name}`}
            fill
            className="object-cover group-hover:scale-[1.03] transition-transform duration-500 ease-out"
            onError={() => setImgError(true)}
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-stone-300 text-xs font-light tracking-widest uppercase">
              No Image
            </span>
          </div>
        )}
        {item.featured && (
          <div className="absolute top-2 left-2">
            <Star className="w-3.5 h-3.5 fill-stone-700 text-stone-700" />
          </div>
        )}
        <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <div className="bg-white rounded-full p-1.5 shadow-sm border border-stone-200">
            <ExternalLink className="w-2.5 h-2.5 text-stone-500" />
          </div>
        </div>
      </div>

      <div className="p-3">
        <p className="text-[10px] text-stone-400 uppercase tracking-[0.15em] mb-0.5">
          {item.brand}
        </p>
        <p className="text-xs text-stone-800 font-light leading-snug mb-1.5 line-clamp-2">
          {item.name}
        </p>
        {item.price ? (
          <p className="text-xs text-stone-500">
            ${item.price.toLocaleString("en-US", { minimumFractionDigits: 0 })}
          </p>
        ) : null}
        {item.tags ? (
          <div className="mt-2 flex flex-wrap gap-1">
            {item.tags
              .split(",")
              .slice(0, 2)
              .map((t) => t.trim())
              .filter(Boolean)
              .map((tag) => (
                <span
                  key={tag}
                  className="text-[9px] bg-stone-50 text-stone-400 px-1.5 py-0.5 border border-stone-100"
                >
                  {tag}
                </span>
              ))}
          </div>
        ) : null}
      </div>
    </a>
  );
}
