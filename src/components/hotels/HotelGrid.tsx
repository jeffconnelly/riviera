"use client";

import { motion } from "framer-motion";
import { Building2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { HotelCard } from "./HotelCard";
import type { Hotel } from "@/lib/types";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.06 },
  },
};

const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

interface HotelGridProps {
  hotels: Hotel[];
  total: number;
  onReset?: () => void;
}

export const HotelGrid = ({ hotels, onReset }: HotelGridProps) => {
  if (hotels.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center">
        <div className="mb-4 flex size-16 items-center justify-center rounded-2xl bg-slate-100">
          <Building2 className="size-8 text-slate-400" />
        </div>
        <h3 className="mb-2 text-lg font-semibold text-slate-900">
          No hotels found
        </h3>
        <p className="mb-6 max-w-xs text-sm text-slate-500">
          No properties match your current filters. Try adjusting your search.
        </p>
        {onReset && (
          <Button variant="outline" onClick={onReset}>
            Clear filters
          </Button>
        )}
      </div>
    );
  }

  return (
    <div>
      <motion.div
        className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
        variants={container}
        initial="hidden"
        animate="show"
      >
        {hotels.map((hotel) => (
          <motion.div key={hotel.id} variants={item} className="w-full min-w-0">
            <HotelCard hotel={hotel} />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};
