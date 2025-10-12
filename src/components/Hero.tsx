import { useEffect, useRef, useState } from "react";
import { ArrowDown, Sparkles, Zap } from "lucide-react";
import { Button } from "./ui/button";
import { motion } from "framer-motion";
import WireframeBackground from "./WireframeBackground";

// TypeScript declaration for Three.js from CDN
// eslint-disable-next-line @typescript-eslint/no-explicit-any
declare const THREE: any;

const Hero = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const sceneRef = useRef<any>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const cameraRef = useRef<any>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const rendererRef = useRef<any>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const particleSystemRef = useRef<any>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const [scrollY, setScrollY] = useState(0);
  const [threeLoaded, setThreeLoaded] = useState(false);

  // Check if Three.js is loaded
  useEffect(() => {
    const checkThree = setInterval(() => {
      if (typeof THREE !== 'undefined') {
        setThreeLoaded(true);
        clearInterval(checkThree);
      }
    }, 100);

    return () => clearInterval(checkThree);
  }, []);

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
      mouseRef.current = {
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: -(e.clientY / window.innerHeight) * 2 + 1
      };
    };
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Three.js particle wave setup
  useEffect(() => {
    if (!threeLoaded || !canvasRef.current || typeof THREE === 'undefined') return;

    const canvas = canvasRef.current;
    
    // Scene setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // Camera setup
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 100;
    cameraRef.current = camera;

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({
      canvas: canvas,
      alpha: true,
      antialias: true
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    rendererRef.current = renderer;

    // Particle count based on screen size
    const getParticleCount = () => {
      const width = window.innerWidth;
      if (width < 768) return 2500;  // Mobile
      if (width < 1024) return 5000;  // Tablet
      return 10000;  // Desktop
    };

    const particleCount = getParticleCount();

    // Brand colors - blue to purple gradient
    const color1 = new THREE.Color('#2A8D9B'); // Vibrant Teal
    const color2 = new THREE.Color('#8A2BE2'); // Rich Purple

    // Particle geometry
    const particles = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const speeds = new Float32Array(particleCount);
    const waveOffsets = new Float32Array(particleCount);

    for (let i = 0; i < particleCount; i++) {
      // Spread particles across viewport width
      const xSpread = window.innerWidth * 0.015;
      const ySpread = window.innerHeight * 0.008;

      positions[i * 3] = (Math.random() - 0.5) * xSpread; // X
      positions[i * 3 + 1] = (Math.random() - 0.5) * ySpread; // Y
      positions[i * 3 + 2] = (Math.random() - 0.5) * 50; // Z depth

      // Gradient colors based on X position
      const xNormalized = (positions[i * 3] + xSpread / 2) / xSpread;
      const interpolatedColor = new THREE.Color().lerpColors(
        color1,
        color2,
        Math.max(0, Math.min(1, xNormalized))
      );
      colors[i * 3] = interpolatedColor.r;
      colors[i * 3 + 1] = interpolatedColor.g;
      colors[i * 3 + 2] = interpolatedColor.b;

      speeds[i] = 0.3 + Math.random() * 0.3; // Slow drift speed
      waveOffsets[i] = Math.random() * Math.PI * 2;
    }

    particles.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particles.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    particles.setAttribute('speed', new THREE.BufferAttribute(speeds, 1));
    particles.setAttribute('waveOffset', new THREE.BufferAttribute(waveOffsets, 1));

    // Particle material with glow
    const particleMaterial = new THREE.PointsMaterial({
      size: 1.5,
      vertexColors: true,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending,
      sizeAttenuation: true
    });

    const particleSystem = new THREE.Points(particles, particleMaterial);
    scene.add(particleSystem);
    particleSystemRef.current = particleSystem;

    // Animation loop
    let animationId: number;
    const animate = () => {
      animationId = requestAnimationFrame(animate);

      const positions = particleSystem.geometry.attributes.position.array;
      const speeds = particleSystem.geometry.attributes.speed.array;
      const waveOffsets = particleSystem.geometry.attributes.waveOffset.array;
      const time = Date.now() * 0.0003; // Slow time progression

      const xSpread = window.innerWidth * 0.015;

      // Animate particles in elegant wave
      for (let i = 0; i < particleCount; i++) {
        const ix = i * 3;
        const iy = i * 3 + 1;

        // Slow horizontal drift
        positions[ix] += speeds[i] * 0.03;

        // Wrap around
        if (positions[ix] > xSpread / 2) {
          positions[ix] = -xSpread / 2;
        }

        // Elegant sine wave vertical motion
        const waveAmplitude = 10;
        const waveFrequency = 0.01;
        positions[iy] = 
          Math.sin(positions[ix] * waveFrequency + time + waveOffsets[i]) * 
          waveAmplitude +
          (mouseRef.current.y * 15); // Subtle mouse influence
      }

      particleSystem.geometry.attributes.position.needsUpdate = true;

      // Smooth camera parallax based on mouse
      camera.position.x += (mouseRef.current.x * 5 - camera.position.x) * 0.05;
      camera.position.y += (-mouseRef.current.y * 5 - camera.position.y) * 0.05;
      camera.lookAt(scene.position);

      renderer.render(scene, camera);
    };

    animate();

    // Handle window resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    };

    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationId);
      if (rendererRef.current) {
        rendererRef.current.dispose();
      }
      if (particleSystemRef.current) {
        particleSystemRef.current.geometry.dispose();
        particleSystemRef.current.material.dispose();
      }
    };
  }, [threeLoaded]);

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
    visible: { y: 0, opacity: 1 }
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden pb-20">
      {/* Sophisticated Wireframe Background - Behind particles */}
      <WireframeBackground variant="dots" density="medium" animate={true} />
      
      {/* Three.js Particle Wave Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 z-[5]" />
      
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
        className="relative z-20 container mx-auto px-6 text-center py-8 pt-32"
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
            <span className="text-sm font-semibold">AI-Powered Automation Specialist</span>
            <Sparkles className="w-4 h-4 text-accent" />
          </motion.div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-8 leading-tight">
            <span className="text-foreground block mb-2">Your Website is</span>
            <span className="gradient-sunrise-text animate-gradient text-5xl md:text-7xl lg:text-8xl block">100% Free</span>
          </h1>
          
          <p className="text-2xl md:text-3xl text-primary mb-6 max-w-3xl mx-auto font-semibold">
            We Make Money When You Make Money
          </p>
          
          <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            I build your website free using my tech expertise. Need business automation? Add tools to save time when you're ready to grow.
          </p>

          <div className="flex flex-col items-center gap-6 mb-12">
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center w-full">
              <Button
                size="lg"
                onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
                className="bg-gradient-to-r from-primary via-bridge to-accent hover:shadow-glow transition-all duration-500 text-lg px-10 py-7 group relative overflow-hidden"
                id="hero-primary-cta"
              >
                <span className="flex items-center gap-2 relative z-10">
                  Start Your Victory
                  <Sparkles className="w-5 h-5 group-hover:rotate-12 transition-transform" />
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
                onClick={() => document.getElementById("services")?.scrollIntoView({ behavior: "smooth" })}
                className="glass border-primary/50 hover:bg-primary/10 hover:border-bridge/50 text-lg px-10 py-7 group"
                id="hero-secondary-cta"
              >
                <span className="flex items-center gap-2">
                  Explore AI Solutions
                  <Zap className="w-5 h-5 group-hover:text-accent transition-colors" />
                </span>
              </Button>
            </div>

            {/* Trust indicators */}
            <motion.div 
              className="flex flex-wrap items-center justify-center gap-4 md:gap-6 text-sm text-muted-foreground"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 text-primary" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>100% Free</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 text-primary" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>No Credit Card</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 text-primary" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>Ready in 7 Days</span>
              </div>
            </motion.div>
          </div>

        </motion.div>
      </motion.div>

      <motion.button
        onClick={scrollToAbout}
        className="absolute bottom-4 md:bottom-12 left-1/2 -translate-x-1/2 z-20 text-primary hover:scale-110 transition-transform p-3 rounded-full glass hover:bg-primary/20"
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
