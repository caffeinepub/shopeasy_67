import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Heart, ShoppingCart, Star } from "lucide-react";
import { motion } from "motion/react";
import type { Product } from "../types";

const STAR_POSITIONS = [1, 2, 3, 4, 5] as const;

interface ProductCardProps {
  product: Product;
  isWishlisted: boolean;
  inCart: boolean;
  onAddToCart: (product: Product) => void;
  onToggleWishlist: (product: Product) => void;
  index: number;
}

export function ProductCard({
  product,
  isWishlisted,
  inCart,
  onAddToCart,
  onToggleWishlist,
  index,
}: ProductCardProps) {
  const ocidIndex = index + 1;
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: (index % 3) * 0.1, duration: 0.4 }}
      className="bg-card rounded-2xl border border-border overflow-hidden group hover:shadow-lg transition-shadow duration-300"
      data-ocid={`product.item.${ocidIndex}`}
    >
      <div className={`relative h-48 bg-gradient-to-br ${product.gradient}`}>
        <div className="absolute inset-0 flex items-center justify-center text-4xl sm:text-5xl opacity-20 font-bold text-white select-none">
          {product.category[0]}
        </div>
        {product.badge && (
          <Badge className="absolute top-3 left-3 text-xs font-bold bg-brand text-white border-0">
            {product.badge}
          </Badge>
        )}
        <button
          type="button"
          onClick={() => onToggleWishlist(product)}
          className={`absolute top-3 right-3 p-1.5 rounded-full transition-all duration-200 ${
            isWishlisted
              ? "bg-rose-500 text-white scale-110"
              : "bg-white/80 text-muted-foreground hover:bg-white hover:text-rose-500"
          }`}
          aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
          data-ocid={`product.toggle.${ocidIndex}`}
        >
          <Heart
            className="h-4 w-4"
            fill={isWishlisted ? "currentColor" : "none"}
          />
        </button>
      </div>

      <div className="p-4">
        <p className="text-xs font-semibold text-brand uppercase tracking-wide mb-1">
          {product.category}
        </p>
        <h3 className="text-sm font-bold text-foreground leading-snug mb-1 line-clamp-2">
          {product.name}
        </h3>
        <p className="text-xs text-muted-foreground line-clamp-1 mb-3">
          {product.description}
        </p>

        <div className="flex items-center gap-1 mb-3">
          {STAR_POSITIONS.map((pos) => (
            <Star
              key={pos}
              className="h-3.5 w-3.5"
              fill={pos <= Math.floor(product.rating) ? "#F2C94C" : "none"}
              stroke={
                pos <= Math.floor(product.rating) ? "#F2C94C" : "currentColor"
              }
              strokeWidth={1.5}
            />
          ))}
          <span className="text-xs text-muted-foreground ml-1">
            ({product.reviewCount.toLocaleString()})
          </span>
        </div>

        <div className="flex items-center justify-between gap-2">
          <div>
            <span className="text-base font-extrabold text-foreground">
              ${product.price.toFixed(2)}
            </span>
            {product.originalPrice && (
              <span className="text-xs text-muted-foreground line-through ml-2">
                ${product.originalPrice.toFixed(2)}
              </span>
            )}
          </div>
          <Button
            size="sm"
            onClick={() => onAddToCart(product)}
            className={`rounded-full text-xs font-semibold px-3 transition-all ${
              inCart
                ? "bg-brand-dark text-white"
                : "bg-brand hover:bg-brand-dark text-white"
            }`}
            data-ocid={`product.button.${ocidIndex}`}
          >
            <ShoppingCart className="h-3.5 w-3.5 mr-1" />
            {inCart ? "Added" : "Add"}
          </Button>
        </div>
      </div>
    </motion.div>
  );
}
