import { eachDayOfInterval, format, parseISO } from "date-fns";
import type { Hotel, HotelFilters, Room } from "./types";

export const MAX_PRICE = 600;

export function filterHotels(hotels: Hotel[], filters: HotelFilters): Hotel[] {
  return hotels.filter((hotel) => {
    if (filters.city && hotel.address.city !== filters.city) return false;
    if (filters.stars.length > 0 && !filters.stars.includes(hotel.star_rating))
      return false;
    if (getMinPrice(hotel) > filters.maxPrice) return false;
    return true;
  });
}

export function getAvailableRooms(
  hotel: Hotel,
  checkIn: Date,
  checkOut: Date
): Room[] {
  const nights = getDateRange(checkIn, checkOut);
  if (nights.length === 0) return hotel.rooms;

  return hotel.rooms.filter((room) => {
    if (room.available_dates.length === 0) return false;
    const available = new Set(room.available_dates);
    return nights.every((date) => available.has(date));
  });
}

export function getDateRange(checkIn: Date, checkOut: Date): string[] {
  if (checkOut <= checkIn) return [];
  const days = eachDayOfInterval({
    start: checkIn,
    end: new Date(checkOut.getTime() - 86_400_000),
  });
  return days.map((d) => format(d, "yyyy-MM-dd"));
}

export function getMinPrice(hotel: Hotel): number {
  if (hotel.rooms.length === 0) return 0;
  return Math.min(...hotel.rooms.map((r) => r.price_per_night));
}

export function getCities(hotels: Hotel[]): string[] {
  return [...new Set(hotels.map((h) => h.address.city))].sort();
}

export function formatReviewCount(count: number): string {
  if (count >= 1000) return `${(count / 1000).toFixed(1)}k`;
  return String(count);
}
