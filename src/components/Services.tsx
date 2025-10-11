import { Palette, Code, Zap, Lock, Smartphone, TrendingUp, ArrowRight, Check, Workflow } from "lucide-react";
import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import WireframeBackground from "./WireframeBackground";
import TiltCard from "./TiltCard";

const Services = () => {
  const [hoveredService, setHoveredService] = useState<number | null>(null);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  const services = [
    {
      icon: <Palette className="w-8 h-8" />,
      title: "Custom Website Design",
      description: "Award-winning designs tailored to your brand. From concept to launch, built to compete with the best sites on the web.",
      gradient: "from-primary to-primary-glow",
      features: ["Unique brand identity", "Modern aesthetics", "Mobile-first design"],
    },
    {
      icon: <Workflow className="w-8 h-8" />,
      title: "AI Social Media & Booking",
      description: "AI automatically creates and posts your social media content, books clients 24/7, and collects deposits—completely on autopilot.",
      gradient: "from-purple-500 to-purple-700",
      features: ["Auto social media posts", "24/7 AI booking bot", "Instant deposit collection"],
      isPremium: true,
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: "AI Review Response Agent",
      description: "Automatically responds to Google, Yelp, and Facebook reviews with personalized, on-brand replies in seconds. Boost your reputation while you sleep—customers rave about instant, thoughtful responses.",
      gradient: "from-emerald-500 to-teal-600",
      features: ["Responds in seconds", "Brand-matched tone", "Multi-platform sync"],
      isPremium: true,
    },
    {
      icon: <Smartphone className="w-8 h-8" />,
      title: "AI Competitor Intelligence Agent",
      description: "Exclusive: AI monitors your competitors' pricing, promotions, and strategies 24/7, then auto-adjusts your offerings to stay ahead. Nobody else is doing this—gain an unfair advantage.",
      gradient: "from-blue-500 to-indigo-600",
      features: ["Real-time competitor tracking", "Auto-adjust strategies", "Market insights dashboard"],
      isPremium: true,
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Lightning Performance",
      description: "Fast load times that keep visitors engaged. Optimized for speed, SEO, and conversions.",
      gradient: "from-primary to-accent",
      features: ["< 1s load times", "SEO optimized", "Google Analytics"],
    },
    {
      icon: <Lock className="w-8 h-8" />,
      title: "Security & Reliability",
      description: "Enterprise-grade security practices. SSL, secure authentication, and data protection built-in.",
      gradient: "from-accent to-primary",
      features: ["SSL/HTTPS", "Secure forms", "Daily backups"],
    },
  ];

  return (
    <motion.section 
      id="services" 
      className="py-20 relative overflow-hidden"
      ref={ref}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      {/* Sophisticated Wireframe Background */}
      <WireframeBackground variant="circuit" density="medium" animate={true} />
      
      {/* Background decoration */}
      <motion.div 
        className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl"
        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 8, repeat: Infinity }}
      />
      <motion.div 
        className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl"
        animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 10, repeat: Infinity, delay: 2 }}
      />

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-6xl mx-auto">
          <motion.div 
            className="text-center mb-20"
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-6xl font-bold mb-6">
              <span className="gradient-text">Services</span> That Scale
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Enterprise capabilities meets small business accessibility. Every service designed to give you a competitive edge.
            </p>
          </motion.div>

          <motion.div 
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20"
            variants={containerVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
          >
            {services.map((service, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
              >
                <TiltCard
                  className="group glass-strong rounded-2xl p-8 relative overflow-hidden h-full"
                  intensity={10}
                  glare={true}
                >
                  <div
                    onMouseEnter={() => setHoveredService(index)}
                    onMouseLeave={() => setHoveredService(null)}
                    onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
                    className="cursor-pointer"
                  >
                    {/* Premium badge */}
                    {service.isPremium && (
                      <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-gradient-to-r from-purple-500 to-purple-700 text-white text-xs font-bold">
                        Premium
                      </div>
                    )}
                    
                    {/* Animated background gradient */}
                    <div 
                      className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}
                    />
                    
                    <div className="relative z-10">
                      <div
                        className={`inline-flex p-4 rounded-2xl bg-gradient-to-br ${service.gradient} text-white mb-6 group-hover:scale-110 transition-all duration-500 group-hover:rotate-3`}
                      >
                        {service.icon}
                      </div>
                      <h3 className="text-2xl font-bold mb-4 group-hover:text-primary transition-colors">
                        {service.title}
                      </h3>
                      <p className="text-muted-foreground leading-relaxed mb-6">
                        {service.description}
                      </p>

                      {/* Feature list - appears on hover */}
                      <div 
                        className={`space-y-2 transition-all duration-500 ${
                          hoveredService === index ? 'opacity-100 max-h-32' : 'opacity-0 max-h-0 overflow-hidden'
                        }`}
                      >
                        {service.features.map((feature, fIndex) => (
                          <div key={fIndex} className="flex items-center gap-2 text-sm">
                            <Check className="w-4 h-4 text-primary flex-shrink-0" />
                            <span className="text-muted-foreground">{feature}</span>
                          </div>
                        ))}
                      </div>

                      {/* Learn more arrow */}
                      <div className={`mt-4 flex items-center gap-2 text-sm font-semibold text-primary transition-all duration-300 ${
                        hoveredService === index ? 'translate-x-2' : ''
                      }`}>
                        <span>Learn more</span>
                        <ArrowRight className="w-4 h-4" />
                      </div>
                    </div>
                  </div>
                </TiltCard>
              </motion.div>
            ))}
          </motion.div>

          {/* Services CTA */}
          <motion.div
            className="mt-16 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className="glass-strong rounded-2xl p-8 md:p-12 max-w-3xl mx-auto">
              <h3 className="text-2xl md:text-3xl font-bold mb-4">
                Ready to Add <span className="gradient-text">Premium AI Tools</span>?
              </h3>
              <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
                Start with a free website, then supercharge your business with AI automation when you're ready to scale.
              </p>
              <button
                onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
                className="inline-flex items-center gap-2 px-8 py-4 rounded-lg bg-gradient-to-r from-primary to-bridge hover:shadow-glow transition-all duration-300 text-lg font-semibold group"
                id="services-cta"
              >
                <span>Get Started Free</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <p className="text-sm text-muted-foreground mt-4">
                No credit card • No commitment • Free forever
              </p>
            </div>
          </motion.div>

        </div>
      </div>
    </motion.section>
  );
};

export default Services;
