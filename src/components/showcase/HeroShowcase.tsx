import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Play, Sparkles, Star, Zap } from "lucide-react";

const HeroShowcase = () => {
  const [activeHero, setActiveHero] = useState(0);

  const heroStyles = [
    {
      id: "split-screen",
      title: "Split Screen Hero",
      description: "Image on one side, content on the other",
      component: (
        <div className="grid md:grid-cols-2 gap-6 h-full items-center">
          <div className="space-y-4">
            <h1 className="text-3xl font-bold gradient-text">Your Brand Name</h1>
            <p className="text-sm text-muted-foreground">
              Compelling tagline that makes visitors want to learn more about your business
            </p>
            <button className="px-6 py-2 rounded-full bg-gradient-to-r from-primary to-primary-glow text-white text-sm font-semibold">
              Get Started
            </button>
          </div>
          <div className="h-40 rounded-xl bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-semibold">
            Hero Image
          </div>
        </div>
      ),
    },
    {
      id: "centered-minimal",
      title: "Centered Minimal",
      description: "Clean, focused, single message",
      component: (
        <div className="text-center space-y-6 py-8">
          <h1 className="text-4xl font-bold gradient-text">
            Simple. Powerful. Effective.
          </h1>
          <p className="text-sm text-muted-foreground max-w-md mx-auto">
            One clear message that captures attention and drives action
          </p>
          <div className="flex gap-3 justify-center">
            <button className="px-6 py-2 rounded-full bg-gradient-to-r from-primary to-primary-glow text-white text-sm font-semibold">
              Primary CTA
            </button>
            <button className="px-6 py-2 rounded-full glass border-2 border-primary/30 text-sm font-semibold">
              Learn More
            </button>
          </div>
        </div>
      ),
    },
    {
      id: "video-background",
      title: "Video/Animation Background",
      description: "Animated background with overlay content",
      component: (
        <div className="relative h-full rounded-xl overflow-hidden">
          {/* Animated background simulation */}
          <div className="absolute inset-0">
            <motion.div
              className="w-full h-full bg-gradient-to-br from-purple-500 via-pink-500 to-orange-500"
              animate={{
                backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"],
              }}
              transition={{
                duration: 10,
                repeat: Infinity,
                ease: "linear",
              }}
              style={{ backgroundSize: "200% 200%" }}
            />
          </div>
          {/* Content overlay */}
          <div className="relative z-10 h-full flex flex-col items-center justify-center text-center p-8 bg-black/40">
            <Play className="w-12 h-12 text-white mb-4" />
            <h1 className="text-3xl font-bold text-white mb-2">
              Watch Our Story
            </h1>
            <p className="text-sm text-white/90">
              Immersive video background experience
            </p>
          </div>
        </div>
      ),
    },
    {
      id: "illustration-hero",
      title: "Illustration/Graphics",
      description: "Custom illustrations or abstract shapes",
      component: (
        <div className="grid md:grid-cols-2 gap-6 h-full items-center">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-xs font-semibold">
              <Sparkles className="w-4 h-4 text-primary" />
              New Feature
            </div>
            <h1 className="text-3xl font-bold">
              Innovation Meets <span className="gradient-text">Design</span>
            </h1>
            <p className="text-sm text-muted-foreground">
              Modern abstract illustrations that represent your brand
            </p>
          </div>
          <div className="relative h-40">
            {/* Abstract shapes */}
            <motion.div
              className="absolute top-4 right-8 w-16 h-16 rounded-full bg-primary/20"
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
            />
            <motion.div
              className="absolute bottom-8 left-4 w-20 h-20 rounded-xl bg-accent/20 rotate-45"
              animate={{ rotate: [45, 65, 45] }}
              transition={{ duration: 4, repeat: Infinity }}
            />
            <motion.div
              className="absolute top-12 left-12 w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-lg"
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </div>
        </div>
      ),
    },
    {
      id: "carousel-hero",
      title: "Carousel/Slideshow",
      description: "Multiple hero messages or products",
      component: (
        <div className="relative h-full">
          <div className="h-full rounded-xl bg-gradient-to-br from-green-500 to-teal-500 p-6 flex flex-col justify-between text-white">
            <div>
              <h1 className="text-3xl font-bold mb-2">Featured Product #1</h1>
              <p className="text-sm opacity-90">
                Rotating showcase of your best offerings
              </p>
            </div>
            <div className="flex gap-2 justify-center">
              {[0, 1, 2].map((i) => (
                <div
                  key={i}
                  className={`w-2 h-2 rounded-full ${
                    i === 0 ? "bg-white" : "bg-white/30"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      ),
    },
    {
      id: "stats-hero",
      title: "Stats/Social Proof",
      description: "Numbers, testimonials, trust indicators",
      component: (
        <div className="space-y-6 text-center">
          <h1 className="text-3xl font-bold gradient-text">
            Trusted by Thousands
          </h1>
          <div className="grid grid-cols-3 gap-4">
            <div className="glass rounded-xl p-4">
              <div className="text-2xl font-bold gradient-text">500+</div>
              <div className="text-xs text-muted-foreground">Clients</div>
            </div>
            <div className="glass rounded-xl p-4">
              <div className="text-2xl font-bold gradient-text">99%</div>
              <div className="text-xs text-muted-foreground">Satisfaction</div>
            </div>
            <div className="glass rounded-xl p-4">
              <div className="text-2xl font-bold gradient-text">24/7</div>
              <div className="text-xs text-muted-foreground">Support</div>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: "gradient-mesh",
      title: "Gradient Mesh",
      description: "Modern gradient backgrounds",
      component: (
        <div className="relative h-full rounded-xl overflow-hidden">
          {/* Gradient mesh background */}
          <div className="absolute inset-0 bg-gradient-to-br from-pink-500/20 via-purple-500/20 to-blue-500/20">
            <motion.div
              className="absolute top-1/4 left-1/4 w-32 h-32 rounded-full bg-primary/30 blur-3xl"
              animate={{
                x: [0, 50, 0],
                y: [0, 30, 0],
              }}
              transition={{ duration: 8, repeat: Infinity }}
            />
            <motion.div
              className="absolute bottom-1/4 right-1/4 w-40 h-40 rounded-full bg-accent/30 blur-3xl"
              animate={{
                x: [0, -40, 0],
                y: [0, -20, 0],
              }}
              transition={{ duration: 10, repeat: Infinity }}
            />
          </div>
          {/* Content */}
          <div className="relative z-10 h-full flex flex-col items-center justify-center text-center p-8">
            <h1 className="text-3xl font-bold mb-2 gradient-text">
              Modern Aesthetic
            </h1>
            <p className="text-sm text-muted-foreground mb-4">
              Soft gradients create visual interest
            </p>
            <button className="px-6 py-2 rounded-full glass border-2 border-primary/30 text-sm font-semibold hover:bg-primary/10 transition-all">
              Explore
            </button>
          </div>
        </div>
      ),
    },
    {
      id: "product-focused",
      title: "Product Showcase",
      description: "Hero focused on main product/service",
      component: (
        <div className="grid md:grid-cols-2 gap-6 h-full items-center">
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-2">
              <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
              <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
              <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
              <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
              <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
              <span className="text-xs text-muted-foreground ml-2">4.9/5 (200+ reviews)</span>
            </div>
            <h1 className="text-3xl font-bold">Your Product Name</h1>
            <p className="text-sm text-muted-foreground">
              Highlight key features and benefits with social proof
            </p>
            <div className="flex items-center gap-3">
              <button className="px-6 py-2 rounded-full bg-gradient-to-r from-primary to-primary-glow text-white text-sm font-semibold flex items-center gap-2">
                Buy Now <ArrowRight className="w-4 h-4" />
              </button>
              <span className="text-xs text-muted-foreground">$99</span>
            </div>
          </div>
          <div className="h-40 rounded-xl bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center">
            <Zap className="w-16 h-16 text-white" />
          </div>
        </div>
      ),
    },
    {
      id: "glassmorphic",
      title: "Glassmorphic Hero",
      description: "Modern frosted glass effect with depth (Apple-style)",
      component: (
        <div className="relative h-full rounded-xl overflow-hidden">
          {/* Colorful background */}
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-500 via-blue-500 to-purple-600" />
          
          {/* Floating orbs */}
          <motion.div
            className="absolute top-10 right-10 w-32 h-32 rounded-full bg-pink-400/50 blur-2xl"
            animate={{ y: [0, 20, 0], scale: [1, 1.1, 1] }}
            transition={{ duration: 4, repeat: Infinity }}
          />
          <motion.div
            className="absolute bottom-10 left-10 w-40 h-40 rounded-full bg-yellow-400/40 blur-2xl"
            animate={{ y: [0, -15, 0], scale: [1, 1.15, 1] }}
            transition={{ duration: 5, repeat: Infinity }}
          />
          
          {/* Glass card */}
          <div className="relative z-10 h-full flex items-center justify-center p-8">
            <div className="glass-strong rounded-3xl p-8 max-w-md backdrop-blur-2xl bg-white/10 border border-white/20 shadow-2xl">
              <h1 className="text-3xl font-bold text-white mb-3">
                Glassmorphism
              </h1>
              <p className="text-white/90 text-sm mb-6">
                Frosted glass effect popular in iOS and modern design systems
              </p>
              <button className="px-6 py-2 rounded-full bg-white/20 backdrop-blur-sm text-white font-semibold border border-white/30 hover:bg-white/30 transition-all">
                Get Started
              </button>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: "particle-system",
      title: "Particle Animation",
      description: "Dynamic particle effects and floating elements",
      component: (
        <div className="relative h-full rounded-xl overflow-hidden bg-gradient-to-br from-indigo-900 to-purple-900">
          {/* Animated particles */}
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 rounded-full bg-white/60"
              style={{
                left: `${(i * 12) % 90}%`,
                top: `${(i * 15) % 80}%`,
              }}
              animate={{
                y: [0, -30, 0],
                x: [0, Math.sin(i) * 20, 0],
                opacity: [0.3, 1, 0.3],
              }}
              transition={{
                duration: 3 + i * 0.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          ))}
          
          {/* Content */}
          <div className="relative z-10 h-full flex flex-col items-center justify-center text-center p-8 text-white">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
            >
              <Sparkles className="w-12 h-12 mx-auto mb-4 text-cyan-300" />
              <h1 className="text-3xl font-bold mb-2">
                Particle Magic
              </h1>
              <p className="text-sm text-white/80">
                Floating particles create dynamic, engaging backgrounds
              </p>
            </motion.div>
          </div>
        </div>
      ),
    },
    {
      id: "3d-perspective",
      title: "3D Perspective Hero",
      description: "Depth and parallax with 3D transforms",
      component: (
        <div className="relative h-full rounded-xl overflow-hidden bg-gradient-to-br from-slate-900 to-slate-700">
          <div className="relative h-full flex items-center justify-center p-8" style={{ perspective: "1000px" }}>
            {/* Background layers */}
            <motion.div
              className="absolute inset-0 opacity-20"
              animate={{ rotateY: [0, 10, 0], rotateX: [0, 5, 0] }}
              transition={{ duration: 8, repeat: Infinity }}
              style={{ transformStyle: "preserve-3d" }}
            >
              <div className="absolute top-1/4 left-1/4 w-32 h-32 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500" style={{ transform: "translateZ(50px)" }} />
              <div className="absolute bottom-1/4 right-1/4 w-24 h-24 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500" style={{ transform: "translateZ(30px)" }} />
            </motion.div>
            
            {/* Content */}
            <motion.div
              className="relative z-10 text-center text-white"
              animate={{ rotateY: [0, -5, 0] }}
              transition={{ duration: 6, repeat: Infinity }}
              style={{ transformStyle: "preserve-3d", transform: "translateZ(100px)" }}
            >
              <h1 className="text-4xl font-bold mb-3">
                3D Depth
              </h1>
              <p className="text-sm text-white/90">
                Layers with perspective create immersive experiences
              </p>
            </motion.div>
          </div>
        </div>
      ),
    },
    {
      id: "morphing-shapes",
      title: "Morphing Shapes",
      description: "Organic shapes that morph and transform",
      component: (
        <div className="relative h-full rounded-xl overflow-hidden bg-gradient-to-br from-rose-400 via-fuchsia-500 to-indigo-600">
          {/* Morphing blob */}
          <motion.div
            className="absolute top-1/4 left-1/4 w-40 h-40 opacity-30"
            style={{
              background: "linear-gradient(45deg, #fff, #ffeb3b)",
              filter: "blur(40px)",
            }}
            animate={{
              borderRadius: [
                "60% 40% 30% 70% / 60% 30% 70% 40%",
                "30% 60% 70% 40% / 50% 60% 30% 60%",
                "60% 40% 30% 70% / 60% 30% 70% 40%",
              ],
              rotate: [0, 120, 0],
              scale: [1, 1.2, 1],
            }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          />
          
          <motion.div
            className="absolute bottom-1/4 right-1/4 w-48 h-48 opacity-30"
            style={{
              background: "linear-gradient(225deg, #4ade80, #06b6d4)",
              filter: "blur(40px)",
            }}
            animate={{
              borderRadius: [
                "30% 70% 70% 30% / 30% 30% 70% 70%",
                "70% 30% 30% 70% / 70% 70% 30% 30%",
                "30% 70% 70% 30% / 30% 30% 70% 70%",
              ],
              rotate: [0, -120, 0],
              scale: [1, 1.15, 1],
            }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          />
          
          {/* Content */}
          <div className="relative z-10 h-full flex items-center justify-center text-center p-8 text-white">
            <div>
              <h1 className="text-3xl font-bold mb-3">
                Organic Motion
              </h1>
              <p className="text-sm text-white/90 mb-4">
                Fluid, morphing shapes create visual interest
              </p>
              <button className="px-6 py-2 rounded-full bg-white/20 backdrop-blur-sm text-white font-semibold border border-white/30 hover:bg-white/30 transition-all">
                Explore
              </button>
            </div>
          </div>
        </div>
      ),
    },
  ];

  return (
    <div className="w-full space-y-6">
      {/* Style Selector */}
      <div className="flex flex-wrap gap-2 justify-center">
        {heroStyles.map((style, index) => (
          <button
            key={style.id}
            onClick={() => setActiveHero(index)}
            className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
              activeHero === index
                ? "bg-gradient-to-r from-primary to-primary-glow text-white"
                : "glass hover:bg-primary/10"
            }`}
          >
            {style.title}
          </button>
        ))}
      </div>

      {/* Hero Display */}
      <div className="glass-strong rounded-2xl p-6 min-h-[350px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeHero}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="h-full"
          >
            <div className="mb-4 pb-4 border-b border-border">
              <h3 className="font-bold text-lg mb-1">
                {heroStyles[activeHero].title}
              </h3>
              <p className="text-xs text-muted-foreground">
                {heroStyles[activeHero].description}
              </p>
            </div>
            {heroStyles[activeHero].component}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation Dots */}
      <div className="flex gap-2 justify-center">
        {heroStyles.map((_, index) => (
          <button
            key={index}
            onClick={() => setActiveHero(index)}
            className={`w-2 h-2 rounded-full transition-all ${
              activeHero === index
                ? "bg-primary w-8"
                : "bg-muted-foreground/30"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroShowcase;
