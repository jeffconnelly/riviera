"use client";

import { useState } from "react";
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

export function RoomAvailabilityChecker({
  hotel,
}: RoomAvailabilityCheckerProps) {
  const [range, setRange] = useState<DateRange | undefined>();
  const [open, setOpen] = useState(false);

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const checkIn = range?.from;
  const checkOut = range?.to;

  const nights =
    checkIn && checkOut
      ? differenceInCalendarDays(checkOut, checkIn)
      : undefined;

  const availableRooms =
    checkIn && checkOut
      ? getAvailableRooms(hotel, checkIn, checkOut)
      : hotel.rooms;

  const isFiltered = Boolean(checkIn && checkOut);

  function clearDates() {
    setRange(undefined);
  }

  const hasNoAvailability = hotel.rooms.every(
    (r) => r.available_dates.length === 0
  );

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
              onSelect={(r) => {
                setRange(r);
                if (r?.from && r?.to) setOpen(false);
              }}
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

        {nights && nights > 0 && (
          <span className="text-sm text-slate-500">
            {nights} night{nights !== 1 ? "s" : ""}
          </span>
        )}
      </div>

      <Separator className="mb-6" />

      {/* Contact hotel if all rooms have no available_dates */}
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
            No rooms available for{" "}
            {checkIn && format(checkIn, "MMM d")} –{" "}
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
              Select dates above to check availability. Showing all{" "}
              {hotel.rooms.length} room{hotel.rooms.length !== 1 ? "s" : ""}.
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
