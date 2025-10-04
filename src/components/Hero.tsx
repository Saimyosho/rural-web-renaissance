import { useEffect, useRef, useState } from "react";
import { ArrowDown, Sparkles, Zap } from "lucide-react";
import { Button } from "./ui/button";
import { motion } from "framer-motion";
import WireframeBackground from "./WireframeBackground";
import FloatingShapes from "./FloatingShapes";

const Hero = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mousePosRef = useRef({ x: 0, y: 0 });
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

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mousePosRef.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      baseX: number;
      baseY: number;
      hue: number;
    }> = [];

    // Reduced from 80 to 40 particles for better performance
    for (let i = 0; i < 40; i++) {
      const x = Math.random() * canvas.width;
      const y = Math.random() * canvas.height;
      particles.push({
        x,
        y,
        baseX: x,
        baseY: y,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 3 + 1,
        hue: 195 + Math.random() * 30,
      });
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach((particle, i) => {
        // Mouse interaction
        const dx = mousePosRef.current.x - particle.x;
        const dy = mousePosRef.current.y - particle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < 150) {
          const force = (150 - distance) / 150;
          particle.x -= dx * force * 0.03;
          particle.y -= dy * force * 0.03;
        }

        // Return to base position
        particle.x += (particle.baseX - particle.x) * 0.05;
        particle.y += (particle.baseY - particle.y) * 0.05;

        particle.x += particle.vx;
        particle.y += particle.vy;
        particle.baseX += particle.vx;
        particle.baseY += particle.vy;

        if (particle.baseX < 0 || particle.baseX > canvas.width) {
          particle.vx *= -1;
          particle.baseX = Math.max(0, Math.min(canvas.width, particle.baseX));
        }
        if (particle.baseY < 0 || particle.baseY > canvas.height) {
          particle.vy *= -1;
          particle.baseY = Math.max(0, Math.min(canvas.height, particle.baseY));
        }

        // Glow effect
        const gradient = ctx.createRadialGradient(
          particle.x, particle.y, 0,
          particle.x, particle.y, particle.size * 4
        );
        gradient.addColorStop(0, `hsla(${particle.hue}, 85%, 65%, 0.8)`);
        gradient.addColorStop(1, `hsla(${particle.hue}, 85%, 65%, 0)`);
        
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size * 4, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();

        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${particle.hue}, 85%, 55%, 0.9)`;
        ctx.fill();

        // Optimized connections - only check forward to avoid duplicates
        for (let j = i + 1; j < particles.length; j++) {
          const particle2 = particles[j];
          const dx2 = particle.x - particle2.x;
          const dy2 = particle.y - particle2.y;
          const distance2 = Math.sqrt(dx2 * dx2 + dy2 * dy2);

          if (distance2 < 150) {  // Reduced from 200 for better performance
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(particle2.x, particle2.y);
            const opacity = (1 - distance2 / 150) * 0.1;  // Reduced opacity
            ctx.strokeStyle = `hsla(${particle.hue}, 85%, 55%, ${opacity})`;
            ctx.lineWidth = 0.5;  // Thinner lines
            ctx.stroke();
          }
        }
      });

      requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const scrollToAbout = () => {
    const element = document.getElementById("about");
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({ top: offsetPosition, behavior: "smooth" });
    }
  };

  const parallaxOffset = scrollY * 0.5;

  // Framer Motion variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.8, ease: [0.6, -0.05, 0.01, 0.99] }
    }
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Sophisticated Wireframe Background */}
      <WireframeBackground variant="dots" density="medium" animate={true} />
      
      {/* Floating Geometric Shapes - reduced for performance */}
      <FloatingShapes count={5} variant="mixed" />
      
      <canvas ref={canvasRef} className="absolute inset-0 z-0" />
      
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/50 to-background z-10 mesh-gradient" />

      {/* Floating decorative elements */}
      <motion.div 
        className="absolute top-20 left-10 w-32 h-32 bg-primary/10 rounded-full blur-3xl"
        animate={{
          y: [0, -30, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        style={{ transform: `translateY(${parallaxOffset}px)` }}
      />
      <motion.div 
        className="absolute bottom-20 right-10 w-40 h-40 bg-accent/10 rounded-full blur-3xl"
        animate={{
          y: [0, 30, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1
        }}
        style={{ transform: `translateY(${-parallaxOffset}px)` }}
      />

      <motion.div 
        className="relative z-20 container mx-auto px-6 text-center"
        style={{ transform: `translateY(${parallaxOffset * 0.3}px)` }}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={itemVariants}>
          <motion.div 
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-8 border-animated"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm font-semibold">Award-Winning Design Standards</span>
            <Sparkles className="w-4 h-4 text-accent" />
          </motion.div>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6">
            <span className="gradient-text animate-gradient">Enterprise Websites</span>
            <br />
            <span className="text-foreground">for Small Business Budgets</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            15+ years IT experience, now crafting award-worthy web experiences for rural Pennsylvania businesses
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <Button
              size="lg"
              onClick={scrollToAbout}
              className="bg-gradient-to-r from-primary to-primary-glow hover:shadow-glow transition-all duration-500 text-lg px-8 py-6 group"
            >
              <span className="flex items-center gap-2">
                Discover More
                <Sparkles className="w-5 h-5 group-hover:rotate-12 transition-transform" />
              </span>
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
              className="glass border-primary/50 hover:bg-primary/10 text-lg px-8 py-6 group"
            >
              <span className="flex items-center gap-2">
                Get Your Free Website
                <Zap className="w-5 h-5 group-hover:text-accent transition-colors" />
              </span>
            </Button>
          </div>

          <div className="flex gap-8 justify-center text-sm text-muted-foreground">
            <div>
              <div className="text-3xl font-bold gradient-text mb-1">15+</div>
              <div>Years Experience</div>
            </div>
            <div className="border-l border-border/50" />
            <div>
              <div className="text-3xl font-bold gradient-accent-text mb-1">100%</div>
              <div>Award Standards</div>
            </div>
            <div className="border-l border-border/50" />
            <div>
              <div className="text-3xl font-bold gradient-text mb-1">Free</div>
              <div>Portfolio Builds</div>
            </div>
          </div>
        </motion.div>
      </motion.div>

      <motion.button
        onClick={scrollToAbout}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20 text-primary hover:scale-110 transition-transform p-3 rounded-full glass hover:bg-primary/20"
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        whileHover={{ scale: 1.2 }}
      >
        <ArrowDown size={32} />
      </motion.button>

      {/* Scroll progress indicator */}
      <motion.div 
        className="absolute bottom-0 left-0 right-0 h-1 bg-primary/20 z-20"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div 
          className="h-full bg-gradient-to-r from-primary to-accent"
          style={{ 
            width: `${Math.min((scrollY / window.innerHeight) * 100, 100)}%`,
            transition: 'width 0.3s ease-out'
          }}
        />
      </motion.div>
    </section>
  );
};

export default Hero;
