"use client";

import { Star, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { MAX_PRICE } from "@/lib/hotel-utils";
import { useFilters } from "@/hooks/useFilters";

interface HotelFiltersProps {
  cities: string[];
}

export function HotelFilters({ cities }: HotelFiltersProps) {
  const { city, stars, maxPrice, setFilters, resetFilters, hasActiveFilters } =
    useFilters();

  function toggleStar(star: number) {
    const next = stars.includes(star)
      ? stars.filter((s) => s !== star)
      : [...stars, star].sort();
    setFilters({ stars: next });
  }

  return (
    <div className="sticky top-14.5 z-40 border-b border-slate-100 bg-white/95 backdrop-blur-sm">
      <div className="mx-auto max-w-7xl px-4 py-3 sm:px-6">
        <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
          {/* City filter */}
          <div className="flex flex-col gap-1">
            <span className="text-[10px] font-semibold uppercase tracking-widest text-slate-400">
              City
            </span>
            <Select
              value={city || "all"}
              onValueChange={(v) => setFilters({ city: !v || v === "all" ? "" : v })}
            >
              <SelectTrigger className="h-8 w-40 text-sm">
                <span className={cn("flex-1 text-left text-sm", !city && "text-muted-foreground")}>
                  {city || "All Cities"}
                </span>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Cities</SelectItem>
                {cities.map((c) => (
                  <SelectItem key={c} value={c}>
                    {c}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="hidden h-8 w-px self-end bg-slate-100 sm:block" />

          {/* Star rating toggles */}
          <div className="flex flex-col gap-1">
            <span className="text-[10px] font-semibold uppercase tracking-widest text-slate-400">
              Stars
            </span>
            <div className="flex items-center gap-1">
              {[2, 3, 4, 5].map((s) => (
                <button
                  key={s}
                  onClick={() => toggleStar(s)}
                  aria-label={`${s} stars`}
                  aria-pressed={stars.includes(s)}
                  className={cn(
                    "flex h-8 cursor-pointer items-center gap-1 rounded-md border px-2.5 text-sm font-medium transition-colors",
                    stars.includes(s)
                      ? "border-teal-600 bg-teal-600 text-white"
                      : "border-slate-200 bg-white text-slate-500 hover:border-teal-300 hover:text-teal-700"
                  )}
                >
                  <Star className="size-3 fill-current" />
                  {s}
                </button>
              ))}
            </div>
          </div>

          <div className="hidden h-8 w-px self-end bg-slate-100 sm:block" />

          {/* Price slider */}
          <div className="flex flex-col gap-1">
            <span className="text-[10px] font-semibold uppercase tracking-widest text-slate-400">
              Max price
            </span>
            <div className="flex items-center gap-2.5">
              <input
                type="range"
                min={75}
                max={MAX_PRICE}
                step={25}
                value={maxPrice}
                onChange={(e) => setFilters({ maxPrice: Number(e.target.value) })}
                className="h-1.5 w-28 cursor-pointer accent-teal-600"
              />
              <span className="w-16 text-sm font-semibold text-slate-700">
                {maxPrice === MAX_PRICE ? "Any" : `$${maxPrice}`}
              </span>
            </div>
          </div>

          {/* Reset */}
          {hasActiveFilters && (
            <>
              <div className="hidden h-8 w-px self-end bg-slate-100 sm:block" />
              <div className="flex flex-col gap-1">
                <span className="text-[10px] opacity-0">·</span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={resetFilters}
                  className="h-8 gap-1.5 text-xs text-slate-400 hover:text-slate-700"
                >
                  <X className="size-3" />
                  Clear all
                </Button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
