import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { motion } from "motion/react";

interface HeroSectionProps {
  onShopNow: () => void;
}

export function HeroSection({ onShopNow }: HeroSectionProps) {
  return (
    <section
      className="relative overflow-hidden hero-bg min-h-[520px] flex items-center"
      aria-label="Hero"
    >
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('/assets/generated/hero-living-room.dim_1400x600.jpg')",
        }}
      />
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-20 w-full">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="max-w-lg"
        >
          <span className="inline-block text-sm font-semibold text-teal-300 tracking-widest uppercase mb-4">
            New Season Arrivals
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-6">
            Elevate Your Space with Modern Comfort
          </h1>
          <p className="text-white/80 text-lg mb-8">
            Discover curated home essentials, everyday electronics, and fashion
            picks—all in one place.
          </p>
          <div className="flex flex-wrap gap-3">
            <Button
              onClick={onShopNow}
              className="bg-brand hover:bg-brand-dark text-white rounded-full px-8 py-3 text-base font-bold shadow-lg"
              data-ocid="hero.primary_button"
            >
              Shop The Collection
            </Button>
            <Button
              variant="ghost"
              onClick={onShopNow}
              className="text-white hover:text-white hover:bg-white/20 rounded-full px-6 py-3 text-base font-medium"
              data-ocid="hero.secondary_button"
            >
              New Arrivals <ArrowRight className="ml-1 h-4 w-4" />
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
