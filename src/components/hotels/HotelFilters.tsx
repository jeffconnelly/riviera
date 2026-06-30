"use client";

import { Star, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
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
    <div className="sticky top-16 z-40 border-b border-slate-100 bg-white/95 backdrop-blur-sm">
      <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6">
        <div className="flex flex-wrap items-center gap-3">
          {/* City filter */}
          <Select
            value={city || "all"}
            onValueChange={(v) => setFilters({ city: !v || v === "all" ? "" : v })}
          >
            <SelectTrigger className="h-9 w-44 text-sm">
              <SelectValue placeholder="All Cities" />
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

          {/* Star rating toggles */}
          <div className="flex items-center gap-1.5">
            {[2, 3, 4, 5].map((s) => (
              <button
                key={s}
                onClick={() => toggleStar(s)}
                className={cn(
                  "flex h-9 items-center gap-1 rounded-md border px-3 text-sm transition-colors",
                  stars.includes(s)
                    ? "border-teal-600 bg-teal-600 text-white"
                    : "border-slate-200 bg-white text-slate-600 hover:border-teal-300 hover:text-teal-700"
                )}
              >
                <Star className="size-3.5 fill-current" />
                {s}
              </button>
            ))}
          </div>

          {/* Price slider */}
          <div className="flex items-center gap-2">
            <span className="whitespace-nowrap text-sm text-slate-500">
              Max price
            </span>
            <input
              type="range"
              min={75}
              max={MAX_PRICE}
              step={25}
              value={maxPrice}
              onChange={(e) =>
                setFilters({ maxPrice: Number(e.target.value) })
              }
              className="h-1.5 w-28 cursor-pointer accent-teal-600"
            />
            <span className="w-14 text-right text-sm font-medium text-slate-700">
              ${maxPrice === MAX_PRICE ? "Any" : maxPrice}
            </span>
          </div>

          {/* Reset */}
          {hasActiveFilters && (
            <Button
              variant="ghost"
              size="sm"
              onClick={resetFilters}
              className="h-9 gap-1.5 text-slate-500 hover:text-slate-900"
            >
              <X className="size-3.5" />
              Clear
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
