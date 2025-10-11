import { useState, useEffect } from "react";
import { X, Mail, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

const NewsletterPopup = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    // Check if user has already dismissed or subscribed
    const dismissed = localStorage.getItem("newsletter-dismissed");
    const subscribed = localStorage.getItem("newsletter-subscribed");
    
    if (dismissed || subscribed) {
      return;
    }

    // Exit-intent detection
    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0) {
        setIsVisible(true);
      }
    };

    // Backup trigger: after 45 seconds + 50% scroll
    let scrollTriggered = false;
    let timeTriggered = false;

    const checkTriggers = () => {
      if (scrollTriggered && timeTriggered && !isVisible) {
        setIsVisible(true);
      }
    };

    const handleScroll = () => {
      const scrollPercent = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
      if (scrollPercent > 50) {
        scrollTriggered = true;
        checkTriggers();
      }
    };

    const timer = setTimeout(() => {
      timeTriggered = true;
      checkTriggers();
    }, 45000);

    document.addEventListener("mouseleave", handleMouseLeave);
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      document.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(timer);
    };
  }, [isVisible]);

  const handleClose = () => {
    setIsVisible(false);
    localStorage.setItem("newsletter-dismissed", "true");
  };

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateEmail(email)) {
      setStatus("error");
      setErrorMessage("Please enter a valid email address");
      return;
    }

    setIsSubmitting(true);
    setStatus("idle");

    try {
      const response = await fetch("/api/newsletter-signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, source: "exit-popup" }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Failed to subscribe");
      }

      setStatus("success");
      localStorage.setItem("newsletter-subscribed", "true");
      
      // Close after 3 seconds on success
      setTimeout(() => {
        setIsVisible(false);
      }, 3000);
    } catch (error) {
      setStatus("error");
      setErrorMessage(error instanceof Error ? error.message : "Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[200]"
            onClick={handleClose}
          />

          {/* Popup */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[201] w-[95%] max-w-2xl max-h-[90vh] overflow-y-auto"
          >
            <div className="glass-strong rounded-2xl p-6 md:p-8 shadow-2xl border border-border/20 relative">
              {/* Close button */}
              <button
                onClick={handleClose}
                className="absolute top-4 right-4 p-2 rounded-full hover:bg-muted/20 transition-colors"
                aria-label="Close popup"
              >
                <X className="w-5 h-5" />
              </button>

              {status === "success" ? (
                // Success state
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center py-8"
                >
                  <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Sparkles className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-2xl font-bold mb-2">Welcome to the Club! 🎉</h3>
                  <p className="text-muted-foreground mb-4">
                    Check your inbox for a welcome email with your first AI guide.
                  </p>
                  <p className="text-sm text-muted-foreground">
                    You're now part of 50+ Johnstown businesses getting the edge.
                  </p>
                </motion.div>
              ) : (
                // Form state
                <>
                  {/* Header */}
                  <div className="text-center mb-6">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-4">
                      <Mail className="w-4 h-4" />
                      <span>Johnstown Business Newsletter</span>
                    </div>
                    <h2 className="text-2xl md:text-3xl font-bold mb-3">
                      📍 Johnstown Business Owner?
                    </h2>
                    <p className="text-lg text-muted-foreground mb-2">
                      You're competing against Pittsburgh with a fraction of their resources...
                    </p>
                    <p className="text-xl font-semibold gradient-text">
                      Until Now. 🚀
                    </p>
                  </div>

                  <div className="border-t border-b border-border/20 py-4 mb-6">
                    <p className="text-center text-sm text-muted-foreground mb-4">
                      Join 50+ local businesses getting:
                    </p>

                    <div className="space-y-3">
                      <div className="flex items-start gap-3">
                        <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <span className="text-primary text-xs">✓</span>
                        </div>
                        <p className="text-sm">
                          <span className="font-semibold">AI tools that big cities pay $1000s for</span>
                          <span className="text-muted-foreground"> (You get them FREE or cheap)</span>
                        </p>
                      </div>

                      <div className="flex items-start gap-3">
                        <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <span className="text-primary text-xs">✓</span>
                        </div>
                        <p className="text-sm">
                          <span className="font-semibold">Real Johnstown success stories</span>
                          <span className="text-muted-foreground"> (Maria's Salon, Joe's Pizza, etc.)</span>
                        </p>
                      </div>

                      <div className="flex items-start gap-3">
                        <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <span className="text-primary text-xs">✓</span>
                        </div>
                        <p className="text-sm">
                          <span className="font-semibold">Step-by-step guides for YOUR business</span>
                          <span className="text-muted-foreground"> (Restaurants, salons, shops, services)</span>
                        </p>
                      </div>

                      <div className="flex items-start gap-3">
                        <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <span className="text-primary text-xs">✓</span>
                        </div>
                        <p className="text-sm">
                          <span className="font-semibold">What's working in Cambria County</span>
                          <span className="text-muted-foreground"> (Local data, not generic advice)</span>
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Preview box */}
                  <div className="bg-muted/30 rounded-lg p-4 mb-6">
                    <p className="text-xs text-muted-foreground mb-1">📧 Next Issue (Nov 2025):</p>
                    <p className="text-sm font-semibold">
                      "How 3 Main Street Shops Automated Their Busiest Holiday Season"
                    </p>
                  </div>

                  {/* Form */}
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <Input
                        type="email"
                        placeholder="your@business-email.com"
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value);
                          setStatus("idle");
                        }}
                        className="h-12 text-base"
                        disabled={isSubmitting}
                        required
                      />
                      {status === "error" && (
                        <p className="text-sm text-red-500 mt-2">{errorMessage}</p>
                      )}
                    </div>

                    <Button
                      type="submit"
                      size="lg"
                      className="w-full bg-gradient-to-r from-primary to-bridge hover:shadow-glow transition-all duration-300 text-base"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <span className="flex items-center gap-2">
                          <span className="animate-spin">⏳</span>
                          Subscribing...
                        </span>
                      ) : (
                        "Get Johnstown's AI Edge →"
                      )}
                    </Button>
                  </form>

                  {/* Trust indicators */}
                  <div className="mt-6 text-center space-y-1">
                    <p className="text-xs text-muted-foreground">
                      ✓ Free forever • Johnstown-focused
                    </p>
                    <p className="text-xs text-muted-foreground">
                      ✓ No spam • Unsubscribe anytime • Real results
                    </p>
                  </div>
                </>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default NewsletterPopup;
