import { Suspense } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { HotelFilters } from "@/components/hotels/HotelFilters";
import { HotelDashboard } from "./HotelDashboard";
import hotelsData from "@/data/hotels.json";
import { getCities } from "@/lib/hotel-utils";
import type { Hotel } from "@/lib/types";

const hotels = hotelsData as Hotel[];
const cities = getCities(hotels);

export default function Home() {
  return (
    <>
      <Navbar />
      <Suspense>
        <HotelFilters cities={cities} />
        <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
          <div className="mb-2">
            <h1 className="text-2xl font-bold text-slate-900">
              Discover your next stay
            </h1>
            <p className="mt-1 text-sm text-slate-500">
              40 properties across 10 global cities
            </p>
          </div>
          <div className="mt-8">
            <Suspense>
              <HotelDashboard hotels={hotels} />
            </Suspense>
          </div>
        </main>
      </Suspense>
    </>
  );
}
