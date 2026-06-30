import { BedDouble, Users, Maximize, CheckCircle2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import type { Room } from "@/lib/types";

function formatRoomAmenity(key: string): string {
  return key
    .replace(/_/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

interface RoomCardProps {
  room: Room;
  isAvailable?: boolean;
  nights?: number;
}

export function RoomCard({ room, isAvailable = true, nights }: RoomCardProps) {
  const totalPrice = nights ? room.price_per_night * nights : undefined;

  return (
    <div className="rounded-xl border border-slate-100 bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          <h4 className="font-semibold text-slate-900">{room.type}</h4>
          <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-slate-500">
            <span className="flex items-center gap-1.5">
              <BedDouble className="size-4" />
              {room.bed_count} {room.bed_type} {room.bed_count > 1 ? "Beds" : "Bed"}
            </span>
            <span className="flex items-center gap-1.5">
              <Users className="size-4" />
              Up to {room.max_occupancy} guests
            </span>
            <span className="flex items-center gap-1.5">
              <Maximize className="size-4" />
              {room.square_footage} sq ft
            </span>
          </div>
        </div>

        <div className="shrink-0 text-right">
          <div className="text-2xl font-bold text-slate-900">
            ${room.price_per_night}
          </div>
          <div className="text-xs text-slate-400">per night</div>
          {totalPrice && (
            <div className="mt-1 text-sm font-medium text-teal-700">
              ${totalPrice.toLocaleString()} total
            </div>
          )}
        </div>
      </div>

      {room.room_amenities.length > 0 && (
        <>
          <Separator className="my-4" />
          <div className="flex flex-wrap gap-2">
            {room.room_amenities.map((a) => (
              <Badge
                key={a}
                variant="secondary"
                className="bg-slate-50 text-slate-600"
              >
                {formatRoomAmenity(a)}
              </Badge>
            ))}
          </div>
        </>
      )}

      {isAvailable && (
        <div className="mt-3 flex items-center gap-1.5 text-xs font-medium text-teal-600">
          <CheckCircle2 className="size-3.5" />
          Available for selected dates
        </div>
      )}
    </div>
  );
}
