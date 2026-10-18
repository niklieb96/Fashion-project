import { neon } from "@neondatabase/serverless";
import type { FashionItem, NewFashionItem, Brand, NewBrand } from "./types";
export type { FashionItem, NewFashionItem, Brand, NewBrand } from "./types";

function getSql() {
  const url = process.env.DATABASE_URL;
  if (!url) throw new Error("DATABASE_URL environment variable is not set");
  return neon(url);
}

async function initDb() {
  const sql = getSql();
  await sql`
    CREATE TABLE IF NOT EXISTS fashion_items (
      id SERIAL PRIMARY KEY,
      name TEXT NOT NULL,
      brand TEXT NOT NULL,
      price REAL,
      image_url TEXT,
      link TEXT NOT NULL UNIQUE,
      category TEXT DEFAULT 'Other',
      tags TEXT DEFAULT '',
      description TEXT DEFAULT '',
      featured BOOLEAN DEFAULT FALSE,
      created_at TIMESTAMPTZ DEFAULT NOW()
    )
  `;
  await sql`
    CREATE TABLE IF NOT EXISTS brands (
      id SERIAL PRIMARY KEY,
      name TEXT NOT NULL UNIQUE,
      description TEXT DEFAULT '',
      image_url TEXT,
      created_at TIMESTAMPTZ DEFAULT NOW()
    )
  `;
}

let dbInitialized = false;

async function ensureInit() {
  if (!dbInitialized) {
    await initDb();
    dbInitialized = true;
  }
}

export async function getAllItems(category?: string, brand?: string): Promise<FashionItem[]> {
  await ensureInit();
  const sql = getSql();
  if (brand) {
    return sql`
      SELECT * FROM fashion_items WHERE brand = ${brand} ORDER BY created_at DESC
    ` as unknown as Promise<FashionItem[]>;
  }
  if (category && category !== "All") {
    return sql`
      SELECT * FROM fashion_items WHERE category = ${category} ORDER BY created_at DESC
    ` as unknown as Promise<FashionItem[]>;
  }
  return sql`SELECT * FROM fashion_items ORDER BY created_at DESC` as unknown as Promise<FashionItem[]>;
}

export async function getItemById(id: number): Promise<FashionItem | undefined> {
  await ensureInit();
  const sql = getSql();
  const rows = await sql`SELECT * FROM fashion_items WHERE id = ${id}`;
  return rows[0] as FashionItem | undefined;
}

export async function createItem(item: NewFashionItem): Promise<FashionItem> {
  await ensureInit();
  const sql = getSql();
  const rows = await sql`
    INSERT INTO fashion_items (name, brand, price, image_url, link, category, tags, description, featured)
    VALUES (${item.name}, ${item.brand}, ${item.price}, ${item.image_url}, ${item.link},
            ${item.category}, ${item.tags}, ${item.description}, ${item.featured})
    RETURNING *
  `;
  return rows[0] as FashionItem;
}

export async function updateItem(
  id: number,
  item: Partial<NewFashionItem>
): Promise<FashionItem | undefined> {
  await ensureInit();
  const existing = await getItemById(id);
  if (!existing) return undefined;
  const u = { ...existing, ...item };
  const sql = getSql();
  const rows = await sql`
    UPDATE fashion_items SET
      name        = ${u.name},
      brand       = ${u.brand},
      price       = ${u.price},
      image_url   = ${u.image_url},
      link        = ${u.link},
      category    = ${u.category},
      tags        = ${u.tags},
      description = ${u.description},
      featured    = ${u.featured}
    WHERE id = ${id}
    RETURNING *
  `;
  return rows[0] as FashionItem | undefined;
}

export async function deleteItem(id: number): Promise<boolean> {
  await ensureInit();
  const sql = getSql();
  const rows = await sql`DELETE FROM fashion_items WHERE id = ${id} RETURNING id`;
  return rows.length > 0;
}

export async function searchItems(query: string): Promise<FashionItem[]> {
  await ensureInit();
  const sql = getSql();
  const q = `%${query}%`;
  return sql`
    SELECT * FROM fashion_items
    WHERE name ILIKE ${q} OR brand ILIKE ${q}
       OR description ILIKE ${q} OR tags ILIKE ${q}
    ORDER BY created_at DESC
  ` as unknown as Promise<FashionItem[]>;
}

export async function getAllBrands(): Promise<Brand[]> {
  await ensureInit();
  const sql = getSql();
  return sql`SELECT * FROM brands ORDER BY name ASC` as unknown as Promise<Brand[]>;
}

export async function getBrandById(id: number): Promise<Brand | undefined> {
  await ensureInit();
  const sql = getSql();
  const rows = await sql`SELECT * FROM brands WHERE id = ${id}`;
  return rows[0] as Brand | undefined;
}

export async function createBrand(brand: NewBrand): Promise<Brand> {
  await ensureInit();
  const sql = getSql();
  const rows = await sql`
    INSERT INTO brands (name, description, image_url)
    VALUES (${brand.name}, ${brand.description}, ${brand.image_url})
    RETURNING *
  `;
  return rows[0] as Brand;
}

export async function updateBrand(
  id: number,
  brand: Partial<NewBrand>
): Promise<Brand | undefined> {
  await ensureInit();
  const existing = await getBrandById(id);
  if (!existing) return undefined;
  const u = { ...existing, ...brand };
  const sql = getSql();
  const rows = await sql`
    UPDATE brands SET
      name        = ${u.name},
      description = ${u.description},
      image_url   = ${u.image_url}
    WHERE id = ${id}
    RETURNING *
  `;
  return rows[0] as Brand | undefined;
}

export async function deleteBrand(id: number): Promise<boolean> {
  await ensureInit();
  const sql = getSql();
  const rows = await sql`DELETE FROM brands WHERE id = ${id} RETURNING id`;
  return rows.length > 0;
}
