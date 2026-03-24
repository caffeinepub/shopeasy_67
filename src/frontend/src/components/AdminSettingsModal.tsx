import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  CheckCircle2,
  KeyRound,
  Loader2,
  Settings,
  XCircle,
} from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useActor } from "../hooks/useActor";

interface AdminSettingsModalProps {
  open: boolean;
  onClose: () => void;
}

export function AdminSettingsModal({ open, onClose }: AdminSettingsModalProps) {
  const { actor } = useActor();
  const [isConfigured, setIsConfigured] = useState<boolean | null>(null);
  const [secretKey, setSecretKey] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [isChecking, setIsChecking] = useState(false);

  useEffect(() => {
    if (open && actor) {
      setIsChecking(true);
      actor
        .isStripeConfigured()
        .then(setIsConfigured)
        .catch(() => setIsConfigured(false))
        .finally(() => setIsChecking(false));
    }
  }, [open, actor]);

  const handleSave = async () => {
    if (!secretKey.trim()) {
      toast.error("Please enter your Stripe secret key.");
      return;
    }
    if (!actor) {
      toast.error("Not connected. Please refresh and try again.");
      return;
    }
    setIsSaving(true);
    try {
      await actor.setStripeConfiguration({
        secretKey: secretKey.trim(),
        allowedCountries: ["US"],
      });
      setIsConfigured(true);
      setSecretKey("");
      toast.success("Stripe configuration saved successfully!");
    } catch (err) {
      console.error("Failed to save Stripe config:", err);
      toast.error("Failed to save configuration. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent className="max-w-md" data-ocid="admin.dialog">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-lg font-bold">
            <Settings className="h-5 w-5" />
            Admin Settings
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 py-2">
          {/* Stripe Status */}
          <div className="bg-muted/40 rounded-xl p-4">
            <h4 className="font-semibold text-sm mb-3 flex items-center gap-2">
              <KeyRound className="h-4 w-4" />
              Stripe Payment Status
            </h4>
            {isChecking ? (
              <div
                className="flex items-center gap-2 text-muted-foreground text-sm"
                data-ocid="admin.loading_state"
              >
                <Loader2 className="h-4 w-4 animate-spin" />
                Checking configuration...
              </div>
            ) : isConfigured === true ? (
              <div
                className="flex items-center gap-2 text-green-600 text-sm"
                data-ocid="admin.success_state"
              >
                <CheckCircle2 className="h-4 w-4" />
                Stripe is configured and active
              </div>
            ) : (
              <div
                className="flex items-center gap-2 text-destructive text-sm"
                data-ocid="admin.error_state"
              >
                <XCircle className="h-4 w-4" />
                Stripe is not configured
              </div>
            )}
          </div>

          {/* Set Secret Key */}
          <div className="space-y-3">
            <h4 className="font-semibold text-sm">
              {isConfigured
                ? "Update Stripe Secret Key"
                : "Set Stripe Secret Key"}
            </h4>
            <p className="text-xs text-muted-foreground">
              Enter your Stripe secret key (starts with{" "}
              <code className="bg-muted px-1 rounded text-xs">sk_</code>). Get
              it from your{" "}
              <a
                href="https://dashboard.stripe.com/apikeys"
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-foreground"
              >
                Stripe Dashboard
              </a>
              .
            </p>
            <div className="space-y-1">
              <Label htmlFor="stripe-key">Secret Key</Label>
              <Input
                id="stripe-key"
                type="password"
                value={secretKey}
                onChange={(e) => setSecretKey(e.target.value)}
                placeholder="sk_live_..."
                data-ocid="admin.input"
              />
            </div>
          </div>

          <div className="flex gap-3">
            <Button
              variant="outline"
              onClick={onClose}
              className="flex-1"
              data-ocid="admin.cancel_button"
            >
              Close
            </Button>
            <Button
              onClick={handleSave}
              disabled={isSaving || !secretKey.trim()}
              className="flex-1 bg-brand hover:bg-brand-dark text-white"
              data-ocid="admin.save_button"
            >
              {isSaving ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Saving...
                </>
              ) : (
                "Save Configuration"
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
