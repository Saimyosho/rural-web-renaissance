import { useState } from "react";
import { motion } from "framer-motion";
import { Loader2, Check, Sparkles } from "lucide-react";

const ButtonShowcase = () => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleClick = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 2000);
    }, 2000);
  };

  return (
    <div className="flex flex-col gap-6 items-center justify-center w-full">
      {/* Magnetic Button */}
      <div className="text-center">
        <p className="text-xs text-muted-foreground mb-2">Magnetic (hover me)</p>
        <motion.button
          className="px-6 py-3 rounded-full bg-gradient-to-r from-primary to-primary-glow text-white font-semibold"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Hover Effect
        </motion.button>
      </div>

      {/* Ripple/Glow Button */}
      <div className="text-center">
        <p className="text-xs text-muted-foreground mb-2">Glow on hover</p>
        <button className="px-6 py-3 rounded-full glass border-2 border-primary/30 font-semibold hover:shadow-glow hover:border-primary transition-all duration-300">
          Glow Button
        </button>
      </div>

      {/* Loading Button */}
      <div className="text-center">
        <p className="text-xs text-muted-foreground mb-2">Loading state</p>
        <motion.button
          onClick={handleClick}
          disabled={loading || success}
          className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 flex items-center gap-2 ${
            success
              ? "bg-green-500 text-white"
              : loading
              ? "bg-primary/50 text-white cursor-not-allowed"
              : "bg-gradient-to-r from-accent to-accent-glow text-white hover:shadow-glow"
          }`}
          whileHover={!loading && !success ? { scale: 1.05 } : {}}
          whileTap={!loading && !success ? { scale: 0.95 } : {}}
        >
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Loading...
            </>
          ) : success ? (
            <>
              <Check className="w-4 h-4" />
              Success!
            </>
          ) : (
            <>
              <Sparkles className="w-4 h-4" />
              Click Me
            </>
          )}
        </motion.button>
      </div>

      {/* Animated Gradient Button */}
      <div className="text-center">
        <p className="text-xs text-muted-foreground mb-2">Animated gradient</p>
        <button className="relative px-6 py-3 rounded-full font-semibold text-white overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 animate-gradient-x"></div>
          <span className="relative z-10">Gradient Animation</span>
        </button>
      </div>
    </div>
  );
};

export default ButtonShowcase;
