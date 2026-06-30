# Riviera — Hotel Discovery Interface

A premium hotel discovery frontend built as a take-home engineering assignment. Users browse 40 hotels across 10 global cities, filter by city, star rating, and price, dive into hotel detail pages, and check room availability by date range.

## Setup

**Requirements:** Node.js 18+

```bash
npm install
npm run dev       # http://localhost:3000
npm run build     # production build + type check
npm test          # vitest unit tests
```

## Tech Stack

- **Next.js 16** — App Router, TypeScript, `src/` directory
- **Tailwind CSS v4** — utility-first styling
- **shadcn/ui** (new-york style, `@base-ui/react`) — UI primitives
- **framer-motion** — stagger animations on the hotel grid, hover lift on cards
- **date-fns** — date range generation for availability logic
- **react-day-picker** — calendar range picker (bundled with shadcn Calendar)
- **Vitest** — unit tests for pure utility functions

## State Management

Filter state (city, stars, max price) lives in URL search parameters — no external state library. URLs are shareable, browser back/forward works out of the box, and there's no hydration mismatch between server and client. Date range on the hotel detail page is also URL-persisted so dates survive refresh.

## Component Breakdown

```
src/
  app/
    page.tsx                        Server component — loads hotel data, renders shell
    HotelDashboard.tsx              Client component — reads URL filters, renders grid + heading
    hotels/[id]/page.tsx            Server component — hotel detail page (SSG via generateStaticParams)
  components/
    layout/
      Navbar.tsx                    Sticky top nav with teal accent bar
    hotels/
      HotelCard.tsx                 Card with city-gradient header, star rating, price
      HotelGrid.tsx                 Framer-motion staggered grid + empty state
      HotelFilters.tsx              Sticky filter bar — city select, star toggles, price slider
      HotelAmenities.tsx            Amenity pills with lucide icons
      RoomAvailabilityChecker.tsx   Date range picker + available room list, URL-synced
      RoomCard.tsx                  Individual room display with pricing and amenities
  lib/
    types.ts                        Hotel, Room, Address, HotelFilters TypeScript interfaces
    hotel-utils.ts                  filterHotels, getAvailableRooms, getDateRange, getMinPrice, getCities
    utils.ts                        cn() from shadcn
  hooks/
    useFilters.ts                   URL searchParam filter state hook
  data/
    hotels.json                     40-hotel mock dataset
```

## Running Tests

```bash
npm test
```

17 unit tests covering all pure functions in `src/lib/hotel-utils.ts`:
- `filterHotels` — city, star, price filtering combinations
- `getDateRange` — check-out exclusive range, single night, edge cases
- `getAvailableRooms` — full availability, partial availability, empty dates, zero-night range
- `getMinPrice` — cheapest room selection
- `getCities` — unique sorted city list

## AI Tooling

Built with **Claude Code** (claude-sonnet-4-6) as a pair programming partner — architecture, code generation, debugging, design iteration, and test authoring were all collaborative. Claude flagged tradeoffs, pushed back on weaker approaches, and explained reasoning throughout.