"use client";

import { FashionItem } from "@/lib/types";
import { ExternalLink, Star } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

interface ItemCardProps {
  item: FashionItem;
}

export default function ItemCard({ item }: ItemCardProps) {
  const [imgError, setImgError] = useState(false);

  return (
    <a
      href={item.link}
      target="_blank"
      rel="noopener noreferrer"
      className="group block rounded-2xl border border-white/[0.06] bg-white/[0.02] backdrop-blur-sm hover:border-white/[0.13] hover:bg-white/[0.04] transition-all duration-300"
    >
      {/* Image */}
      <div className="relative aspect-[3/4] overflow-hidden rounded-t-2xl bg-white/[0.03]">
        {item.image_url && !imgError ? (
          <Image
            src={item.image_url}
            alt={`${item.brand} ${item.name}`}
            fill
            className="object-cover group-hover:scale-[1.04] transition-transform duration-500 ease-out"
            onError={() => setImgError(true)}
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-white/15 text-[10px] font-light tracking-[0.2em] uppercase">
              No Image
            </span>
          </div>
        )}
        {item.featured && (
          <div className="absolute top-3 left-3">
            <Star className="w-3 h-3 fill-white/60 text-white/60" />
          </div>
        )}
        <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <div className="bg-black/30 backdrop-blur-md rounded-full p-1.5 border border-white/15">
            <ExternalLink className="w-2.5 h-2.5 text-white/70" />
          </div>
        </div>
        <div className="absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
      </div>

      {/* Info */}
      <div className="px-3 pt-3 pb-3.5">
        <p className="text-[9px] text-white/30 uppercase tracking-[0.18em] mb-1">
          {item.brand}
        </p>
        <p className="text-xs text-white/65 font-light leading-snug mb-2 line-clamp-2">
          {item.name}
        </p>
        {item.price ? (
          <p className="text-xs text-white/40 font-light">
            ${item.price.toLocaleString("en-US", { minimumFractionDigits: 0 })}
          </p>
        ) : null}
        {item.tags ? (
          <div className="mt-2.5 flex flex-wrap gap-1">
            {item.tags
              .split(",")
              .slice(0, 2)
              .map((tag) => tag.trim())
              .filter(Boolean)
              .map((tag) => (
                <span
                  key={tag}
                  className="text-[9px] bg-white/[0.05] text-white/25 px-2 py-0.5 rounded-full tracking-wide"
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
