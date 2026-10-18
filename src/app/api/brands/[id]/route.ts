import { NextRequest, NextResponse } from "next/server";
import { getBrandById, updateBrand, deleteBrand } from "@/lib/db";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const brand = await getBrandById(parseInt(id));
  if (!brand) {
    return NextResponse.json({ error: "Brand not found" }, { status: 404 });
  }
  return NextResponse.json({ brand });
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  try {
    const body = await request.json();
    const updated = await updateBrand(parseInt(id), {
      name: body.name,
      description: body.description || "",
      image_url: body.image_url || null,
    });
    if (!updated) {
      return NextResponse.json({ error: "Brand not found" }, { status: 404 });
    }
    return NextResponse.json({ brand: updated });
  } catch (error: any) {
    if (error?.message?.includes("unique") || error?.code === "23505") {
      return NextResponse.json({ error: "A brand with this name already exists" }, { status: 409 });
    }
    console.error(error);
    return NextResponse.json({ error: "Failed to update brand" }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const deleted = await deleteBrand(parseInt(id));
  if (!deleted) {
    return NextResponse.json({ error: "Brand not found" }, { status: 404 });
  }
  return NextResponse.json({ success: true });
}
