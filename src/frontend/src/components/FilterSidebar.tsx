import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { X } from "lucide-react";
import { CATEGORIES } from "../data/products";

interface FilterSidebarProps {
  activeCategory: string;
  priceRange: [number, number];
  onCategoryChange: (cat: string) => void;
  onPriceChange: (range: [number, number]) => void;
  onReset: () => void;
}

export function FilterSidebar({
  activeCategory,
  priceRange,
  onCategoryChange,
  onPriceChange,
  onReset,
}: FilterSidebarProps) {
  return (
    <aside
      className="bg-card rounded-2xl border border-border p-5 sticky top-24 space-y-6"
      aria-label="Filters"
    >
      <div className="flex items-center justify-between">
        <h3 className="font-bold text-foreground">Filters</h3>
        <Button
          variant="ghost"
          size="sm"
          onClick={onReset}
          className="text-xs text-muted-foreground h-auto p-1"
          data-ocid="filter.button"
        >
          <X className="h-3.5 w-3.5 mr-1" /> Reset
        </Button>
      </div>

      <div>
        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-3">
          Category
        </p>
        <div className="flex flex-col gap-1">
          <button
            type="button"
            onClick={() => onCategoryChange("")}
            className={`text-left px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
              activeCategory === ""
                ? "bg-brand text-white"
                : "text-foreground hover:bg-muted"
            }`}
            data-ocid="filter.tab"
          >
            All Products
          </button>
          {CATEGORIES.map((cat) => (
            <button
              type="button"
              key={cat.name}
              onClick={() => onCategoryChange(cat.name)}
              className={`text-left px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 ${
                activeCategory === cat.name
                  ? "bg-brand text-white"
                  : "text-foreground hover:bg-muted"
              }`}
              data-ocid="filter.tab"
            >
              <span>{cat.icon}</span>
              {cat.name}
            </button>
          ))}
        </div>
      </div>

      <div>
        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-3">
          Price Range
        </p>
        <Slider
          min={0}
          max={500}
          step={10}
          value={priceRange}
          onValueChange={(val) => onPriceChange(val as [number, number])}
          className="mb-3"
          data-ocid="filter.input"
        />
        <div className="flex justify-between text-xs font-medium text-muted-foreground">
          <span>${priceRange[0]}</span>
          <span>${priceRange[1]}</span>
        </div>
      </div>
    </aside>
  );
}
