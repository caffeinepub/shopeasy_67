import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Heart, ShoppingCart } from "lucide-react";
import { PRODUCTS } from "../data/products";
import type { Product } from "../types";

interface WishlistDrawerProps {
  open: boolean;
  onClose: () => void;
  wishlist: Set<number>;
  onToggleWishlist: (product: Product) => void;
  onAddToCart: (product: Product) => void;
}

export function WishlistDrawer({
  open,
  onClose,
  wishlist,
  onToggleWishlist,
  onAddToCart,
}: WishlistDrawerProps) {
  const items = PRODUCTS.filter((p) => wishlist.has(p.id));

  return (
    <Sheet open={open} onOpenChange={(v) => !v && onClose()}>
      <SheetContent
        side="right"
        className="w-full sm:max-w-md p-0 flex flex-col"
        data-ocid="wishlist.sheet"
      >
        <SheetHeader className="px-6 py-4 border-b border-border">
          <SheetTitle className="flex items-center gap-2 text-lg font-bold">
            <Heart className="h-5 w-5 text-rose-500" fill="currentColor" />
            Wishlist
            {items.length > 0 && (
              <span className="text-sm font-normal text-muted-foreground">
                ({items.length} items)
              </span>
            )}
          </SheetTitle>
        </SheetHeader>

        {items.length === 0 ? (
          <div
            className="flex-1 flex flex-col items-center justify-center gap-4 text-center px-6"
            data-ocid="wishlist.empty_state"
          >
            <Heart className="h-16 w-16 text-muted-foreground/30" />
            <p className="font-semibold text-muted-foreground">
              Your wishlist is empty
            </p>
            <p className="text-sm text-muted-foreground">
              Save products you love here!
            </p>
            <Button
              onClick={onClose}
              className="bg-brand hover:bg-brand-dark text-white rounded-full"
              data-ocid="wishlist.close_button"
            >
              Browse Products
            </Button>
          </div>
        ) : (
          <ScrollArea className="flex-1 px-6 py-4">
            <div className="space-y-4">
              {items.map((product, i) => (
                <div
                  key={product.id}
                  className="flex gap-3 items-center"
                  data-ocid={`wishlist.item.${i + 1}`}
                >
                  <div
                    className={`w-16 h-16 rounded-xl bg-gradient-to-br ${product.gradient} flex-shrink-0`}
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-foreground line-clamp-1">
                      {product.name}
                    </p>
                    <p className="text-xs text-brand font-medium">
                      {product.category}
                    </p>
                    <p className="text-sm font-bold mt-0.5">
                      ${product.price.toFixed(2)}
                    </p>
                  </div>
                  <div className="flex flex-col gap-2">
                    <Button
                      size="sm"
                      onClick={() => {
                        onAddToCart(product);
                      }}
                      className="bg-brand hover:bg-brand-dark text-white rounded-full px-3 text-xs"
                      data-ocid={`wishlist.button.${i + 1}`}
                    >
                      <ShoppingCart className="h-3 w-3 mr-1" /> Add
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => onToggleWishlist(product)}
                      className="text-rose-500 hover:text-rose-600 rounded-full px-3 text-xs h-auto py-1"
                      data-ocid={`wishlist.delete_button.${i + 1}`}
                    >
                      Remove
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        )}
      </SheetContent>
    </Sheet>
  );
}
