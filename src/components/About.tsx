import { Code2, Shield, Sparkles, TrendingUp } from "lucide-react";

const About = () => {
  const journey = [
    {
      icon: <Code2 className="w-6 h-6" />,
      year: "15+ Years",
      title: "IT Infrastructure",
      description: "Enterprise networking and systems management",
      color: "from-primary to-primary-glow",
    },
    {
      icon: <TrendingUp className="w-6 h-6" />,
      year: "Current",
      title: "Web Development",
      description: "Modern frameworks, cutting-edge design",
      color: "from-accent to-accent-glow",
    },
    {
      icon: <Shield className="w-6 h-6" />,
      year: "Ongoing",
      title: "Cybersecurity Studies",
      description: "Integrating security best practices",
      color: "from-primary to-accent",
    },
    {
      icon: <Sparkles className="w-6 h-6" />,
      year: "Mission",
      title: "Rural Business Advocacy",
      description: "Enterprise quality for local businesses",
      color: "from-accent to-primary",
    },
  ];

  return (
    <section id="about" className="py-32 relative">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20 animate-fade-in">
            <h2 className="text-4xl md:text-6xl font-bold mb-6">
              From <span className="gradient-text">Infrastructure</span> to{" "}
              <span className="gradient-accent-text">Innovation</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Leveraging 15+ years of enterprise IT experience to build award-worthy websites that put rural businesses on equal footing with big-city competitors.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
            {journey.map((item, index) => (
              <div
                key={index}
                className="glass-strong rounded-2xl p-6 hover-lift animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div
                  className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${item.color} text-white mb-4`}
                >
                  {item.icon}
                </div>
                <div className="text-sm font-semibold text-primary mb-2">{item.year}</div>
                <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                <p className="text-muted-foreground text-sm">{item.description}</p>
              </div>
            ))}
          </div>

          <div className="glass-strong rounded-3xl p-8 md:p-12">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h3 className="text-3xl font-bold mb-6">
                  Why <span className="gradient-text">I Do This</span>
                </h3>
                <p className="text-muted-foreground mb-4 leading-relaxed">
                  Based in <span className="text-primary font-semibold">Ferndale, Pennsylvania</span>, I serve small businesses in the Johnstown area who deserve the same premium web presence as Fortune 500 companies.
                </p>
                <p className="text-muted-foreground mb-4 leading-relaxed">
                  Every website I build meets <span className="text-accent font-semibold">award competition standards</span> - Webby Awards, Awwwards, CSS Design Awards. You get something that looks like you paid $10k+, completely free as I build my portfolio.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  Tips appreciated but never required. Your success story becomes part of my showcase.
                </p>
              </div>

              <div className="space-y-4">
                <div className="glass rounded-xl p-6 hover-tilt">
                  <div className="text-2xl font-bold gradient-text mb-2">Zero Cost</div>
                  <p className="text-sm text-muted-foreground">
                    Free custom website design and development. Tips welcomed, never expected.
                  </p>
                </div>
                <div className="glass rounded-xl p-6 hover-tilt">
                  <div className="text-2xl font-bold gradient-accent-text mb-2">Award Standards</div>
                  <p className="text-sm text-muted-foreground">
                    Every project built to compete with the best sites on the web.
                  </p>
                </div>
                <div className="glass rounded-xl p-6 hover-tilt">
                  <div className="text-2xl font-bold gradient-text mb-2">Modern Tech</div>
                  <p className="text-sm text-muted-foreground">
                    React, Next.js, Vue, cutting-edge CSS - the same tools big agencies use.
                  </p>
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
