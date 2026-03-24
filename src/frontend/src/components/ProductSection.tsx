import { PackageSearch } from "lucide-react";
import { PRODUCTS } from "../data/products";
import type { Product } from "../types";
import { FilterSidebar } from "./FilterSidebar";
import { ProductCard } from "./ProductCard";

interface ProductSectionProps {
  activeCategory: string;
  priceRange: [number, number];
  searchQuery: string;
  wishlist: Set<number>;
  cartIds: Set<number>;
  onCategoryChange: (cat: string) => void;
  onPriceChange: (range: [number, number]) => void;
  onResetFilters: () => void;
  onAddToCart: (product: Product) => void;
  onToggleWishlist: (product: Product) => void;
}

export function ProductSection({
  activeCategory,
  priceRange,
  searchQuery,
  wishlist,
  cartIds,
  onCategoryChange,
  onPriceChange,
  onResetFilters,
  onAddToCart,
  onToggleWishlist,
}: ProductSectionProps) {
  const filtered = PRODUCTS.filter((p) => {
    const matchCat = !activeCategory || p.category === activeCategory;
    const matchPrice = p.price >= priceRange[0] && p.price <= priceRange[1];
    const matchSearch =
      !searchQuery ||
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCat && matchPrice && matchSearch;
  });

  return (
    <section className="py-12 bg-background" aria-labelledby="products-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <h2
          id="products-heading"
          className="text-2xl font-bold text-foreground mb-8"
        >
          Trending Now: Curated Picks
        </h2>
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <div className="lg:w-56 flex-shrink-0">
            <FilterSidebar
              activeCategory={activeCategory}
              priceRange={priceRange}
              onCategoryChange={onCategoryChange}
              onPriceChange={onPriceChange}
              onReset={onResetFilters}
            />
          </div>

          {/* Grid */}
          <div className="flex-1">
            {filtered.length === 0 ? (
              <div
                className="flex flex-col items-center justify-center py-20 text-center"
                data-ocid="product.empty_state"
              >
                <PackageSearch className="h-16 w-16 text-muted-foreground/40 mb-4" />
                <p className="text-lg font-semibold text-muted-foreground">
                  No products found
                </p>
                <p className="text-sm text-muted-foreground mt-1">
                  Try adjusting your filters or search query.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
                {filtered.map((product, i) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    isWishlisted={wishlist.has(product.id)}
                    inCart={cartIds.has(product.id)}
                    onAddToCart={onAddToCart}
                    onToggleWishlist={onToggleWishlist}
                    index={i}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
