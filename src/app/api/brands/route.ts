import { NextRequest, NextResponse } from "next/server";
import { getAllBrands, createBrand } from "@/lib/db";

export async function GET() {
  try {
    const brands = await getAllBrands();
    return NextResponse.json({ brands });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to fetch brands" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, description, image_url } = body;

    if (!name) {
      return NextResponse.json({ error: "name is required" }, { status: 400 });
    }

    const brand = await createBrand({
      name,
      description: description || "",
      image_url: image_url || null,
    });

    return NextResponse.json({ brand }, { status: 201 });
  } catch (error: any) {
    if (error?.message?.includes("unique") || error?.code === "23505") {
      return NextResponse.json({ error: "A brand with this name already exists" }, { status: 409 });
    }
    console.error(error);
    return NextResponse.json({ error: "Failed to create brand" }, { status: 500 });
  }
}
