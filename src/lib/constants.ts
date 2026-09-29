export const CATEGORIES = [
  "All",
  "Tops",
  "Bottoms",
  "Outerwear",
  "Shoes",
  "Accessories",
  "Bags",
  "Dresses",
  "Suits",
  "Activewear",
  "Other",
] as const;

export type Category = (typeof CATEGORIES)[number];
