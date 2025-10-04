import { motion } from "framer-motion";

const MarqueeDemo = () => {
  const items = [
    "🚀 Fast Loading",
    "✨ Modern Design",
    "📱 Mobile Responsive",
    "🔒 Secure",
    "⚡ High Performance",
    "🎨 Custom Branding",
  ];

  return (
    <div className="w-full overflow-hidden">
      <div className="relative flex overflow-hidden">
        {/* First set */}
        <motion.div
          className="flex gap-8 whitespace-nowrap"
          animate={{
            x: [0, -1000],
          }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: "loop",
              duration: 20,
              ease: "linear",
            },
          }}
        >
          {[...items, ...items].map((item, index) => (
            <div
              key={`set1-${index}`}
              className="px-6 py-3 rounded-full glass border-2 border-primary/30 font-semibold text-lg"
            >
              {item}
            </div>
          ))}
        </motion.div>

        {/* Second set for seamless loop */}
        <motion.div
          className="flex gap-8 whitespace-nowrap absolute left-[1000px]"
          animate={{
            x: [0, -1000],
          }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: "loop",
              duration: 20,
              ease: "linear",
            },
          }}
        >
          {[...items, ...items].map((item, index) => (
            <div
              key={`set2-${index}`}
              className="px-6 py-3 rounded-full glass border-2 border-primary/30 font-semibold text-lg"
            >
              {item}
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default MarqueeDemo;
