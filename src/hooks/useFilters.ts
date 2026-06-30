"use client";

import { useCallback } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { MAX_PRICE } from "@/lib/hotel-utils";

export interface Filters {
  city: string;
  stars: number[];
  maxPrice: number;
}

export const useFilters = (): Filters & {
  setFilters: (updates: Partial<Filters>) => void;
  resetFilters: () => void;
  hasActiveFilters: boolean;
} => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const city = searchParams.get("city") ?? "";
  const starsParam = searchParams.get("stars");
  const stars = starsParam
    ? starsParam.split(",").map(Number).filter(Boolean)
    : [];
  const maxPrice = Number(searchParams.get("maxPrice")) || MAX_PRICE;

  const hasActiveFilters =
    city !== "" || stars.length > 0 || maxPrice < MAX_PRICE;

  const setFilters = useCallback(
    (updates: Partial<Filters>) => {
      const params = new URLSearchParams(searchParams.toString());

      if (updates.city !== undefined) {
        if (updates.city) params.set("city", updates.city);
        else params.delete("city");
      }
      if (updates.stars !== undefined) {
        if (updates.stars.length) params.set("stars", updates.stars.join(","));
        else params.delete("stars");
      }
      if (updates.maxPrice !== undefined) {
        if (updates.maxPrice < MAX_PRICE)
          params.set("maxPrice", String(updates.maxPrice));
        else params.delete("maxPrice");
      }

      router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    },
    [searchParams, router, pathname]
  );

  const resetFilters = useCallback(() => {
    router.replace(pathname, { scroll: false });
  }, [router, pathname]);

  return { city, stars, maxPrice, setFilters, resetFilters, hasActiveFilters };
};
