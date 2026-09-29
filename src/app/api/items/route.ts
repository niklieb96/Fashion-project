import { NextRequest, NextResponse } from "next/server";
import { getAllItems, createItem, searchItems } from "@/lib/db";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get("category") || "All";
  const query = searchParams.get("q") || "";

  try {
    const items = query ? searchItems(query) : getAllItems(category);
    return NextResponse.json({ items });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch items" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, brand, price, image_url, link, category, tags, description, featured } = body;

    if (!name || !brand || !link) {
      return NextResponse.json(
        { error: "name, brand, and link are required" },
        { status: 400 }
      );
    }

    const item = createItem({
      name,
      brand,
      price: price ? parseFloat(price) : null,
      image_url: image_url || null,
      link,
      category: category || "Other",
      tags: tags || "",
      description: description || "",
      featured: featured || false,
    });

    return NextResponse.json({ item }, { status: 201 });
  } catch (error: any) {
    if (error?.message?.includes("UNIQUE constraint failed")) {
      return NextResponse.json({ error: "An item with this link already exists" }, { status: 409 });
    }
    return NextResponse.json({ error: "Failed to create item" }, { status: 500 });
  }
}
