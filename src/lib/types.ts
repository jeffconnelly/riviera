export interface Address {
  street: string;
  city: string;
  state: string;
  zip_code: string;
  country: string;
}

export interface Contact {
  phone: string;
  email: string;
}

export interface Policies {
  check_in_time: string;
  check_out_time: string;
  cancellation: string;
}

export interface Room {
  room_id: string;
  type: string;
  bed_type: string;
  bed_count: number;
  max_occupancy: number;
  square_footage: number;
  price_per_night: number;
  room_amenities: string[];
  available_dates: string[];
}

export interface Hotel {
  id: string;
  name: string;
  description: string;
  star_rating: number;
  overall_rating: number;
  review_count: number;
  address: Address;
  contact: Contact;
  amenities: string[];
  policies: Policies;
  rooms: Room[];
}

export interface HotelFilters {
  city: string;
  stars: number[];
  maxPrice: number;
}
