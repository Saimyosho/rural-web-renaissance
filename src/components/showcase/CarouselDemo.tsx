import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

const CarouselDemo = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const slides = [
    {
      title: "Slide 1",
      description: "Beautiful image carousel",
      gradient: "from-blue-500 to-purple-500",
    },
    {
      title: "Slide 2",
      description: "Smooth transitions",
      gradient: "from-purple-500 to-pink-500",
    },
    {
      title: "Slide 3",
      description: "Auto-play support",
      gradient: "from-pink-500 to-orange-500",
    },
  ];

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <div className="w-full max-w-md mx-auto relative">
      <div className="relative h-48 rounded-xl overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.3 }}
            className={`absolute inset-0 bg-gradient-to-br ${slides[currentIndex].gradient} flex flex-col items-center justify-center text-white`}
          >
            <h3 className="text-2xl font-bold mb-2">{slides[currentIndex].title}</h3>
            <p className="text-sm opacity-90">{slides[currentIndex].description}</p>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-between mt-4">
        <button
          onClick={prevSlide}
          className="p-2 rounded-full glass hover:bg-primary/10 transition-colors"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        {/* Dots */}
        <div className="flex gap-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-2 h-2 rounded-full transition-all ${
                index === currentIndex
                  ? "bg-primary w-8"
                  : "bg-muted-foreground/30"
              }`}
            />
          ))}
        </div>

        <button
          onClick={nextSlide}
          className="p-2 rounded-full glass hover:bg-primary/10 transition-colors"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default CarouselDemo;
