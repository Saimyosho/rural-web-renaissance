import { useState, useEffect } from "react";
import { ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "./ui/button";

const StickyCTA = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show after scrolling past hero (assuming hero is ~100vh)
      const heroHeight = window.innerHeight;
      const scrolled = window.scrollY > heroHeight - 100;
      
      setIsVisible(scrolled);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Check initial state

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToContact = () => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -100, opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="fixed top-20 left-0 right-0 z-[90] pointer-events-none"
        >
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto">
              <motion.div 
                className="glass-strong rounded-full px-6 py-3 shadow-xl border border-border/20 pointer-events-auto backdrop-blur-xl"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <div className="flex items-center justify-between gap-4">
                  <div className="flex-1 hidden sm:block">
                    <p className="text-sm font-medium">
                      <span className="text-primary">Ready to start?</span>
                      <span className="text-muted-foreground ml-2">Get your free website in 7 days</span>
                    </p>
                  </div>
                  <div className="flex-1 sm:hidden">
                    <p className="text-sm font-medium text-primary">
                      Get Your Free Website
                    </p>
                  </div>
                  <Button
                    onClick={scrollToContact}
                    size="sm"
                    className="bg-gradient-to-r from-primary to-bridge hover:shadow-glow transition-all duration-300 group flex-shrink-0"
                    id="sticky-cta"
                  >
                    <span className="flex items-center gap-2">
                      Start Free
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </Button>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default StickyCTA;
