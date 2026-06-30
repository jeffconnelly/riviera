import Link from "next/link";

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-100 bg-white/95 backdrop-blur-sm">
      <div className="h-0.5 w-full bg-linear-to-r from-teal-600 via-emerald-500 to-teal-600" />
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4 sm:px-6">
        <Link href="/" className="text-xl font-bold tracking-tight text-slate-900">
          Riviera
        </Link>
        <nav className="flex items-center text-sm text-slate-400">
          <span>40 properties · 10 cities</span>
        </nav>
      </div>
    </header>
  );
}
