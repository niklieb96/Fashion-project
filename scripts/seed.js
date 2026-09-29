const Database = require("better-sqlite3");
const path = require("path");

const db = new Database(path.join(__dirname, "../fashion.db"));
db.pragma("journal_mode = WAL");

db.exec(`
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

const items = [
  {
    name: "Classic Chore Coat",
    brand: "A.P.C.",
    price: 495,
    image_url: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=600&q=80",
    link: "https://www.apc.fr/en/men/ready-to-wear/coats-and-jackets/chore-coat",
    category: "Outerwear",
    tags: "minimalist, cotton, workwear",
    description: "A timeless chore coat in structured cotton.",
    featured: 1,
  },
  {
    name: "5-Pocket Jean",
    brand: "Engineered Garments",
    price: 285,
    image_url: "https://images.unsplash.com/photo-1604176354204-9268737828e4?w=600&q=80",
    link: "https://engineeredgarments.com/collections/pants",
    category: "Bottoms",
    tags: "denim, japanese, workwear",
    description: "Classic five-pocket jeans with subtle details.",
    featured: 0,
  },
  {
    name: "Merino Crewneck",
    brand: "Uniqlo",
    price: 79,
    image_url: "https://images.unsplash.com/photo-1516762689617-e1cffcef479d?w=600&q=80",
    link: "https://www.uniqlo.com/us/en/products/E454641-000",
    category: "Tops",
    tags: "merino, wool, minimalist",
    description: "Fine merino wool crewneck sweater.",
    featured: 0,
  },
  {
    name: "Court Classic Sneaker",
    brand: "Common Projects",
    price: 490,
    image_url: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&q=80",
    link: "https://www.commonprojects.com/collections/shoes",
    category: "Shoes",
    tags: "leather, minimalist, white",
    description: "Minimal leather court sneaker.",
    featured: 1,
  },
  {
    name: "Canvas Tote",
    brand: "L.L. Bean",
    price: 39,
    image_url: "https://images.unsplash.com/photo-1598532163257-ae3c6b2524b6?w=600&q=80",
    link: "https://www.llbean.com/llb/shop/63428",
    category: "Bags",
    tags: "canvas, utilitarian, everyday",
    description: "Heritage canvas boat and tote bag.",
    featured: 0,
  },
  {
    name: "Oxford Button-Down",
    brand: "Ralph Lauren",
    price: 145,
    image_url: "https://images.unsplash.com/photo-1598032895397-b9472444bf93?w=600&q=80",
    link: "https://www.ralphlauren.com/oxford-shirts",
    category: "Tops",
    tags: "oxford, classic, cotton",
    description: "Classic cotton oxford button-down shirt.",
    featured: 0,
  },
];

const insert = db.prepare(`
  INSERT OR IGNORE INTO fashion_items (name, brand, price, image_url, link, category, tags, description, featured)
  VALUES (@name, @brand, @price, @image_url, @link, @category, @tags, @description, @featured)
`);

for (const item of items) {
  insert.run(item);
}

console.log(`Seeded ${items.length} sample items.`);
db.close();
