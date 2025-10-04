import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Sparkles, Zap, Star } from "lucide-react";

const AnimationShowcase = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: false, amount: 0.3 });

  const items = [
    {
      icon: <Sparkles className="w-6 h-6" />,
      title: "Fade In",
      animation: { opacity: inView ? 1 : 0 },
      delay: 0,
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Slide Up",
      animation: { opacity: inView ? 1 : 0, y: inView ? 0 : 30 },
      delay: 0.2,
    },
    {
      icon: <Star className="w-6 h-6" />,
      title: "Scale",
      animation: { opacity: inView ? 1 : 0, scale: inView ? 1 : 0.8 },
      delay: 0.4,
    },
  ];

  return (
    <div ref={ref} className="w-full space-y-6">
      <p className="text-xs text-muted-foreground text-center mb-4">
        Scroll up and down to see animations trigger
      </p>

      {/* Staggered Animations */}
      <div className="grid grid-cols-3 gap-4">
        {items.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            animate={item.animation}
            transition={{
              duration: 0.6,
              delay: item.delay,
            }}
            className="glass rounded-xl p-4 text-center"
          >
            <div className="inline-flex p-3 rounded-lg bg-gradient-to-br from-primary to-primary-glow text-white mb-2">
              {item.icon}
            </div>
            <p className="text-sm font-semibold">{item.title}</p>
          </motion.div>
        ))}
      </div>

      {/* Progress Bar Animation */}
      <div className="space-y-2">
        <p className="text-xs text-muted-foreground">Progress bar animation</p>
        <div className="h-2 glass rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-primary to-primary-glow"
            initial={{ width: 0 }}
            animate={{ width: inView ? "75%" : 0 }}
            transition={{ duration: 1, delay: 0.2 }}
          />
        </div>
      </div>

      {/* Counter Animation */}
      <div className="glass rounded-xl p-6 text-center">
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={inView ? { scale: 1, opacity: 1 } : { scale: 0.5, opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl font-bold gradient-text"
        >
          {inView ? "100%" : "0%"}
        </motion.div>
        <p className="text-sm text-muted-foreground mt-2">Animated counter</p>
      </div>

      {/* Rotating Element */}
      <div className="flex justify-center">
        <motion.div
          animate={{
            rotate: inView ? 360 : 0,
          }}
          transition={{
            duration: 2,
            repeat: inView ? Infinity : 0,
            ease: "linear",
          }}
          className="w-12 h-12 rounded-lg bg-gradient-to-br from-accent to-accent-glow flex items-center justify-center text-white"
        >
          <Sparkles className="w-6 h-6" />
        </motion.div>
      </div>
    </div>
  );
};

export default AnimationShowcase;
