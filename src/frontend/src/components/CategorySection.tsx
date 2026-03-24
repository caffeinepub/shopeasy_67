import { motion } from "motion/react";
import { CATEGORIES } from "../data/products";

interface CategorySectionProps {
  activeCategory: string;
  onSelect: (cat: string) => void;
}

export function CategorySection({
  activeCategory,
  onSelect,
}: CategorySectionProps) {
  return (
    <section
      className="py-14 bg-background"
      aria-labelledby="categories-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <h2
          id="categories-heading"
          className="text-2xl font-bold text-center text-foreground mb-10"
        >
          Shop by Category
        </h2>
        <div className="flex flex-wrap justify-center gap-6 sm:gap-8">
          {CATEGORIES.map((cat, i) => (
            <motion.button
              key={cat.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.4 }}
              onClick={() =>
                onSelect(activeCategory === cat.name ? "" : cat.name)
              }
              className="flex flex-col items-center gap-3 group"
              data-ocid="category.button"
              aria-pressed={activeCategory === cat.name}
            >
              <div
                className={`w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gradient-to-br ${cat.gradient} flex items-center justify-center text-3xl shadow-md transition-all duration-200 group-hover:scale-110 ${
                  activeCategory === cat.name
                    ? "ring-4 ring-brand ring-offset-2 scale-110"
                    : ""
                }`}
              >
                {cat.icon}
              </div>
              <span
                className={`text-sm font-semibold transition-colors ${
                  activeCategory === cat.name
                    ? "text-brand"
                    : "text-foreground group-hover:text-brand"
                }`}
              >
                {cat.name}
              </span>
            </motion.button>
          ))}
        </div>
      </div>
    </section>
  );
}
