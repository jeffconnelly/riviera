# Tradeoffs & Assumptions

**Dedicated route over modal for hotel detail** — enables static pre-rendering of all 40 hotel pages at build time and makes browser back/forward work without custom state management.

**Filter state in URL search params** — city, stars, and price filters live in the URL so they're shareable and survive refresh. Requires a `<Suspense>` boundary but eliminates hydration mismatches entirely.

**Date persistence on the detail page** — check-in/check-out are synced to the URL (`?checkIn=&checkOut=`) so dates survive refresh and can be bookmarked. Dates don't carry between hotels automatically; adding date inputs to the dashboard filter bar would solve this but is out of scope.

**Gradient headers instead of photos** — the dataset has no image URLs. Each city gets a distinct gradient defined once in `hotel-utils.ts` and shared between card and detail page. Would be replaced with hotel photography in production.

**No state management library** — both filter and date state are URL-based. No cross-component reactive state exists that would justify Redux or Zustand.

**Unit tests on pure functions only** — `hotel-utils.ts` is fully tested (17 tests). Component and E2E tests would be the meaningful next layer but were deprioritized given the time constraint.

**Empty states** — three cases: no filter matches (reset button), no rooms for selected dates (clear dates link), and hotels with no availability data (contact hotel email). The third is intentionally distinct since changing dates won't help.
