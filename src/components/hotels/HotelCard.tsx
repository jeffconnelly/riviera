import Link from "next/link";
import { Star, MapPin } from "lucide-react";
import { cn } from "@/lib/utils";
import { getMinPrice, formatReviewCount } from "@/lib/hotel-utils";
import type { Hotel } from "@/lib/types";

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

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={cn(
            "size-3.5",
            i < rating
              ? "fill-amber-400 text-amber-400"
              : "fill-transparent text-slate-300"
          )}
        />
      ))}
    </div>
  );
}

interface HotelCardProps {
  hotel: Hotel;
}

export function HotelCard({ hotel }: HotelCardProps) {
  const gradient =
    CITY_GRADIENTS[hotel.address.city] ?? "from-teal-700 to-emerald-600";
  const minPrice = getMinPrice(hotel);

  return (
    <Link href={`/hotels/${hotel.id}`} className="group block">
      <article className="overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-lg">
        {/* Gradient header band */}
        <div className={cn("h-36 bg-gradient-to-br", gradient)}>
          <div className="flex h-full items-end p-4">
            <span className="rounded-full bg-white/20 px-2.5 py-1 text-xs font-medium text-white backdrop-blur-sm">
              {hotel.address.city}
            </span>
          </div>
        </div>

        {/* Card body */}
        <div className="p-5">
          <div className="mb-1 flex items-start justify-between gap-2">
            <h3 className="line-clamp-2 text-base font-semibold leading-tight text-slate-900">
              {hotel.name}
            </h3>
            <div className="flex shrink-0 items-center gap-1 rounded-lg bg-teal-50 px-2 py-1">
              <Star className="size-3 fill-teal-600 text-teal-600" />
              <span className="text-xs font-semibold text-teal-700">
                {hotel.overall_rating.toFixed(1)}
              </span>
            </div>
          </div>

          <StarRating rating={hotel.star_rating} />

          <div className="mt-2 flex items-center gap-1 text-xs text-slate-500">
            <MapPin className="size-3" />
            <span>
              {hotel.address.city}, {hotel.address.country}
            </span>
            <span className="mx-1">·</span>
            <span>{formatReviewCount(hotel.review_count)} reviews</span>
          </div>

          <div className="mt-4 flex items-baseline gap-1">
            <span className="text-xs text-slate-400">from</span>
            <span className="text-xl font-bold text-slate-900">
              ${minPrice}
            </span>
            <span className="text-xs text-slate-400">/night</span>
          </div>
        </div>
      </article>
    </Link>
  );
}
