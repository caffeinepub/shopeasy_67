import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { CreditCard, Loader2, Package } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { useActor } from "../hooks/useActor";
import type { CartItem } from "../types";

interface CheckoutModalProps {
  open: boolean;
  onClose: () => void;
  items: CartItem[];
  onPlaceOrder: () => void;
}

interface FormData {
  name: string;
  email: string;
  address: string;
  city: string;
  zip: string;
}

export function CheckoutModal({ open, onClose, items }: CheckoutModalProps) {
  const { actor } = useActor();
  const [form, setForm] = useState<FormData>({
    name: "",
    email: "",
    address: "",
    city: "",
    zip: "",
  });
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [isRedirecting, setIsRedirecting] = useState(false);

  const subtotal = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0,
  );
  const shipping = subtotal >= 75 ? 0 : 9.99;
  const total = subtotal + shipping;

  const validate = () => {
    const errs: Partial<FormData> = {};
    if (!form.name.trim()) errs.name = "Name is required";
    if (!form.email.trim() || !form.email.includes("@"))
      errs.email = "Valid email required";
    if (!form.address.trim()) errs.address = "Address is required";
    if (!form.city.trim()) errs.city = "City is required";
    if (!form.zip.trim()) errs.zip = "ZIP is required";
    return errs;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    if (!actor) {
      toast.error("Not connected. Please refresh and try again.");
      return;
    }

    setIsRedirecting(true);
    try {
      const shoppingItems = items.map((item) => ({
        productName: item.product.name,
        currency: "usd",
        quantity: BigInt(item.quantity),
        priceInCents: BigInt(Math.round(item.product.price * 100)),
        productDescription: item.product.description,
      }));

      const successUrl = `${window.location.href}?payment=success`;
      const cancelUrl = window.location.href;

      const checkoutUrl = await actor.createCheckoutSession(
        shoppingItems,
        successUrl,
        cancelUrl,
      );

      window.location.href = checkoutUrl;
    } catch (err) {
      console.error("Checkout error:", err);
      toast.error("Failed to start checkout. Please try again.");
      setIsRedirecting(false);
    }
  };

  const update =
    (field: keyof FormData) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setForm((prev) => ({ ...prev, [field]: e.target.value }));
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    };

  return (
    <Dialog
      open={open}
      onOpenChange={(v) => {
        if (!v && !isRedirecting) onClose();
      }}
    >
      <DialogContent
        className="max-w-2xl max-h-[90vh] overflow-y-auto"
        data-ocid="checkout.dialog"
      >
        <DialogHeader>
          <DialogTitle className="text-xl font-bold flex items-center gap-2">
            <Package className="h-5 w-5 text-brand" />
            Checkout
          </DialogTitle>
        </DialogHeader>

        {isRedirecting ? (
          <div
            className="flex flex-col items-center justify-center py-16 text-center"
            data-ocid="checkout.loading_state"
          >
            <Loader2 className="h-12 w-12 text-brand animate-spin mb-4" />
            <h3 className="text-lg font-semibold text-foreground mb-1">
              Redirecting to secure payment...
            </h3>
            <p className="text-sm text-muted-foreground">
              Please wait while we connect you to Stripe.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6" noValidate>
            {/* Order Summary */}
            <div className="bg-muted/40 rounded-xl p-4">
              <h4 className="font-semibold text-sm text-foreground mb-3">
                Order Summary ({items.reduce((s, i) => s + i.quantity, 0)}{" "}
                items)
              </h4>
              <div className="space-y-2">
                {items.map((item) => (
                  <div
                    key={item.product.id}
                    className="flex justify-between text-sm"
                  >
                    <span className="text-muted-foreground">
                      {item.product.name} × {item.quantity}
                    </span>
                    <span className="font-medium">
                      ${(item.product.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>
              <Separator className="my-3" />
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Shipping</span>
                <span>
                  {shipping === 0 ? (
                    <span className="text-green-600 font-semibold">FREE</span>
                  ) : (
                    `$${shipping.toFixed(2)}`
                  )}
                </span>
              </div>
              <div className="flex justify-between font-bold text-base mt-2">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>

            {/* Shipping Info */}
            <div className="space-y-4">
              <h4 className="font-semibold text-foreground">
                Shipping Information
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1 sm:col-span-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    value={form.name}
                    onChange={update("name")}
                    placeholder="Jane Doe"
                    className={errors.name ? "border-destructive" : ""}
                    data-ocid="checkout.input"
                  />
                  {errors.name && (
                    <p
                      className="text-xs text-destructive"
                      data-ocid="checkout.error_state"
                    >
                      {errors.name}
                    </p>
                  )}
                </div>
                <div className="space-y-1 sm:col-span-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={form.email}
                    onChange={update("email")}
                    placeholder="jane@example.com"
                    className={errors.email ? "border-destructive" : ""}
                    data-ocid="checkout.input"
                  />
                  {errors.email && (
                    <p
                      className="text-xs text-destructive"
                      data-ocid="checkout.error_state"
                    >
                      {errors.email}
                    </p>
                  )}
                </div>
                <div className="space-y-1 sm:col-span-2">
                  <Label htmlFor="address">Street Address</Label>
                  <Textarea
                    id="address"
                    value={form.address}
                    onChange={update("address")}
                    placeholder="123 Main Street, Apt 4B"
                    rows={2}
                    className={errors.address ? "border-destructive" : ""}
                    data-ocid="checkout.textarea"
                  />
                  {errors.address && (
                    <p
                      className="text-xs text-destructive"
                      data-ocid="checkout.error_state"
                    >
                      {errors.address}
                    </p>
                  )}
                </div>
                <div className="space-y-1">
                  <Label htmlFor="city">City</Label>
                  <Input
                    id="city"
                    value={form.city}
                    onChange={update("city")}
                    placeholder="New York"
                    className={errors.city ? "border-destructive" : ""}
                    data-ocid="checkout.input"
                  />
                  {errors.city && (
                    <p
                      className="text-xs text-destructive"
                      data-ocid="checkout.error_state"
                    >
                      {errors.city}
                    </p>
                  )}
                </div>
                <div className="space-y-1">
                  <Label htmlFor="zip">ZIP Code</Label>
                  <Input
                    id="zip"
                    value={form.zip}
                    onChange={update("zip")}
                    placeholder="10001"
                    className={errors.zip ? "border-destructive" : ""}
                    data-ocid="checkout.input"
                  />
                  {errors.zip && (
                    <p
                      className="text-xs text-destructive"
                      data-ocid="checkout.error_state"
                    >
                      {errors.zip}
                    </p>
                  )}
                </div>
              </div>
            </div>

            <div className="bg-blue-50 dark:bg-blue-950/30 rounded-lg p-3 flex items-start gap-2">
              <CreditCard className="h-4 w-4 text-blue-600 mt-0.5 shrink-0" />
              <p className="text-xs text-blue-700 dark:text-blue-300">
                You'll be redirected to Stripe's secure checkout page to
                complete your payment.
              </p>
            </div>

            <div className="flex gap-3 pt-2">
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                className="flex-1 rounded-full"
                data-ocid="checkout.cancel_button"
              >
                Back to Cart
              </Button>
              <Button
                type="submit"
                className="flex-1 bg-brand hover:bg-brand-dark text-white rounded-full font-bold"
                data-ocid="checkout.submit_button"
              >
                <CreditCard className="h-4 w-4 mr-2" />
                Pay with Stripe
              </Button>
            </div>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
