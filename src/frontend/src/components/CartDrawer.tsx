import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import type { CartItem } from "../types";

interface CartDrawerProps {
  open: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQty: (id: number, delta: number) => void;
  onRemove: (id: number) => void;
  onCheckout: () => void;
}

export function CartDrawer({
  open,
  onClose,
  items,
  onUpdateQty,
  onRemove,
  onCheckout,
}: CartDrawerProps) {
  const subtotal = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0,
  );
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <Sheet open={open} onOpenChange={(v) => !v && onClose()}>
      <SheetContent
        side="right"
        className="w-full sm:max-w-md p-0 flex flex-col"
        data-ocid="cart.sheet"
      >
        <SheetHeader className="px-6 py-4 border-b border-border">
          <SheetTitle className="flex items-center gap-2 text-lg font-bold">
            <ShoppingBag className="h-5 w-5 text-brand" />
            Shopping Cart
            {totalItems > 0 && (
              <span className="text-sm font-normal text-muted-foreground">
                ({totalItems} items)
              </span>
            )}
          </SheetTitle>
        </SheetHeader>

        {items.length === 0 ? (
          <div
            className="flex-1 flex flex-col items-center justify-center gap-4 text-center px-6"
            data-ocid="cart.empty_state"
          >
            <ShoppingBag className="h-16 w-16 text-muted-foreground/30" />
            <p className="font-semibold text-muted-foreground">
              Your cart is empty
            </p>
            <p className="text-sm text-muted-foreground">
              Add some products to get started!
            </p>
            <Button
              onClick={onClose}
              className="bg-brand hover:bg-brand-dark text-white rounded-full"
              data-ocid="cart.close_button"
            >
              Continue Shopping
            </Button>
          </div>
        ) : (
          <>
            <ScrollArea className="flex-1 px-6 py-4">
              <div className="space-y-4">
                {items.map((item, i) => (
                  <div
                    key={item.product.id}
                    className="flex gap-3"
                    data-ocid={`cart.item.${i + 1}`}
                  >
                    <div
                      className={`w-16 h-16 rounded-xl bg-gradient-to-br ${item.product.gradient} flex-shrink-0`}
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-foreground line-clamp-1">
                        {item.product.name}
                      </p>
                      <p className="text-xs text-muted-foreground mb-2">
                        ${item.product.price.toFixed(2)} each
                      </p>
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => onUpdateQty(item.product.id, -1)}
                          className="w-6 h-6 rounded-full border border-border flex items-center justify-center hover:bg-muted transition-colors"
                          data-ocid={`cart.button.${i + 1}`}
                        >
                          <Minus className="h-3 w-3" />
                        </button>
                        <span className="text-sm font-bold w-5 text-center">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => onUpdateQty(item.product.id, 1)}
                          className="w-6 h-6 rounded-full border border-border flex items-center justify-center hover:bg-muted transition-colors"
                          data-ocid={`cart.button.${i + 1}`}
                        >
                          <Plus className="h-3 w-3" />
                        </button>
                        <span className="text-sm font-bold text-foreground ml-auto">
                          ${(item.product.price * item.quantity).toFixed(2)}
                        </span>
                        <button
                          type="button"
                          onClick={() => onRemove(item.product.id)}
                          className="text-destructive hover:text-destructive/80 transition-colors"
                          aria-label="Remove item"
                          data-ocid={`cart.delete_button.${i + 1}`}
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>

            <div className="border-t border-border px-6 py-4 space-y-4">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Subtotal</span>
                <span className="font-semibold">${subtotal.toFixed(2)}</span>
              </div>
              <Separator />
              <div className="flex justify-between font-bold text-base">
                <span>Total</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <Button
                className="w-full bg-brand hover:bg-brand-dark text-white rounded-full text-base font-bold py-5"
                onClick={() => {
                  onClose();
                  onCheckout();
                }}
                data-ocid="cart.submit_button"
              >
                Proceed to Checkout
              </Button>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
