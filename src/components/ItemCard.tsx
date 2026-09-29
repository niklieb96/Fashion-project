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
      className="group block bg-white border border-stone-200 hover:border-stone-400 transition-all duration-200 hover:shadow-md"
    >
      {/* Image */}
      <div className="relative aspect-[3/4] bg-stone-100 overflow-hidden">
        {item.image_url && !imgError ? (
          <Image
            src={item.image_url}
            alt={`${item.brand} ${item.name}`}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            onError={() => setImgError(true)}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-stone-300 text-sm font-light tracking-widest uppercase">
              No Image
            </span>
          </div>
        )}
        {item.featured ? (
          <div className="absolute top-2 left-2">
            <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
          </div>
        ) : null}
        <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <div className="bg-white rounded-full p-1 shadow">
            <ExternalLink className="w-3 h-3 text-stone-600" />
          </div>
        </div>
      </div>

      {/* Info */}
      <div className="p-3">
        <p className="text-xs text-stone-400 uppercase tracking-widest mb-0.5">
          {item.brand}
        </p>
        <p className="text-sm text-stone-800 font-medium leading-snug mb-1 line-clamp-2">
          {item.name}
        </p>
        {item.price ? (
          <p className="text-sm text-stone-600">
            ${item.price.toLocaleString("en-US", { minimumFractionDigits: 0 })}
          </p>
        ) : null}
        {item.tags ? (
          <div className="mt-2 flex flex-wrap gap-1">
            {item.tags
              .split(",")
              .slice(0, 3)
              .map((tag) => tag.trim())
              .filter(Boolean)
              .map((tag) => (
                <span
                  key={tag}
                  className="text-xs bg-stone-100 text-stone-500 px-1.5 py-0.5"
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
