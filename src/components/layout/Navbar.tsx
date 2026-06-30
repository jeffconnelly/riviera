import Link from "next/link";

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-100 bg-white/95 backdrop-blur-sm">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-xl font-semibold tracking-tight text-slate-900">
            Riviera
          </span>
          <span className="h-1.5 w-1.5 rounded-full bg-teal-600" />
        </Link>
        <nav className="flex items-center gap-6 text-sm text-slate-500">
          <span>40 properties · 10 cities</span>
        </nav>
      </div>
    </header>
  );
}
