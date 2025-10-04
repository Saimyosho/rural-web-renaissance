import { Code2, Shield, Sparkles, TrendingUp, Award, Zap, Heart } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import AnimatedCounter from "./AnimatedCounter";
import WireframeBackground from "./WireframeBackground";

const About = () => {
  const [flippedCard, setFlippedCard] = useState<number | null>(null);
  const [ref, inView] = useInView({ threshold: 0.2, triggerOnce: true });

  const journey = [
    {
      icon: <Code2 className="w-6 h-6" />,
      year: "15+ Years",
      title: "IT Infrastructure",
      description: "Enterprise networking and systems management",
      details: "Built and maintained complex IT systems for Fortune 500 companies, managing networks serving thousands of users with 99.9% uptime.",
      color: "from-primary to-primary-glow",
    },
    {
      icon: <TrendingUp className="w-6 h-6" />,
      year: "Current",
      title: "Web Development",
      description: "Modern frameworks, cutting-edge design",
      details: "Specializing in React, Next.js, and Vue with TypeScript. Creating responsive, accessible, and performant web applications.",
      color: "from-accent to-accent-glow",
    },
    {
      icon: <Shield className="w-6 h-6" />,
      year: "Ongoing",
      title: "Cybersecurity Studies",
      description: "Integrating security best practices",
      details: "Continuously learning and implementing the latest security protocols, encryption methods, and secure coding practices.",
      color: "from-primary to-accent",
    },
    {
      icon: <Sparkles className="w-6 h-6" />,
      year: "Mission",
      title: "Rural Business Advocacy",
      description: "Enterprise quality for local businesses",
      details: "Leveling the playing field by bringing Fortune 500-level web presence to small businesses in rural Pennsylvania.",
      color: "from-accent to-primary",
    },
  ];

  const stats = [
    { icon: <Award className="w-6 h-6" />, value: "100%", label: "Award Standards", color: "text-primary" },
    { icon: <Zap className="w-6 h-6" />, value: "< 1s", label: "Load Times", color: "text-accent" },
    { icon: <Heart className="w-6 h-6" />, value: "$0", label: "Base Cost", color: "text-primary" },
  ];

  return (
    <motion.section 
      id="about" 
      className="py-32 relative overflow-hidden" 
      ref={ref}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      {/* Sophisticated Wireframe Background */}
      <WireframeBackground variant="hexagon" density="low" animate={true} />
      
      {/* Background decoration */}
      <motion.div 
        className="absolute top-1/4 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl"
        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 8, repeat: Infinity }}
      />
      <motion.div 
        className="absolute bottom-1/4 left-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl"
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
              From <span className="gradient-text text-glow">Infrastructure</span> to{" "}
              <span className="gradient-accent-text text-glow">Innovation</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Leveraging 15+ years of enterprise IT experience to build award-worthy websites that put rural businesses on equal footing with big-city competitors.
            </p>
          </motion.div>

          {/* Interactive Journey Cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
            {journey.map((item, index) => (
              <motion.div
                key={index}
                className="relative h-64 perspective-1000"
                onMouseEnter={() => setFlippedCard(index)}
                onMouseLeave={() => setFlippedCard(null)}
                initial={{ opacity: 0, y: 50 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -10 }}
              >
                <div 
                  className={`absolute inset-0 transition-all duration-500 transform-style-3d ${
                    flippedCard === index ? 'rotate-y-180' : ''
                  }`}
                  style={{
                    transformStyle: 'preserve-3d',
                    transform: flippedCard === index ? 'rotateY(180deg)' : 'rotateY(0)',
                  }}
                >
                  {/* Front of card */}
                  <div className="absolute inset-0 glass-strong rounded-2xl p-6 backface-hidden border-gradient">
                    <div
                      className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${item.color} text-white mb-4`}
                    >
                      {item.icon}
                    </div>
                    <div className="text-sm font-semibold text-primary mb-2">{item.year}</div>
                    <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                    <p className="text-muted-foreground text-sm">{item.description}</p>
                  </div>
                  
                  {/* Back of card */}
                  <div 
                    className="absolute inset-0 glass-strong rounded-2xl p-6 backface-hidden border-gradient"
                    style={{ transform: 'rotateY(180deg)' }}
                  >
                    <div
                      className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${item.color} text-white mb-4`}
                    >
                      {item.icon}
                    </div>
                    <p className="text-sm leading-relaxed">{item.details}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Stats Bar with Animated Counters */}
          <motion.div 
            className="grid md:grid-cols-3 gap-6 mb-20"
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                className="glass-strong rounded-2xl p-8 text-center hover-lift animate-scale-in"
                style={{ animationDelay: `${index * 0.1}s` }}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
              >
                <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 ${stat.color} mb-4`}>
                  {stat.icon}
                </div>
                <div className="text-4xl font-bold gradient-text mb-2">
                  <AnimatedCounter end={parseInt(stat.value)} duration={2} />
                  {stat.value.includes('+') ? '+' : ''}
                </div>
                <div className="text-muted-foreground">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>

          <motion.div 
            className="glass-strong rounded-3xl p-8 md:p-12"
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <motion.div 
                className="space-y-6"
                initial={{ opacity: 0, x: -30 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.8, delay: 1 }}
              >
                <h3 className="text-3xl font-bold mb-6">
                  Why <span className="gradient-text">I Do This</span>
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  Based in <span className="text-primary font-semibold">Ferndale, Pennsylvania</span>, I serve small businesses in the Johnstown area who deserve the same premium web presence as Fortune 500 companies.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  Every website I build meets <span className="text-accent font-semibold">award competition standards</span> - Webby Awards, Awwwards, CSS Design Awards. You get something that looks like you paid $10k+, completely free as I build my portfolio.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  Tips appreciated but never required. Your success story becomes part of my showcase.
                </p>
              </motion.div>

              <motion.div 
                className="space-y-4"
                initial={{ opacity: 0, x: 30 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.8, delay: 1.2 }}
              >
                <div className="glass rounded-xl p-6 hover-tilt group">
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-lg bg-primary/20 group-hover:bg-primary/30 transition-colors">
                      <Sparkles className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <div className="text-2xl font-bold gradient-text mb-2">Zero Cost</div>
                      <p className="text-sm text-muted-foreground">
                        Free custom website design and development. Tips welcomed, never expected.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="glass rounded-xl p-6 hover-tilt group">
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-lg bg-accent/20 group-hover:bg-accent/30 transition-colors">
                      <Award className="w-6 h-6 text-accent" />
                    </div>
                    <div>
                      <div className="text-2xl font-bold gradient-accent-text mb-2">Award Standards</div>
                      <p className="text-sm text-muted-foreground">
                        Every project built to compete with the best sites on the web.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="glass rounded-xl p-6 hover-tilt group">
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-lg bg-primary/20 group-hover:bg-primary/30 transition-colors">
                      <Code2 className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <div className="text-2xl font-bold gradient-text mb-2">Modern Tech</div>
                      <p className="text-sm text-muted-foreground">
                        React, Next.js, Vue - the same tools big agencies use.
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};

export default About;
