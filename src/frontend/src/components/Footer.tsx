import { Settings } from "lucide-react";
import { SiFacebook, SiInstagram, SiPinterest, SiX } from "react-icons/si";

const LINKS = {
  "Customer Care": [
    "Help Center",
    "Track Order",
    "Returns & Exchanges",
    "Contact Us",
  ],
  About: ["Our Story", "Sustainability", "Careers", "Press"],
  Shop: ["New Arrivals", "Best Sellers", "Sale", "Gift Cards"],
};

interface FooterProps {
  isAdmin?: boolean;
  onAdminClick?: () => void;
}

export function Footer({ isAdmin, onAdminClick }: FooterProps) {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-brand-dark text-white/80" aria-label="Site footer">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="col-span-2 md:col-span-1">
            <span className="text-2xl font-extrabold text-white tracking-tight">
              Shop<span className="text-teal-300">Easy</span>
            </span>
            <p className="text-sm mt-3 leading-relaxed text-white/60">
              Curated picks for modern living. Quality products at fair prices.
            </p>
            <div className="flex gap-3 mt-5">
              {[
                { Icon: SiFacebook, label: "Facebook" },
                { Icon: SiInstagram, label: "Instagram" },
                { Icon: SiX, label: "X" },
                { Icon: SiPinterest, label: "Pinterest" },
              ].map(({ Icon, label }) => (
                <button
                  type="button"
                  key={label}
                  aria-label={label}
                  className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
                  data-ocid="footer.link"
                >
                  <Icon className="h-4 w-4" />
                </button>
              ))}
            </div>
          </div>

          {Object.entries(LINKS).map(([heading, links]) => (
            <div key={heading}>
              <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">
                {heading}
              </h4>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link}>
                    <button
                      type="button"
                      className="text-sm text-white/60 hover:text-white transition-colors"
                      data-ocid="footer.link"
                    >
                      {link}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-white/10 mt-10 pt-8 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs text-white/40 mr-2">We accept:</span>
            {["VISA", "MC", "AMEX", "Stripe"].map((card) => (
              <span
                key={card}
                className="bg-white/10 text-white/70 text-xs px-2.5 py-1 rounded-md font-semibold"
              >
                {card}
              </span>
            ))}
          </div>
          <div className="flex items-center gap-4">
            {isAdmin && (
              <button
                type="button"
                onClick={onAdminClick}
                className="flex items-center gap-1.5 text-xs text-white/40 hover:text-white/70 transition-colors"
                data-ocid="admin.open_modal_button"
              >
                <Settings className="h-3.5 w-3.5" />
                Admin Settings
              </button>
            )}
            <p className="text-xs text-white/40">
              © {year}. Built with ❤️ using{" "}
              <a
                href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "")}`}
                className="hover:text-white/70 underline transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                caffeine.ai
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
