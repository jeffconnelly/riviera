import Link from "next/link";
import { Star, MapPin } from "lucide-react";
import { cn } from "@/lib/utils";
import { getMinPrice, formatReviewCount, CITY_GRADIENTS } from "@/lib/hotel-utils";
import type { Hotel } from "@/lib/types";

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
      <article className="overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm transition-all duration-300 group-hover:-translate-y-1.5 group-hover:border-slate-200 group-hover:shadow-xl">
        {/* Gradient header band */}
        <div className={cn("relative h-36 bg-linear-to-br", gradient)}>
          {/* Radial highlight — ambient light from top-right for depth */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(255,255,255,0.18),transparent_65%)]" />
          <div className="relative p-4">
            <span className="rounded-full bg-black/20 px-2.5 py-1 text-xs font-medium tracking-wide text-white/90 backdrop-blur-sm">
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
            <span className="text-xl font-bold text-teal-700">
              ${minPrice}
            </span>
            <span className="text-xs text-slate-400">/night</span>
          </div>
        </div>
      </article>
    </Link>
  );
}
