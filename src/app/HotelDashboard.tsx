"use client";

import { useFilters } from "@/hooks/useFilters";
import { filterHotels, getCities } from "@/lib/hotel-utils";
import { HotelGrid } from "@/components/hotels/HotelGrid";
import type { Hotel } from "@/lib/types";

interface HotelDashboardProps {
  hotels: Hotel[];
}

export const HotelDashboard = ({ hotels }: HotelDashboardProps) => {
  const { city, stars, maxPrice, hasActiveFilters, resetFilters } = useFilters();
  const filtered = filterHotels(hotels, { city, stars, maxPrice });

  const allCities = getCities(hotels);
  const heading = city ? `Hotels in ${city}` : "Discover your next stay";

  let subtext: string;
  if (city) {
    subtext = `${filtered.length} ${filtered.length === 1 ? "property" : "properties"} found`;
  } else if (hasActiveFilters) {
    subtext = `Showing ${filtered.length} of ${hotels.length} properties`;
  } else {
    const cityList = allCities.slice(0, 3).join(", ");
    const remaining = allCities.length - 3;
    subtext = `${cityList}${remaining > 0 ? ` and ${remaining} more` : ""}`;
  }

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-900">{heading}</h1>
        <p className="mt-1 text-sm text-slate-500">{subtext}</p>
      </div>
      <HotelGrid hotels={filtered} total={hotels.length} onReset={resetFilters} />
    </div>
  );
};
