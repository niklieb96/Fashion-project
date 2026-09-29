import Database from "better-sqlite3";
import path from "path";
import type { FashionItem, NewFashionItem } from "./types";
export type { FashionItem, NewFashionItem } from "./types";

const DB_PATH = path.join(process.cwd(), "fashion.db");

let db: Database.Database;

function getDb(): Database.Database {
  if (!db) {
    db = new Database(DB_PATH);
    db.pragma("journal_mode = WAL");
    initDb(db);
  }
  return db;
}

function initDb(database: Database.Database) {
  database.exec(`
    CREATE TABLE IF NOT EXISTS fashion_items (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      brand TEXT NOT NULL,
      price REAL,
      image_url TEXT,
      link TEXT NOT NULL UNIQUE,
      category TEXT DEFAULT 'Other',
      tags TEXT DEFAULT '',
      description TEXT DEFAULT '',
      featured INTEGER DEFAULT 0,
      created_at TEXT DEFAULT (datetime('now'))
    )
  `);
}

export function getAllItems(category?: string): FashionItem[] {
  const database = getDb();
  if (category && category !== "All") {
    return database
      .prepare(
        "SELECT * FROM fashion_items WHERE category = ? ORDER BY created_at DESC"
      )
      .all(category) as FashionItem[];
  }
  return database
    .prepare("SELECT * FROM fashion_items ORDER BY created_at DESC")
    .all() as FashionItem[];
}

export function getItemById(id: number): FashionItem | undefined {
  const database = getDb();
  return database
    .prepare("SELECT * FROM fashion_items WHERE id = ?")
    .get(id) as FashionItem | undefined;
}

export function createItem(item: NewFashionItem): FashionItem {
  const database = getDb();
  const result = database
    .prepare(
      `INSERT INTO fashion_items (name, brand, price, image_url, link, category, tags, description, featured)
       VALUES (@name, @brand, @price, @image_url, @link, @category, @tags, @description, @featured)`
    )
    .run({
      ...item,
      featured: item.featured ? 1 : 0,
    });
  return getItemById(result.lastInsertRowid as number)!;
}

export function updateItem(
  id: number,
  item: Partial<NewFashionItem>
): FashionItem | undefined {
  const database = getDb();
  const existing = getItemById(id);
  if (!existing) return undefined;

  const updated = { ...existing, ...item };
  database
    .prepare(
      `UPDATE fashion_items SET name=@name, brand=@brand, price=@price, image_url=@image_url,
       link=@link, category=@category, tags=@tags, description=@description, featured=@featured
       WHERE id=@id`
    )
    .run({ ...updated, featured: updated.featured ? 1 : 0, id });
  return getItemById(id);
}

export function deleteItem(id: number): boolean {
  const database = getDb();
  const result = database
    .prepare("DELETE FROM fashion_items WHERE id = ?")
    .run(id);
  return result.changes > 0;
}

export function searchItems(query: string): FashionItem[] {
  const database = getDb();
  const q = `%${query}%`;
  return database
    .prepare(
      `SELECT * FROM fashion_items
       WHERE name LIKE ? OR brand LIKE ? OR description LIKE ? OR tags LIKE ?
       ORDER BY created_at DESC`
    )
    .all(q, q, q, q) as FashionItem[];
}
