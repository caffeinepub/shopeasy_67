import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Headphones, RotateCcw, ShieldCheck, Truck } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const BENEFITS = [
  { icon: Truck, title: "Fast Shipping", desc: "Free on orders $75+" },
  {
    icon: ShieldCheck,
    title: "Secure Payments",
    desc: "256-bit SSL encrypted",
  },
  { icon: RotateCcw, title: "Easy Returns", desc: "30-day hassle-free" },
  { icon: Headphones, title: "24/7 Support", desc: "Always here to help" },
];

export function NewsletterSection() {
  const [email, setEmail] = useState("");

  const handleSignup = () => {
    if (!email.trim() || !email.includes("@")) {
      toast.error("Please enter a valid email address.");
      return;
    }
    toast.success("You're subscribed! Welcome to the ShopEasy community 🎉");
    setEmail("");
  };

  return (
    <section className="py-14 bg-muted/30 border-y border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid md:grid-cols-2 gap-10 lg:gap-20 items-center">
          {/* Newsletter */}
          <div>
            <h3 className="text-xl font-bold text-foreground mb-2">
              Join Our Community
            </h3>
            <p className="text-muted-foreground mb-5 text-sm">
              Get exclusive deals, new arrivals, and style inspiration delivered
              to your inbox.
            </p>
            <div className="flex gap-2">
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSignup()}
                placeholder="Enter your email…"
                className="rounded-full flex-1"
                data-ocid="newsletter.input"
              />
              <Button
                onClick={handleSignup}
                className="bg-brand hover:bg-brand-dark text-white rounded-full px-6 font-semibold"
                data-ocid="newsletter.submit_button"
              >
                Sign up
              </Button>
            </div>
          </div>

          {/* Benefits */}
          <div>
            <h3 className="text-xl font-bold text-foreground mb-5">
              Why Shop With Us?
            </h3>
            <div className="grid grid-cols-2 gap-4">
              {BENEFITS.map((b) => (
                <div key={b.title} className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-brand/10 flex items-center justify-center flex-shrink-0">
                    <b.icon className="h-4 w-4 text-brand" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground">
                      {b.title}
                    </p>
                    <p className="text-xs text-muted-foreground">{b.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
