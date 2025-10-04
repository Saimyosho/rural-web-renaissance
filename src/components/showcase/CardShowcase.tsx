import { useState } from "react";
import { motion } from "framer-motion";
import { Sparkles, Code, Zap } from "lucide-react";
import TiltCard from "../TiltCard";

const CardShowcase = () => {
  const [flippedCard, setFlippedCard] = useState<number | null>(null);

  const cards = [
    {
      icon: <Sparkles className="w-6 h-6" />,
      title: "3D Tilt",
      front: "Hover for 3D effect",
      back: "Mouse-responsive tilt creates depth",
      gradient: "from-primary to-primary-glow",
    },
    {
      icon: <Code className="w-6 h-6" />,
      title: "Flip Card",
      front: "Click to flip",
      back: "Perfect for before/after or info reveals",
      gradient: "from-accent to-accent-glow",
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Hover Zoom",
      front: "Hover me",
      back: "Great for image galleries",
      gradient: "from-purple-500 to-pink-500",
    },
  ];

  return (
    <div className="grid grid-cols-3 gap-4 w-full">
      {cards.map((card, index) => (
        <div key={index} className="perspective-1000">
          {index === 0 ? (
            // 3D Tilt Card
            <TiltCard
              className="glass rounded-xl p-6 h-full"
              intensity={15}
              glare={true}
            >
              <div className={`inline-flex p-3 rounded-lg bg-gradient-to-br ${card.gradient} text-white mb-3`}>
                {card.icon}
              </div>
              <h4 className="font-bold mb-2 text-sm">{card.title}</h4>
              <p className="text-xs text-muted-foreground">{card.front}</p>
            </TiltCard>
          ) : (
            // Flip Card
            <motion.div
              className="relative h-full cursor-pointer"
              onClick={() => setFlippedCard(flippedCard === index ? null : index)}
              style={{ transformStyle: "preserve-3d" }}
              animate={{ rotateY: flippedCard === index ? 180 : 0 }}
              transition={{ duration: 0.6 }}
            >
              {/* Front */}
              <div
                className="absolute inset-0 glass rounded-xl p-6 backface-hidden"
                style={{ backfaceVisibility: "hidden" }}
              >
                <div className={`inline-flex p-3 rounded-lg bg-gradient-to-br ${card.gradient} text-white mb-3`}>
                  {card.icon}
                </div>
                <h4 className="font-bold mb-2 text-sm">{card.title}</h4>
                <p className="text-xs text-muted-foreground">{card.front}</p>
              </div>

              {/* Back */}
              <div
                className="absolute inset-0 glass rounded-xl p-6 backface-hidden"
                style={{
                  backfaceVisibility: "hidden",
                  transform: "rotateY(180deg)",
                }}
              >
                <div className={`inline-flex p-3 rounded-lg bg-gradient-to-br ${card.gradient} text-white mb-3`}>
                  {card.icon}
                </div>
                <h4 className="font-bold mb-2 text-sm">{card.title}</h4>
                <p className="text-xs text-muted-foreground">{card.back}</p>
              </div>
            </motion.div>
          )}
        </div>
      ))}
    </div>
  );
};

export default CardShowcase;
