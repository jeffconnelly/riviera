import { Suspense } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { HotelFilters } from "@/components/hotels/HotelFilters";
import { HotelDashboard } from "./HotelDashboard";
import hotelsData from "@/data/hotels.json";
import { getCities } from "@/lib/hotel-utils";
import type { Hotel } from "@/lib/types";

const hotels = hotelsData as Hotel[];
const cities = getCities(hotels);

const Home = () => {
  return (
    <>
      <Navbar />
      <Suspense>
        <HotelFilters cities={cities} />
        <main className="mx-auto max-w-7xl px-4 pt-7 pb-12 sm:px-6">
          <Suspense>
            <HotelDashboard hotels={hotels} />
          </Suspense>
        </main>
      </Suspense>
    </>
  );
};

export default Home;
