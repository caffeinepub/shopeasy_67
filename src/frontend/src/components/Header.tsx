import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Heart, Menu, Search, ShoppingCart, X } from "lucide-react";
import { useState } from "react";

const NAV_LINKS = [
  "New Arrivals",
  "Electronics",
  "Clothing",
  "Home & Kitchen",
  "Sports",
  "Beauty",
  "Sale",
];

interface HeaderProps {
  cartCount: number;
  wishlistCount: number;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  onCartOpen: () => void;
  onWishlistOpen: () => void;
  activeCategory: string;
  onCategorySelect: (cat: string) => void;
}

export function Header({
  cartCount,
  wishlistCount,
  searchQuery,
  onSearchChange,
  onCartOpen,
  onWishlistOpen,
  activeCategory,
  onCategorySelect,
}: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (link: string) => {
    if (link === "New Arrivals" || link === "Sale") {
      onCategorySelect("");
    } else {
      const catMap: Record<string, string> = {
        Electronics: "Electronics",
        Clothing: "Clothing",
        "Home & Kitchen": "Home Decor",
        Sports: "Sports",
        Beauty: "Beauty",
      };
      onCategorySelect(catMap[link] ?? "");
    }
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-card border-b border-border shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center gap-4 h-16">
          {/* Logo */}
          <button
            type="button"
            onClick={() => onCategorySelect("")}
            className="flex-shrink-0"
            data-ocid="header.link"
          >
            <span className="text-2xl font-extrabold tracking-tight text-brand">
              Shop<span className="text-brand-dark">Easy</span>
            </span>
          </button>

          {/* Desktop Nav */}
          <nav
            className="hidden lg:flex items-center gap-1 flex-1 justify-center"
            aria-label="Main navigation"
          >
            {NAV_LINKS.map((link) => {
              const catKey = link === "Home & Kitchen" ? "Home Decor" : link;
              const isActive =
                link !== "New Arrivals" &&
                link !== "Sale" &&
                activeCategory === catKey;
              return (
                <button
                  type="button"
                  key={link}
                  onClick={() => handleNavClick(link)}
                  className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${
                    isActive
                      ? "text-brand bg-brand/10"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted"
                  }`}
                  data-ocid="header.tab"
                >
                  {link}
                </button>
              );
            })}
          </nav>

          {/* Search */}
          <div className="hidden md:flex items-center flex-1 max-w-sm relative">
            <Search className="absolute left-3 h-4 w-4 text-muted-foreground pointer-events-none" />
            <Input
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search products…"
              className="pl-9 rounded-full border-border bg-muted/50 text-sm"
              data-ocid="header.search_input"
            />
          </div>

          {/* Right icons */}
          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={onWishlistOpen}
              className="relative p-2 rounded-full hover:bg-muted transition-colors"
              aria-label="Wishlist"
              data-ocid="header.wishlist_button"
            >
              <Heart className="h-5 w-5 text-foreground" />
              {wishlistCount > 0 && (
                <Badge className="absolute -top-0.5 -right-0.5 h-4 w-4 p-0 flex items-center justify-center text-[10px] bg-brand text-white border-0">
                  {wishlistCount}
                </Badge>
              )}
            </button>

            <button
              type="button"
              onClick={onCartOpen}
              className="relative p-2 rounded-full hover:bg-muted transition-colors"
              aria-label="Shopping cart"
              data-ocid="header.cart_button"
            >
              <ShoppingCart className="h-5 w-5 text-foreground" />
              {cartCount > 0 && (
                <Badge className="absolute -top-0.5 -right-0.5 h-4 w-4 p-0 flex items-center justify-center text-[10px] bg-brand text-white border-0">
                  {cartCount}
                </Badge>
              )}
            </button>

            <Button
              onClick={onCartOpen}
              className="hidden sm:flex bg-brand hover:bg-brand-dark text-white rounded-full px-4 text-sm font-semibold"
              data-ocid="header.checkout_button"
            >
              Checkout
            </Button>

            <button
              type="button"
              className="lg:hidden p-2 rounded-full hover:bg-muted"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Menu"
              data-ocid="header.menu_button"
            >
              {mobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile search */}
        <div className="md:hidden pb-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
            <Input
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search products…"
              className="pl-9 rounded-full"
              data-ocid="header.search_input"
            />
          </div>
        </div>
      </div>

      {/* Mobile nav dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-border bg-card px-4 pb-4">
          <nav className="flex flex-col gap-1 pt-2">
            {NAV_LINKS.map((link) => (
              <button
                type="button"
                key={link}
                onClick={() => handleNavClick(link)}
                className="text-left px-3 py-2 text-sm font-medium rounded-md hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
                data-ocid="header.tab"
              >
                {link}
              </button>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
