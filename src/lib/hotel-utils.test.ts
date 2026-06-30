import { describe, it, expect } from "vitest";
import {
  filterHotels,
  getAvailableRooms,
  getDateRange,
  getMinPrice,
  getCities,
} from "./hotel-utils";
import type { Hotel } from "./types";

const MOCK_ROOM_A = {
  room_id: "room-01a",
  type: "Deluxe King",
  bed_type: "King",
  bed_count: 1,
  max_occupancy: 2,
  square_footage: 400,
  price_per_night: 200,
  room_amenities: ["city_view"],
  available_dates: ["2026-07-10", "2026-07-11", "2026-07-12"],
};

const MOCK_ROOM_B = {
  room_id: "room-01b",
  type: "Standard Queen",
  bed_type: "Queen",
  bed_count: 1,
  max_occupancy: 2,
  square_footage: 300,
  price_per_night: 150,
  room_amenities: [],
  available_dates: [],
};

const HOTEL_CHICAGO: Hotel = {
  id: "hotel-01",
  name: "Test Chicago Hotel",
  description: "A test hotel",
  star_rating: 5,
  overall_rating: 4.8,
  review_count: 100,
  address: { street: "123 Main", city: "Chicago", state: "IL", zip_code: "60601", country: "USA" },
  contact: { phone: "+1-312-000-0000", email: "test@test.com" },
  amenities: ["pool", "free Wi-Fi"],
  policies: { check_in_time: "15:00", check_out_time: "11:00", cancellation: "Free" },
  rooms: [MOCK_ROOM_A, MOCK_ROOM_B],
};

const HOTEL_AUSTIN: Hotel = {
  id: "hotel-05",
  name: "Test Austin Hotel",
  description: "Another test hotel",
  star_rating: 3,
  overall_rating: 4.1,
  review_count: 50,
  address: { street: "456 South St", city: "Austin", state: "TX", zip_code: "78701", country: "USA" },
  contact: { phone: "+1-512-000-0000", email: "austin@test.com" },
  amenities: ["free Wi-Fi"],
  policies: { check_in_time: "16:00", check_out_time: "12:00", cancellation: "Non-refundable" },
  rooms: [
    {
      ...MOCK_ROOM_A,
      room_id: "room-05a",
      price_per_night: 90,
      available_dates: ["2026-07-10", "2026-07-11"],
    },
  ],
};

const ALL_HOTELS = [HOTEL_CHICAGO, HOTEL_AUSTIN];

// ── filterHotels ─────────────────────────────────────────────────────────────

describe("filterHotels", () => {
  it("returns all hotels when no filters are active", () => {
    const result = filterHotels(ALL_HOTELS, { city: "", stars: [], maxPrice: 600 });
    expect(result).toHaveLength(2);
  });

  it("filters by city", () => {
    const result = filterHotels(ALL_HOTELS, { city: "Austin", stars: [], maxPrice: 600 });
    expect(result).toHaveLength(1);
    expect(result[0].id).toBe("hotel-05");
  });

  it("filters by star rating", () => {
    const result = filterHotels(ALL_HOTELS, { city: "", stars: [5], maxPrice: 600 });
    expect(result).toHaveLength(1);
    expect(result[0].id).toBe("hotel-01");
  });

  it("filters by multiple star ratings", () => {
    const result = filterHotels(ALL_HOTELS, { city: "", stars: [3, 5], maxPrice: 600 });
    expect(result).toHaveLength(2);
  });

  it("filters by max price using minimum room price", () => {
    const result = filterHotels(ALL_HOTELS, { city: "", stars: [], maxPrice: 100 });
    expect(result).toHaveLength(1);
    expect(result[0].id).toBe("hotel-05");
  });

  it("returns empty array when no hotels match", () => {
    const result = filterHotels(ALL_HOTELS, { city: "Tokyo", stars: [], maxPrice: 600 });
    expect(result).toHaveLength(0);
  });
});

// Use local-timezone dates so date-fns format() produces the expected strings
function localDate(year: number, month: number, day: number): Date {
  return new Date(year, month - 1, day);
}

// ── getDateRange ──────────────────────────────────────────────────────────────

describe("getDateRange", () => {
  it("returns dates from check-in up to (not including) check-out", () => {
    expect(getDateRange(localDate(2026, 7, 10), localDate(2026, 7, 12))).toEqual([
      "2026-07-10",
      "2026-07-11",
    ]);
  });

  it("returns a single night stay", () => {
    expect(getDateRange(localDate(2026, 7, 10), localDate(2026, 7, 11))).toEqual([
      "2026-07-10",
    ]);
  });

  it("returns empty array when check-out is before check-in", () => {
    expect(getDateRange(localDate(2026, 7, 12), localDate(2026, 7, 10))).toEqual([]);
  });

  it("returns empty array when check-out equals check-in", () => {
    const d = localDate(2026, 7, 10);
    expect(getDateRange(d, d)).toEqual([]);
  });
});

// ── getAvailableRooms ─────────────────────────────────────────────────────────

describe("getAvailableRooms", () => {
  it("returns room when all nights are available", () => {
    const rooms = getAvailableRooms(
      HOTEL_CHICAGO,
      localDate(2026, 7, 10),
      localDate(2026, 7, 12)
    );
    expect(rooms.map((r) => r.room_id)).toContain("room-01a");
  });

  it("excludes rooms with empty available_dates", () => {
    const rooms = getAvailableRooms(
      HOTEL_CHICAGO,
      localDate(2026, 7, 10),
      localDate(2026, 7, 11)
    );
    expect(rooms.map((r) => r.room_id)).not.toContain("room-01b");
  });

  it("excludes room when a required night is missing", () => {
    const rooms = getAvailableRooms(
      HOTEL_CHICAGO,
      localDate(2026, 7, 10),
      localDate(2026, 7, 14)
    );
    expect(rooms).toHaveLength(0);
  });

  it("returns all rooms when check-out equals check-in (zero nights)", () => {
    const d = localDate(2026, 7, 10);
    const rooms = getAvailableRooms(HOTEL_CHICAGO, d, d);
    expect(rooms).toEqual(HOTEL_CHICAGO.rooms);
  });
});

// ── getMinPrice ───────────────────────────────────────────────────────────────

describe("getMinPrice", () => {
  it("returns the cheapest room price", () => {
    expect(getMinPrice(HOTEL_CHICAGO)).toBe(150);
  });

  it("handles single-room hotel", () => {
    expect(getMinPrice(HOTEL_AUSTIN)).toBe(90);
  });
});

// ── getCities ─────────────────────────────────────────────────────────────────

describe("getCities", () => {
  it("returns unique, sorted city names", () => {
    const cities = getCities(ALL_HOTELS);
    expect(cities).toEqual(["Austin", "Chicago"]);
  });
});
