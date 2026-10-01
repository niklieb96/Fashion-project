import ShowcaseGrid from "@/components/ShowcaseGrid";
import Link from "next/link";
import { Settings } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-stone-50">
      <header className="border-b border-stone-200 bg-white sticky top-0 z-10">
        <div className="max-w-screen-xl mx-auto px-6 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-lg font-light tracking-[0.2em] uppercase text-stone-900">Fashion Archive</h1>
            <p className="text-xs text-stone-400 tracking-widest mt-0.5">A curated selection</p>
          </div>
          <Link href="/admin" className="flex items-center gap-1.5 text-xs text-stone-400 hover:text-stone-700 transition-colors uppercase tracking-widest">
            <Settings className="w-3.5 h-3.5" />
            Admin
          </Link>
        </div>
      </header>
      <main className="max-w-screen-xl mx-auto px-6 py-10">
        <ShowcaseGrid />
      </main>
      <footer className="border-t border-stone-200 mt-16">
        <div className="max-w-screen-xl mx-auto px-6 py-6">
          <p className="text-xs text-stone-300 text-center tracking-widest uppercase">Fashion Archive — A curated collection</p>
        </div>
      </footer>
    </div>
  );
}
