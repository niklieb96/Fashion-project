export type FashionItem = {
  id: number;
  name: string;
  brand: string;
  price: number | null;
  image_url: string | null;
  link: string;
  category: string;
  tags: string;
  description: string;
  featured: boolean;
  created_at: string;
};

export type NewFashionItem = Omit<FashionItem, "id" | "created_at">;
