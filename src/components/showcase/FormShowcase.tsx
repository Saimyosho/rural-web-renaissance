import { useState } from "react";
import { motion } from "framer-motion";
import { Input } from "../ui/input";
import { Check, X } from "lucide-react";

const FormShowcase = () => {
  const [email, setEmail] = useState("");
  const [focused, setFocused] = useState(false);
  const [validation, setValidation] = useState<"valid" | "invalid" | null>(null);

  const validateEmail = (value: string) => {
    if (!value) {
      setValidation(null);
      return;
    }
    const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
    setValidation(isValid ? "valid" : "invalid");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);
    validateEmail(value);
  };

  return (
    <div className="w-full max-w-md mx-auto space-y-6">
      {/* Floating Label Input */}
      <div className="relative">
        <motion.label
          className={`absolute left-3 transition-all duration-200 pointer-events-none ${
            focused || email
              ? "top-0 text-xs text-primary bg-background px-1"
              : "top-1/2 -translate-y-1/2 text-muted-foreground"
          }`}
          animate={{
            y: focused || email ? -12 : 0,
            fontSize: focused || email ? "0.75rem" : "1rem",
          }}
        >
          Email Address
        </motion.label>
        <div className="relative">
          <Input
            type="email"
            value={email}
            onChange={handleChange}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            className={`glass border-2 transition-colors ${
              validation === "valid"
                ? "border-green-500"
                : validation === "invalid"
                ? "border-red-500"
                : focused
                ? "border-primary"
                : "border-border"
            }`}
          />
          {validation && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className={`absolute right-3 top-1/2 -translate-y-1/2 ${
                validation === "valid" ? "text-green-500" : "text-red-500"
              }`}
            >
              {validation === "valid" ? (
                <Check className="w-5 h-5" />
              ) : (
                <X className="w-5 h-5" />
              )}
            </motion.div>
          )}
        </div>
        {validation === "invalid" && email && (
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-xs text-red-500 mt-1 ml-1"
          >
            Please enter a valid email address
          </motion.p>
        )}
      </div>

      {/* Multi-step Progress */}
      <div className="space-y-3">
        <p className="text-xs text-muted-foreground text-center">Multi-step wizard example</p>
        <div className="flex items-center gap-2">
          {[1, 2, 3, 4].map((step, index) => (
            <div key={step} className="flex items-center flex-1">
              <div
                className={`flex items-center justify-center w-8 h-8 rounded-full font-semibold text-sm transition-all ${
                  index < 2
                    ? "bg-gradient-to-r from-primary to-primary-glow text-white"
                    : "glass text-muted-foreground"
                }`}
              >
                {index < 2 ? <Check className="w-4 h-4" /> : step}
              </div>
              {index < 3 && (
                <div
                  className={`flex-1 h-1 mx-1 rounded ${
                    index < 2 ? "bg-primary" : "bg-border"
                  }`}
                />
              )}
            </div>
          ))}
        </div>
        <div className="text-center">
          <span className="text-sm font-semibold">Step 3 of 4</span>
          <p className="text-xs text-muted-foreground">Payment Information</p>
        </div>
      </div>

      {/* Success State */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass rounded-xl p-4 border-2 border-green-500/30 bg-green-500/5"
      >
        <div className="flex items-center gap-3">
          <div className="flex-shrink-0 w-10 h-10 rounded-full bg-green-500 flex items-center justify-center text-white">
            <Check className="w-6 h-6" />
          </div>
          <div>
            <p className="font-semibold text-sm">Form submitted successfully!</p>
            <p className="text-xs text-muted-foreground">We'll get back to you soon.</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default FormShowcase;
