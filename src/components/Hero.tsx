import { useEffect, useRef } from "react";
import { ArrowDown } from "lucide-react";
import { Button } from "./ui/button";

const Hero = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
    }> = [];

    for (let i = 0; i < 50; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 2 + 1,
      });
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach((particle, i) => {
        particle.x += particle.vx;
        particle.y += particle.vy;

        if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
        if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;

        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(195, 85%, 55%, ${0.3 + Math.random() * 0.3})`;
        ctx.fill();

        particles.forEach((particle2, j) => {
          if (i === j) return;
          const dx = particle.x - particle2.x;
          const dy = particle.y - particle2.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 150) {
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(particle2.x, particle2.y);
            ctx.strokeStyle = `hsla(195, 85%, 55%, ${0.1 * (1 - distance / 150)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        });
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

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <canvas ref={canvasRef} className="absolute inset-0 z-0" />
      
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/50 to-background z-10" />

      <div className="relative z-20 container mx-auto px-6 text-center animate-fade-in-up">
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6">
          <span className="gradient-text">Enterprise Websites</span>
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
            className="bg-gradient-to-r from-primary to-primary-glow hover:shadow-glow transition-all duration-500 text-lg px-8 py-6"
          >
            Discover More
          </Button>
          <Button
            size="lg"
            variant="outline"
            onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
            className="glass border-primary/50 hover:bg-primary/10 text-lg px-8 py-6"
          >
            Get Your Free Website
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
      </div>

      <button
        onClick={scrollToAbout}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20 animate-bounce text-primary"
      >
        <ArrowDown size={32} />
      </button>
    </section>
  );
};

export default Hero;
