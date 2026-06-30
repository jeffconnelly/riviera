"use client";

import { useFilters } from "@/hooks/useFilters";
import { filterHotels } from "@/lib/hotel-utils";
import { HotelGrid } from "@/components/hotels/HotelGrid";
import type { Hotel } from "@/lib/types";

interface HotelDashboardProps {
  hotels: Hotel[];
}

export function HotelDashboard({ hotels }: HotelDashboardProps) {
  const { city, stars, maxPrice, resetFilters } = useFilters();
  const filtered = filterHotels(hotels, { city, stars, maxPrice });

  return (
    <HotelGrid hotels={filtered} total={hotels.length} onReset={resetFilters} />
  );
}
