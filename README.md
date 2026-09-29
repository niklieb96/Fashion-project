# Fashion Archive

A curated fashion showcase web application — browse and manage a personal collection of fashion links.

## Getting Started

```bash
npm install
npm run seed   # optional: add 6 sample items
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the showcase.

## Features

- **Showcase grid** — responsive 2–5 column product grid with brand, name, price
- **Category filters** — Tops, Bottoms, Outerwear, Shoes, Accessories, Bags, Dresses, Suits, Activewear
- **Search** — live keyword search across name, brand, description, and tags
- **Featured items** — star-marked picks highlighted in the grid
- **Admin panel** (`/admin`) — add, edit, and delete items
- **SQLite database** — local file-based database (`fashion.db`), no external service needed

## Adding Items

Go to `/admin` and click **Add Item**. Fill in:
- **Link** (required) — the URL to the product page
- **Name** and **Brand** (required)
- **Price**, **Category**, **Image URL**, **Tags**, **Description** (optional)
- Toggle **Featured** to star an item in the grid

## Tech Stack

- Next.js 14 (App Router) + TypeScript
- Tailwind CSS v4
- SQLite via `better-sqlite3`
- `lucide-react` icons
