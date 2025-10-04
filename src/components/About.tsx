import { Code2, Shield, Sparkles, TrendingUp, Award, Zap, Heart, Bot, Wand2 } from "lucide-react";
import AnimatedCounter from "./AnimatedCounter";
import WireframeBackground from "./WireframeBackground";

const About = () => {
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
    <section 
      id="about" 
      className="py-32 relative overflow-hidden"
    >
      {/* Sophisticated Wireframe Background */}
      <WireframeBackground variant="hexagon" density="low" animate={true} />
      
      {/* Background decoration */}
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl opacity-50" />
      <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl opacity-50" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-6xl font-bold mb-6">
              From <span className="gradient-text text-glow">Infrastructure</span> to{" "}
              <span className="gradient-accent-text text-glow">Innovation</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Leveraging 15+ years of enterprise IT experience to build award-worthy websites that put rural businesses on equal footing with big-city competitors.
            </p>
          </div>

          {/* Interactive Journey Cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
            {journey.map((item, index) => (
              <div
                key={index}
                className="glass-strong rounded-2xl p-6 border-gradient"
              >
                <div
                  className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${item.color} text-white mb-4`}
                >
                  {item.icon}
                </div>
                <div className="text-sm font-semibold text-primary mb-2">{item.year}</div>
                <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                <p className="text-muted-foreground text-sm mb-3">{item.description}</p>
                <p className="text-xs text-muted-foreground leading-relaxed border-t border-border/50 pt-3">{item.details}</p>
              </div>
            ))}
          </div>

          {/* AI Tools Showcase */}
          <div className="mb-20 glass-strong rounded-3xl p-8 md:p-12">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-4 border border-primary/30">
                <Sparkles className="w-4 h-4 text-primary" />
                <span className="text-sm font-semibold">AI-Enhanced Workflow</span>
              </div>
              <h3 className="text-3xl font-bold mb-4">
                Powered by <span className="gradient-text">Modern AI Tools</span>
              </h3>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Leveraging cutting-edge AI technology to deliver faster turnarounds and award-worthy results at small business prices.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {/* ChatGPT Card */}
              <div className="glass rounded-2xl p-8 hover-lift group relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative z-10">
                  <div className="inline-flex p-4 rounded-2xl bg-gradient-to-br from-primary to-primary-glow text-white mb-6 group-hover:scale-110 transition-all duration-500">
                    <Bot className="w-8 h-8" />
                  </div>
                  <h4 className="text-2xl font-bold mb-4 group-hover:text-primary transition-colors">ChatGPT</h4>
                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    My AI development partner for intelligent problem-solving, code optimization, and rapid prototyping.
                  </p>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0"></div>
                      <span className="text-sm text-muted-foreground">Architecture planning & best practices</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0"></div>
                      <span className="text-sm text-muted-foreground">Code optimization & debugging</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0"></div>
                      <span className="text-sm text-muted-foreground">Component design & solutions</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0"></div>
                      <span className="text-sm text-muted-foreground">Rapid iteration & testing</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Nano Banana Card */}
              <div className="glass rounded-2xl p-8 hover-lift group relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative z-10">
                  <div className="inline-flex p-4 rounded-2xl bg-gradient-to-br from-accent to-accent-glow text-white mb-6 group-hover:scale-110 transition-all duration-500">
                    <Wand2 className="w-8 h-8" />
                  </div>
                  <h4 className="text-2xl font-bold mb-4 group-hover:text-accent transition-colors">Nano Banana</h4>
                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    AI-powered image generation for unique branding, custom graphics, and visual storytelling.
                  </p>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-accent mt-2 flex-shrink-0"></div>
                      <span className="text-sm text-muted-foreground">AI-generated brand imagery</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-accent mt-2 flex-shrink-0"></div>
                      <span className="text-sm text-muted-foreground">Custom illustrations & graphics</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-accent mt-2 flex-shrink-0"></div>
                      <span className="text-sm text-muted-foreground">Visual identity & concepts</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-accent mt-2 flex-shrink-0"></div>
                      <span className="text-sm text-muted-foreground">Unique visual storytelling</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Value Proposition */}
            <div className="mt-8 text-center p-6 rounded-xl glass border border-primary/20">
              <p className="text-sm text-muted-foreground leading-relaxed">
                <span className="text-foreground font-semibold">Why this matters for you:</span> By combining 15+ years of IT expertise with AI-powered tools, I deliver enterprise-quality websites faster and more affordably. You get premium results without the premium price tag.
              </p>
            </div>
          </div>

          {/* Stats Bar with Animated Counters */}
          <div className="grid md:grid-cols-3 gap-6 mb-20">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="glass-strong rounded-2xl p-8 text-center"
              >
                <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 ${stat.color} mb-4`}>
                  {stat.icon}
                </div>
                <div className="text-4xl font-bold gradient-text mb-2">
                  <AnimatedCounter end={parseInt(stat.value)} duration={2} />
                  {stat.value.includes('+') ? '+' : ''}
                </div>
                <div className="text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>

          <div className="glass-strong rounded-3xl p-8 md:p-12">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
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
                  <span className="text-foreground font-semibold">What I need from you:</span> Share 2+ websites you love for design inspiration. This helps me understand your vision and create something that matches your aesthetic perfectly.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  Tips appreciated but never required. Your success story becomes part of my showcase.
                </p>
              </div>

              <div className="space-y-4">
                <div className="glass rounded-xl p-6 group">
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
                <div className="glass rounded-xl p-6 group">
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
                <div className="glass rounded-xl p-6 group">
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
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
