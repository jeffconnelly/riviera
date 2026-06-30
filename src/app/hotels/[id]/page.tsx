import { notFound } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  Star,
  MapPin,
  Phone,
  Mail,
  Clock,
  ShieldCheck,
} from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Navbar } from "@/components/layout/Navbar";
import { HotelAmenities } from "@/components/hotels/HotelAmenities";
import { RoomAvailabilityChecker } from "@/components/hotels/RoomAvailabilityChecker";
import hotelsData from "@/data/hotels.json";
import type { Hotel } from "@/lib/types";
import { cn } from "@/lib/utils";

const hotels = hotelsData as Hotel[];

const CITY_GRADIENTS: Record<string, string> = {
  Chicago: "from-teal-700 to-emerald-600",
  Austin: "from-teal-800 to-teal-600",
  Miami: "from-emerald-500 to-teal-600",
  "New York": "from-slate-700 to-teal-700",
  Seattle: "from-teal-600 to-cyan-600",
  London: "from-emerald-700 to-teal-800",
  Paris: "from-teal-600 to-emerald-700",
  Tokyo: "from-cyan-700 to-teal-600",
  Sydney: "from-emerald-500 to-cyan-600",
  Rome: "from-teal-800 to-emerald-500",
};

export async function generateStaticParams() {
  return hotels.map((h) => ({ id: h.id }));
}

export default async function HotelPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const hotel = hotels.find((h) => h.id === id);
  if (!hotel) notFound();

  const gradient =
    CITY_GRADIENTS[hotel.address.city] ?? "from-teal-700 to-emerald-600";

  return (
    <>
      <Navbar />
      <div className={cn("h-64 bg-gradient-to-br", gradient)}>
        <div className="mx-auto flex h-full max-w-7xl flex-col justify-between px-4 py-6 sm:px-6">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-medium text-white/80 transition-colors hover:text-white"
          >
            <ArrowLeft className="size-4" />
            Back to hotels
          </Link>
          <div>
            <p className="mb-1 text-sm font-medium text-white/70">
              {hotel.address.city}, {hotel.address.country}
            </p>
            <h1 className="text-3xl font-bold text-white">{hotel.name}</h1>
          </div>
        </div>
      </div>

      <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-3">
          {/* Left column — hotel info */}
          <div className="lg:col-span-2">
            {/* Rating + stars */}
            <div className="mb-6 flex flex-wrap items-center gap-4">
              <div className="flex items-center gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={cn(
                      "size-5",
                      i < hotel.star_rating
                        ? "fill-amber-400 text-amber-400"
                        : "fill-transparent text-slate-200"
                    )}
                  />
                ))}
              </div>
              <div className="flex items-center gap-2">
                <span className="flex items-center gap-1 rounded-lg bg-teal-50 px-3 py-1 text-sm font-semibold text-teal-700">
                  <Star className="size-3.5 fill-teal-600 text-teal-600" />
                  {hotel.overall_rating.toFixed(1)}
                </span>
                <span className="text-sm text-slate-500">
                  {hotel.review_count.toLocaleString()} reviews
                </span>
              </div>
            </div>

            {/* Description */}
            <p className="text-slate-600 leading-relaxed">{hotel.description}</p>

            <Separator className="my-8" />

            {/* Amenities */}
            <section>
              <h2 className="mb-4 text-lg font-semibold text-slate-900">
                Amenities
              </h2>
              <HotelAmenities amenities={hotel.amenities} />
            </section>

            <Separator className="my-8" />

            {/* Room availability */}
            <section>
              <h2 className="mb-6 text-lg font-semibold text-slate-900">
                Check Availability
              </h2>
              <RoomAvailabilityChecker hotel={hotel} />
            </section>
          </div>

          {/* Right column — property details */}
          <div className="space-y-6">
            {/* Address */}
            <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
              <h3 className="mb-4 font-semibold text-slate-900">
                Property Details
              </h3>
              <div className="space-y-3 text-sm text-slate-600">
                <div className="flex items-start gap-2.5">
                  <MapPin className="mt-0.5 size-4 shrink-0 text-teal-600" />
                  <div>
                    <p>{hotel.address.street}</p>
                    <p>
                      {hotel.address.city}, {hotel.address.state}{" "}
                      {hotel.address.zip_code}
                    </p>
                    <p>{hotel.address.country}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2.5">
                  <Phone className="size-4 shrink-0 text-teal-600" />
                  <a href={`tel:${hotel.contact.phone}`} className="hover:text-teal-700">
                    {hotel.contact.phone}
                  </a>
                </div>
                <div className="flex items-center gap-2.5">
                  <Mail className="size-4 shrink-0 text-teal-600" />
                  <a
                    href={`mailto:${hotel.contact.email}`}
                    className="hover:text-teal-700"
                  >
                    {hotel.contact.email}
                  </a>
                </div>
              </div>
            </div>

            {/* Policies */}
            <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
              <h3 className="mb-4 font-semibold text-slate-900">Policies</h3>
              <div className="space-y-3 text-sm text-slate-600">
                <div className="flex items-center gap-2.5">
                  <Clock className="size-4 shrink-0 text-teal-600" />
                  <div>
                    <p>
                      Check-in:{" "}
                      <span className="font-medium text-slate-900">
                        {hotel.policies.check_in_time}
                      </span>
                    </p>
                    <p>
                      Check-out:{" "}
                      <span className="font-medium text-slate-900">
                        {hotel.policies.check_out_time}
                      </span>
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-2.5">
                  <ShieldCheck className="mt-0.5 size-4 shrink-0 text-teal-600" />
                  <p>{hotel.policies.cancellation}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
