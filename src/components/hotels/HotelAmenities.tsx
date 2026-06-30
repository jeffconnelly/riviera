import {
  Waves,
  Wifi,
  Dumbbell,
  Sparkles,
  Car,
  PawPrint,
  Utensils,
  Wine,
  Coffee,
  ParkingSquare,
  Bike,
  Umbrella,
  Shirt,
  Users,
  Flame,
  Anchor,
  Gamepad2,
  Bath,
  Building2,
  ShoppingBag,
  type LucideIcon,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const AMENITY_MAP: Record<string, { label: string; icon: LucideIcon }> = {
  pool: { label: "Pool", icon: Waves },
  "free Wi-Fi": { label: "Free Wi-Fi", icon: Wifi },
  fitness_center: { label: "Fitness Center", icon: Dumbbell },
  spa: { label: "Spa", icon: Sparkles },
  valet_parking: { label: "Valet Parking", icon: Car },
  pet_friendly: { label: "Pet Friendly", icon: PawPrint },
  restaurant: { label: "Restaurant", icon: Utensils },
  bar: { label: "Bar", icon: Wine },
  free_breakfast: { label: "Free Breakfast", icon: Coffee },
  free_parking: { label: "Free Parking", icon: ParkingSquare },
  bicycle_rentals: { label: "Bicycle Rentals", icon: Bike },
  beach_access: { label: "Beach Access", icon: Umbrella },
  laundry_service: { label: "Laundry", icon: Shirt },
  meeting_rooms: { label: "Meeting Rooms", icon: Users },
  rooftop_bar: { label: "Rooftop Bar", icon: Building2 },
  hot_tub: { label: "Hot Tub", icon: Bath },
  marina_access: { label: "Marina", icon: Anchor },
  gaming_lounge: { label: "Gaming Lounge", icon: Gamepad2 },
  michelin_restaurant: { label: "Michelin Restaurant", icon: Utensils },
  afternoon_tea_lounge: { label: "Afternoon Tea", icon: Coffee },
  sky_bar: { label: "Sky Bar", icon: Building2 },
  rooftop_terrace: { label: "Rooftop Terrace", icon: Building2 },
  rooftop_wine_bar: { label: "Rooftop Wine Bar", icon: Wine },
  courtyard_cafe: { label: "Courtyard Café", icon: Coffee },
  on_site_pub: { label: "On-Site Pub", icon: Wine },
  social_lounge: { label: "Social Lounge", icon: Users },
  public_hot_spring_bath: { label: "Hot Spring Bath", icon: Bath },
  traditional_breakfast: { label: "Traditional Breakfast", icon: Coffee },
  harbour_restaurant: { label: "Harbour Restaurant", icon: Utensils },
  fine_dining_terrace: { label: "Fine Dining", icon: Utensils },
  luggage_storage: { label: "Luggage Storage", icon: ShoppingBag },
  vending_galore: { label: "Vending", icon: ShoppingBag },
  courtyard_lounge: { label: "Courtyard Lounge", icon: Users },
};

const formatAmenity = (key: string): string =>
  key.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());

interface HotelAmenitiesProps {
  amenities: string[];
  className?: string;
  maxVisible?: number;
}

export const HotelAmenities = ({
  amenities,
  className,
  maxVisible,
}: HotelAmenitiesProps) => {
  const visible = maxVisible ? amenities.slice(0, maxVisible) : amenities;
  const remaining = maxVisible ? amenities.length - maxVisible : 0;

  return (
    <div className={cn("flex flex-wrap gap-2", className)}>
      {visible.map((key) => {
        const config = AMENITY_MAP[key];
        const Icon = config?.icon;
        const label = config?.label ?? formatAmenity(key);
        return (
          <Badge
            key={key}
            variant="secondary"
            className="gap-1.5 bg-teal-50 py-1 text-teal-700 hover:bg-teal-100"
          >
            {Icon && <Icon className="size-3" />}
            {label}
          </Badge>
        );
      })}
      {remaining > 0 && (
        <Badge
          variant="secondary"
          className="bg-slate-50 text-slate-500"
        >
          +{remaining} more
        </Badge>
      )}
    </div>
  );
};
