"use client";

import { useState } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { format, differenceInCalendarDays } from "date-fns";
import type { DateRange } from "react-day-picker";
import { CalendarIcon, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { RoomCard } from "./RoomCard";
import { getAvailableRooms } from "@/lib/hotel-utils";
import type { Hotel } from "@/lib/types";

interface RoomAvailabilityCheckerProps {
  hotel: Hotel;
}

// Parse "yyyy-MM-dd" as a local-timezone date to avoid UTC offset shifting
function parseDateParam(s: string | null): Date | undefined {
  if (!s) return undefined;
  const [y, m, d] = s.split("-").map(Number);
  if (!y || !m || !d) return undefined;
  return new Date(y, m - 1, d);
}

export function RoomAvailabilityChecker({ hotel }: RoomAvailabilityCheckerProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [range, setRange] = useState<DateRange | undefined>(() => {
    const from = parseDateParam(searchParams.get("checkIn"));
    const to = parseDateParam(searchParams.get("checkOut"));
    return from && to ? { from, to } : undefined;
  });
  const [open, setOpen] = useState(false);

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const checkIn = range?.from;
  const checkOut = range?.to;

  const nights =
    checkIn && checkOut ? differenceInCalendarDays(checkOut, checkIn) : undefined;

  const availableRooms =
    checkIn && checkOut ? getAvailableRooms(hotel, checkIn, checkOut) : hotel.rooms;

  const isFiltered = Boolean(checkIn && checkOut && nights && nights > 0);

  function syncUrl(r: DateRange | undefined) {
    const params = new URLSearchParams(searchParams.toString());
    if (r?.from && r?.to) {
      params.set("checkIn", format(r.from, "yyyy-MM-dd"));
      params.set("checkOut", format(r.to, "yyyy-MM-dd"));
    } else {
      params.delete("checkIn");
      params.delete("checkOut");
    }
    const qs = params.toString();
    router.replace(`${pathname}${qs ? `?${qs}` : ""}`, { scroll: false });
  }

  function handleSelect(r: DateRange | undefined) {
    setRange(r);
    if (r?.from && r?.to && differenceInCalendarDays(r.to, r.from) > 0) {
      syncUrl(r);
      setOpen(false);
    }
  }

  function clearDates() {
    setRange(undefined);
    syncUrl(undefined);
  }

  const hasNoAvailability = hotel.rooms.every((r) => r.available_dates.length === 0);

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-center gap-3">
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger className="inline-flex h-10 cursor-pointer items-center gap-2 rounded-md border border-slate-200 bg-white px-3 text-sm text-slate-700 shadow-sm transition-colors hover:bg-slate-50">
            <CalendarIcon className="size-4 text-teal-600" />
            {checkIn && checkOut ? (
              <>
                {format(checkIn, "MMM d")} – {format(checkOut, "MMM d, yyyy")}
              </>
            ) : (
              "Select dates"
            )}
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="range"
              selected={range}
              onSelect={handleSelect}
              disabled={{ before: today }}
              numberOfMonths={2}
            />
          </PopoverContent>
        </Popover>

        {isFiltered && (
          <Button
            variant="ghost"
            size="sm"
            onClick={clearDates}
            className="h-10 gap-1.5 text-slate-500"
          >
            <X className="size-3.5" />
            Clear dates
          </Button>
        )}

        {nights !== undefined && nights > 0 && (
          <span className="text-sm text-slate-500">
            {nights} night{nights !== 1 ? "s" : ""}
          </span>
        )}
      </div>

      <Separator className="mb-6" />

      {hasNoAvailability ? (
        <div className="rounded-xl border border-amber-100 bg-amber-50 p-6 text-center">
          <p className="text-sm font-medium text-amber-800">
            Contact hotel for availability
          </p>
          <p className="mt-1 text-xs text-amber-600">
            This property manages availability directly.
          </p>
          <a
            href={`mailto:${hotel.contact.email}`}
            className="mt-3 inline-block text-sm font-medium text-teal-700 underline underline-offset-2"
          >
            {hotel.contact.email}
          </a>
        </div>
      ) : isFiltered && availableRooms.length === 0 ? (
        <div className="rounded-xl border border-slate-100 bg-slate-50 p-6 text-center">
          <p className="text-sm font-medium text-slate-700">
            No rooms available for {checkIn && format(checkIn, "MMM d")} –{" "}
            {checkOut && format(checkOut, "MMM d, yyyy")}
          </p>
          <p className="mt-1 text-xs text-slate-500">
            Try different dates or{" "}
            <button
              onClick={clearDates}
              className="font-medium text-teal-700 underline underline-offset-2"
            >
              view all rooms
            </button>
            .
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {!isFiltered && (
            <p className="text-sm text-slate-500">
              Select dates above to check availability.{" "}
              {hotel.rooms.length === 1
                ? "1 room at this property."
                : `${hotel.rooms.length} rooms at this property.`}
            </p>
          )}
          {availableRooms.map((room) => (
            <RoomCard
              key={room.room_id}
              room={room}
              isAvailable={isFiltered}
              nights={nights}
            />
          ))}
        </div>
      )}
    </div>
  );
}
