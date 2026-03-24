import { Toaster } from "@/components/ui/sonner";
import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";
import { AdminSettingsModal } from "./components/AdminSettingsModal";
import { AnnouncementBar } from "./components/AnnouncementBar";
import { CartDrawer } from "./components/CartDrawer";
import { CategorySection } from "./components/CategorySection";
import { CheckoutModal } from "./components/CheckoutModal";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { HeroSection } from "./components/HeroSection";
import { NewsletterSection } from "./components/NewsletterSection";
import { ProductSection } from "./components/ProductSection";
import { WishlistDrawer } from "./components/WishlistDrawer";
import { useActor } from "./hooks/useActor";
import type { CartItem, Product } from "./types";

export default function App() {
  const { actor } = useActor();
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<Set<number>>(new Set());
  const [activeCategory, setActiveCategory] = useState("");
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 500]);
  const [searchQuery, setSearchQuery] = useState("");
  const [cartOpen, setCartOpen] = useState(false);
  const [wishlistOpen, setWishlistOpen] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [adminOpen, setAdminOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  // Handle payment success on page load
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("payment") === "success") {
      toast.success("Payment successful! Your order has been placed. 🎉", {
        duration: 5000,
      });
      setCart([]);
      params.delete("payment");
      const newUrl =
        window.location.pathname +
        (params.toString() ? `?${params.toString()}` : "");
      history.replaceState(null, "", newUrl);
    }
  }, []);

  // Check admin status when actor is available
  useEffect(() => {
    if (actor) {
      actor
        .isCallerAdmin()
        .then(setIsAdmin)
        .catch(() => setIsAdmin(false));
    }
  }, [actor]);

  const addToCart = useCallback((product: Product) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.product.id === product.id);
      if (existing) {
        return prev.map((i) =>
          i.product.id === product.id ? { ...i, quantity: i.quantity + 1 } : i,
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
    toast.success(`${product.name} added to cart!`, { duration: 2000 });
  }, []);

  const removeFromCart = useCallback((id: number) => {
    setCart((prev) => prev.filter((i) => i.product.id !== id));
  }, []);

  const updateQty = useCallback((id: number, delta: number) => {
    setCart((prev) =>
      prev
        .map((i) =>
          i.product.id === id ? { ...i, quantity: i.quantity + delta } : i,
        )
        .filter((i) => i.quantity > 0),
    );
  }, []);

  const toggleWishlist = useCallback((product: Product) => {
    setWishlist((prev) => {
      const next = new Set(prev);
      if (next.has(product.id)) {
        next.delete(product.id);
        toast.info("Removed from wishlist");
      } else {
        next.add(product.id);
        toast.success(`${product.name} added to wishlist!`, { duration: 2000 });
      }
      return next;
    });
  }, []);

  const handlePlaceOrder = useCallback(() => {
    setCart([]);
    setCheckoutOpen(false);
  }, []);

  const cartCount = cart.reduce((s, i) => s + i.quantity, 0);
  const cartIds = new Set(cart.map((i) => i.product.id));

  const scrollToProducts = () => {
    document
      .getElementById("products-section")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <AnnouncementBar />
      <Header
        cartCount={cartCount}
        wishlistCount={wishlist.size}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onCartOpen={() => setCartOpen(true)}
        onWishlistOpen={() => setWishlistOpen(true)}
        activeCategory={activeCategory}
        onCategorySelect={setActiveCategory}
      />

      <main className="flex-1">
        <HeroSection onShopNow={scrollToProducts} />
        <CategorySection
          activeCategory={activeCategory}
          onSelect={(cat) => {
            setActiveCategory(cat);
            scrollToProducts();
          }}
        />

        <div id="products-section">
          <ProductSection
            activeCategory={activeCategory}
            priceRange={priceRange}
            searchQuery={searchQuery}
            wishlist={wishlist}
            cartIds={cartIds}
            onCategoryChange={setActiveCategory}
            onPriceChange={setPriceRange}
            onResetFilters={() => {
              setActiveCategory("");
              setPriceRange([0, 500]);
              setSearchQuery("");
            }}
            onAddToCart={addToCart}
            onToggleWishlist={toggleWishlist}
          />
        </div>

        <NewsletterSection />
      </main>

      <Footer isAdmin={isAdmin} onAdminClick={() => setAdminOpen(true)} />

      <CartDrawer
        open={cartOpen}
        onClose={() => setCartOpen(false)}
        items={cart}
        onUpdateQty={updateQty}
        onRemove={removeFromCart}
        onCheckout={() => setCheckoutOpen(true)}
      />

      <WishlistDrawer
        open={wishlistOpen}
        onClose={() => setWishlistOpen(false)}
        wishlist={wishlist}
        onToggleWishlist={toggleWishlist}
        onAddToCart={addToCart}
      />

      <CheckoutModal
        open={checkoutOpen}
        onClose={() => setCheckoutOpen(false)}
        items={cart}
        onPlaceOrder={handlePlaceOrder}
      />

      <AdminSettingsModal
        open={adminOpen}
        onClose={() => setAdminOpen(false)}
      />

      <Toaster position="bottom-right" richColors />
    </div>
  );
}
