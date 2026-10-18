import ShowcaseGrid from "@/components/ShowcaseGrid";
import Link from "next/link";
import { Settings } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#0c0c0e]">
      <header className="sticky top-0 z-10 border-b border-white/[0.06] bg-[#0c0c0e]/80 backdrop-blur-2xl">
        <div className="max-w-screen-xl mx-auto px-6 py-5 flex items-center justify-between">
          <div>
            <h1 className="text-sm font-light tracking-[0.3em] uppercase text-white/85">
              Fashion Archive
            </h1>
            <p className="text-[10px] text-white/25 tracking-[0.2em] mt-0.5 uppercase">
              Curated selection
            </p>
          </div>
          <Link
            href="/admin"
            className="flex items-center gap-2 text-[10px] text-white/25 hover:text-white/55 transition-colors uppercase tracking-[0.2em]"
          >
            <Settings className="w-3 h-3" />
            Manage
          </Link>
        </div>
      </header>

      <main className="max-w-screen-xl mx-auto px-6 py-10">
        <ShowcaseGrid />
      </main>

      <footer className="border-t border-white/[0.05] mt-20">
        <div className="max-w-screen-xl mx-auto px-6 py-6">
          <p className="text-[10px] text-white/15 text-center tracking-[0.25em] uppercase">
            Fashion Archive
          </p>
        </div>
      </footer>
    </div>
  );
}
