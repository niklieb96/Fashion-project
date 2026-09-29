"use client";

import { useEffect, useState, useCallback } from "react";
import { FashionItem } from "@/lib/types";
import { CATEGORIES } from "@/lib/constants";
import Link from "next/link";
import {
  ArrowLeft,
  Plus,
  Trash2,
  Edit2,
  X,
  Check,
  Loader2,
  Star,
  ExternalLink,
} from "lucide-react";

const EMPTY_FORM = {
  name: "",
  brand: "",
  price: "",
  image_url: "",
  link: "",
  category: "Other",
  tags: "",
  description: "",
  featured: false,
};

type FormData = typeof EMPTY_FORM;

export default function AdminPage() {
  const [items, setItems] = useState<FashionItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState<FormData>(EMPTY_FORM);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [deleteConfirm, setDeleteConfirm] = useState<number | null>(null);

  const fetchItems = useCallback(async () => {
    const res = await fetch("/api/items");
    const data = await res.json();
    setItems(data.items || []);
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchItems();
  }, [fetchItems]);

  const openAdd = () => {
    setForm(EMPTY_FORM);
    setEditingId(null);
    setError("");
    setShowForm(true);
  };

  const openEdit = (item: FashionItem) => {
    setForm({
      name: item.name,
      brand: item.brand,
      price: item.price?.toString() || "",
      image_url: item.image_url || "",
      link: item.link,
      category: item.category,
      tags: item.tags,
      description: item.description,
      featured: item.featured,
    });
    setEditingId(item.id);
    setError("");
    setShowForm(true);
  };

  const closeForm = () => {
    setShowForm(false);
    setEditingId(null);
    setError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError("");

    const url = editingId ? `/api/items/${editingId}` : "/api/items";
    const method = editingId ? "PUT" : "POST";

    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    const data = await res.json();

    if (!res.ok) {
      setError(data.error || "Something went wrong");
      setSaving(false);
      return;
    }

    await fetchItems();
    closeForm();
    setSaving(false);
  };

  const handleDelete = async (id: number) => {
    const res = await fetch(`/api/items/${id}`, { method: "DELETE" });
    if (res.ok) {
      setItems((prev) => prev.filter((item) => item.id !== id));
    }
    setDeleteConfirm(null);
  };

  const field = (
    label: string,
    key: keyof FormData,
    type = "text",
    required = false,
    placeholder = ""
  ) => (
    <div>
      <label className="block text-xs uppercase tracking-widest text-stone-500 mb-1.5">
        {label} {required && <span className="text-red-400">*</span>}
      </label>
      <input
        type={type}
        value={form[key] as string}
        onChange={(e) => setForm((f) => ({ ...f, [key]: e.target.value }))}
        required={required}
        placeholder={placeholder}
        className="w-full border border-stone-200 px-3 py-2 text-sm text-stone-800 outline-none focus:border-stone-500 bg-white"
      />
    </div>
  );

  return (
    <div className="min-h-screen bg-stone-50">
      {/* Header */}
      <header className="border-b border-stone-200 bg-white sticky top-0 z-10">
        <div className="max-w-screen-lg mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="flex items-center gap-1.5 text-xs text-stone-400 hover:text-stone-700 transition-colors uppercase tracking-widest"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              Back
            </Link>
            <span className="text-stone-200">|</span>
            <h1 className="text-sm font-light tracking-[0.15em] uppercase text-stone-900">
              Admin Panel
            </h1>
          </div>
          <button
            onClick={openAdd}
            className="flex items-center gap-1.5 bg-stone-900 text-white text-xs uppercase tracking-widest px-4 py-2 hover:bg-stone-700 transition-colors"
          >
            <Plus className="w-3.5 h-3.5" />
            Add Item
          </button>
        </div>
      </header>

      <main className="max-w-screen-lg mx-auto px-6 py-10">
        {/* Add/Edit Form Modal */}
        {showForm && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
            <div className="bg-white w-full max-w-lg max-h-[90vh] overflow-y-auto shadow-xl">
              <div className="flex items-center justify-between px-6 py-4 border-b border-stone-100">
                <h2 className="text-sm uppercase tracking-widest text-stone-700">
                  {editingId ? "Edit Item" : "Add Item"}
                </h2>
                <button
                  onClick={closeForm}
                  className="text-stone-400 hover:text-stone-700"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="p-6 space-y-4">
                {field("Link / URL", "link", "url", true, "https://...")}
                {field("Name", "name", "text", true, "Product name")}
                {field("Brand", "brand", "text", true, "Brand name")}

                <div className="grid grid-cols-2 gap-4">
                  {field("Price", "price", "number", false, "0.00")}
                  <div>
                    <label className="block text-xs uppercase tracking-widest text-stone-500 mb-1.5">
                      Category
                    </label>
                    <select
                      value={form.category}
                      onChange={(e) =>
                        setForm((f) => ({ ...f, category: e.target.value }))
                      }
                      className="w-full border border-stone-200 px-3 py-2 text-sm text-stone-800 outline-none focus:border-stone-500 bg-white"
                    >
                      {CATEGORIES.filter((c) => c !== "All").map((c) => (
                        <option key={c} value={c}>
                          {c}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {field("Image URL", "image_url", "url", false, "https://...")}
                {field("Tags", "tags", "text", false, "minimalist, wool, navy (comma-separated)")}

                <div>
                  <label className="block text-xs uppercase tracking-widest text-stone-500 mb-1.5">
                    Description
                  </label>
                  <textarea
                    value={form.description}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, description: e.target.value }))
                    }
                    rows={3}
                    placeholder="Optional description"
                    className="w-full border border-stone-200 px-3 py-2 text-sm text-stone-800 outline-none focus:border-stone-500 bg-white resize-none"
                  />
                </div>

                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="featured"
                    checked={form.featured as boolean}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, featured: e.target.checked }))
                    }
                    className="w-4 h-4 accent-stone-900"
                  />
                  <label
                    htmlFor="featured"
                    className="text-xs uppercase tracking-widest text-stone-500"
                  >
                    Featured item
                  </label>
                </div>

                {error && (
                  <p className="text-xs text-red-500 border border-red-200 bg-red-50 px-3 py-2">
                    {error}
                  </p>
                )}

                <div className="flex justify-end gap-3 pt-2">
                  <button
                    type="button"
                    onClick={closeForm}
                    className="text-xs uppercase tracking-widest text-stone-400 hover:text-stone-700 transition-colors px-4 py-2 border border-stone-200"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={saving}
                    className="flex items-center gap-1.5 bg-stone-900 text-white text-xs uppercase tracking-widest px-6 py-2 hover:bg-stone-700 transition-colors disabled:opacity-50"
                  >
                    {saving ? (
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    ) : (
                      <Check className="w-3.5 h-3.5" />
                    )}
                    {editingId ? "Save Changes" : "Add Item"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Items Table */}
        <div className="mb-4 flex items-center justify-between">
          <p className="text-xs text-stone-400 uppercase tracking-widest">
            {items.length} item{items.length !== 1 ? "s" : ""} in database
          </p>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-24">
            <Loader2 className="w-6 h-6 text-stone-300 animate-spin" />
          </div>
        ) : items.length === 0 ? (
          <div className="text-center py-24 border border-dashed border-stone-200">
            <p className="text-stone-400 text-sm mb-4">No items yet</p>
            <button
              onClick={openAdd}
              className="text-xs uppercase tracking-widest text-stone-500 hover:text-stone-900 transition-colors"
            >
              Add your first item →
            </button>
          </div>
        ) : (
          <div className="space-y-2">
            {items.map((item) => (
              <div
                key={item.id}
                className="bg-white border border-stone-200 px-4 py-3 flex items-center gap-4"
              >
                {/* Image thumbnail */}
                <div className="w-10 h-12 bg-stone-100 flex-shrink-0 overflow-hidden">
                  {item.image_url ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={item.image_url}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full" />
                  )}
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="text-xs text-stone-400 uppercase tracking-widest">
                      {item.brand}
                    </p>
                    {item.featured ? (
                      <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                    ) : null}
                    <span className="text-xs bg-stone-100 text-stone-500 px-1.5 py-0.5">
                      {item.category}
                    </span>
                  </div>
                  <p className="text-sm text-stone-800 truncate">{item.name}</p>
                  {item.price ? (
                    <p className="text-xs text-stone-500">
                      ${item.price.toLocaleString()}
                    </p>
                  ) : null}
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 flex-shrink-0">
                  <a
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-stone-300 hover:text-stone-600 transition-colors"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                  <button
                    onClick={() => openEdit(item)}
                    className="text-stone-300 hover:text-stone-600 transition-colors"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>
                  {deleteConfirm === item.id ? (
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => handleDelete(item.id)}
                        className="text-xs text-red-500 hover:text-red-700 uppercase tracking-widest"
                      >
                        Delete?
                      </button>
                      <button
                        onClick={() => setDeleteConfirm(null)}
                        className="text-stone-300 hover:text-stone-600"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => setDeleteConfirm(item.id)}
                      className="text-stone-300 hover:text-red-400 transition-colors"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
