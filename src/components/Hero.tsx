import { useState, useEffect } from "react";
import { ArrowDown, MessageCircle, Check } from "lucide-react";
import { Button } from "./ui/button";
import { motion } from "framer-motion";
import SimpleChatbot from "./SimpleChatbot";

const Hero = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrollY(window.scrollY);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToContact = () => {
    const element = document.getElementById("contact");
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({ top: offsetPosition, behavior: "smooth" });
    }
  };

  const scrollToDemo = () => {
    const element = document.getElementById("services");
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({ top: offsetPosition, behavior: "smooth" });
    }
  };

  const parallaxOffset = scrollY * 0.5;

  return (
    <section 
      id="home" 
      className="relative min-h-screen flex items-center justify-center overflow-hidden scroll-mt-20"
      style={{ paddingBottom: "60px" }}
    >
      {/* Lightweight Animated Background */}
      <div className="absolute inset-0 bg-gradient-animated opacity-30" />
      
      {/* Subtle Grid Pattern */}
      <div 
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(90deg, rgba(99,102,241,0.3) 1px, transparent 1px),
            linear-gradient(rgba(99,102,241,0.3) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
          animation: 'gridShift 20s ease-in-out infinite'
        }}
      />

      {/* Floating Gradient Orbs - Hidden on mobile for performance */}
      <motion.div 
        className="hidden md:block absolute top-20 left-10 w-96 h-96 bg-primary/5 rounded-full blur-3xl"
        animate={{
          y: [0, -30, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        style={{ transform: `translateY(${parallaxOffset}px)` }}
      />
      <motion.div 
        className="hidden md:block absolute bottom-20 right-10 w-80 h-80 bg-accent/5 rounded-full blur-3xl"
        animate={{
          y: [0, 30, 0],
          scale: [1, 1.15, 1],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1
        }}
        style={{ transform: `translateY(${-parallaxOffset}px)` }}
      />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/50 to-background z-10" />

      {/* Main Content - Split Layout with Golden Ratio */}
      <motion.div 
        className="relative z-20 w-full px-4 sm:px-6 lg:px-8 py-8 md:py-12"
        style={{ transform: `translateY(${parallaxOffset * 0.3}px)` }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-[38.2%_61.8%] gap-8 md:gap-12 lg:gap-16 items-center">
            
            {/* LEFT SIDE - 38.2% (Golden Ratio) */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-8"
            >
              {/* Profile Image */}
              <motion.div 
                className="flex justify-center lg:justify-start"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <div className="relative group">
                  <div className="absolute -inset-1 bg-gradient-to-r from-primary via-bridge to-accent rounded-full blur opacity-30 group-hover:opacity-50 transition duration-500"></div>
                  <img 
                    src="/images/headshot.png" 
                    alt="Sheldon Gunby - Full Stack Developer"
                    className="relative w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 rounded-full object-cover border-4 border-background shadow-2xl"
                  />
                </div>
              </motion.div>

              {/* Headline */}
              <div className="space-y-4 text-center lg:text-left">
                <motion.h1 
                  className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                >
                  Hi, I'm{" "}
                  <span className="gradient-sunrise-text animate-gradient">
                    Sheldon Gunby
                  </span>
                </motion.h1>
                
                <motion.p 
                  className="text-lg sm:text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto lg:mx-0"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                >
                  Full Stack Developer specializing in AI-powered web applications
                </motion.p>
              </div>

              {/* Skills/Expertise */}
              <motion.div 
                className="flex flex-col gap-3 max-w-md mx-auto lg:mx-0"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                <div className="flex items-center gap-3 text-sm sm:text-base justify-center lg:justify-start">
                  <div className="flex items-center justify-center w-6 h-6 rounded-full bg-primary/10 flex-shrink-0">
                    <Check className="w-4 h-4 text-primary" />
                  </div>
                  <span className="font-medium">React, TypeScript & Node.js</span>
                </div>
                <div className="flex items-center gap-3 text-sm sm:text-base justify-center lg:justify-start">
                  <div className="flex items-center justify-center w-6 h-6 rounded-full bg-primary/10 flex-shrink-0">
                    <Check className="w-4 h-4 text-primary" />
                  </div>
                  <span className="font-medium">AI/ML Integration (HuggingFace)</span>
                </div>
                <div className="flex items-center gap-3 text-sm sm:text-base justify-center lg:justify-start">
                  <div className="flex items-center justify-center w-6 h-6 rounded-full bg-primary/10 flex-shrink-0">
                    <Check className="w-4 h-4 text-primary" />
                  </div>
                  <span className="font-medium">Modern UX/UI Design</span>
                </div>
              </motion.div>

              {/* CTAs */}
              <motion.div 
                className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto lg:mx-0 justify-center lg:justify-start"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                <Button
                  size="lg"
                  onClick={() => {
                    const element = document.getElementById("portfolio");
                    element?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="w-full sm:w-auto bg-gradient-to-r from-primary via-bridge to-accent hover:shadow-glow transition-all duration-500 text-base sm:text-lg px-6 sm:px-8 py-5 sm:py-6 group relative overflow-hidden"
                  id="hero-primary-cta"
                >
                  <span className="flex items-center gap-2 relative z-10 justify-center">
                    View Portfolio →
                  </span>
                  <motion.div
                    className="absolute inset-0 bg-white/20"
                    initial={{ x: "-100%" }}
                    whileHover={{ x: "100%" }}
                    transition={{ duration: 0.5 }}
                  />
                </Button>
                
                <Button
                  size="lg"
                  variant="outline"
                  onClick={scrollToContact}
                  className="w-full sm:w-auto glass border-primary/50 hover:bg-primary/10 hover:border-bridge/50 text-base sm:text-lg px-6 sm:px-8 py-5 sm:py-6 group"
                  id="hero-secondary-cta"
                >
                  <span className="flex items-center gap-2 justify-center">
                    <MessageCircle className="w-5 h-5" />
                    Contact Me
                  </span>
                </Button>
              </motion.div>

              {/* Quick Stats */}
              <motion.div
                className="pt-4 border-t border-border/50 max-w-md mx-auto lg:mx-0"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.7 }}
              >
                <div className="grid grid-cols-3 gap-4 text-center lg:text-left">
                  <div>
                    <p className="text-2xl font-bold text-primary">5+</p>
                    <p className="text-xs text-muted-foreground">Years Exp</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-primary">20+</p>
                    <p className="text-xs text-muted-foreground">Projects</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-primary">100%</p>
                    <p className="text-xs text-muted-foreground">Satisfied</p>
                  </div>
                </div>
              </motion.div>
            </motion.div>

            {/* RIGHT SIDE - 61.8% (Golden Ratio) - AI Chatbot */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="relative mt-8 lg:mt-0 h-[450px] sm:h-[500px] md:h-[550px] lg:h-[600px]"
            >
              <SimpleChatbot />
            </motion.div>

          </div>
        </div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.button
        onClick={() => {
          const element = document.getElementById("about");
          if (element) {
            const offset = 80;
            const elementPosition = element.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - offset;
            window.scrollTo({ top: offsetPosition, behavior: "smooth" });
          }
        }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 text-primary hover:scale-110 transition-transform p-3 rounded-full glass hover:bg-primary/20"
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        whileHover={{ scale: 1.2 }}
        aria-label="Scroll to next section"
      >
        <ArrowDown size={28} />
      </motion.button>
    </section>
  );
};

export default Hero;
