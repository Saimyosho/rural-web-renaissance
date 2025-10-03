import { Palette, Code, Zap, Lock, Smartphone, TrendingUp } from "lucide-react";

const Services = () => {
  const services = [
    {
      icon: <Palette className="w-8 h-8" />,
      title: "Custom Design",
      description: "Bespoke designs tailored to your brand, built to award-winning standards with modern aesthetics.",
      gradient: "from-primary to-primary-glow",
    },
    {
      icon: <Code className="w-8 h-8" />,
      title: "Modern Frameworks",
      description: "React, Next.js, Vue - enterprise-level tech stack for maintainability and performance.",
      gradient: "from-accent to-accent-glow",
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Performance Optimization",
      description: "Lightning-fast load times, perfect Lighthouse scores, optimized for conversions.",
      gradient: "from-primary to-accent",
    },
    {
      icon: <Lock className="w-8 h-8" />,
      title: "Security First",
      description: "Cybersecurity integration with best practices for data protection and secure authentication.",
      gradient: "from-accent to-primary",
    },
    {
      icon: <Smartphone className="w-8 h-8" />,
      title: "Responsive Design",
      description: "Flawless experience across all devices - mobile-first approach with progressive enhancement.",
      gradient: "from-primary-glow to-primary",
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: "SEO & Analytics",
      description: "Built-in search optimization and tracking to help your business grow online.",
      gradient: "from-accent-glow to-accent",
    },
  ];

  return (
    <section id="services" className="py-32 relative">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20 animate-fade-in">
            <h2 className="text-4xl md:text-6xl font-bold mb-6">
              <span className="gradient-text">Services</span> That Scale
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Enterprise capabilities meets small business accessibility. Every service designed to give you a competitive edge.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, index) => (
              <div
                key={index}
                className="group glass-strong rounded-2xl p-8 hover-lift animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div
                  className={`inline-flex p-4 rounded-2xl bg-gradient-to-br ${service.gradient} text-white mb-6 group-hover:scale-110 transition-transform duration-500`}
                >
                  {service.icon}
                </div>
                <h3 className="text-2xl font-bold mb-4">{service.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{service.description}</p>
              </div>
            ))}
          </div>

          <div className="mt-20 glass-strong rounded-3xl p-8 md:p-12 text-center">
            <h3 className="text-3xl font-bold mb-4">
              The <span className="gradient-accent-text">Tech Stack</span>
            </h3>
            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
              I use the same cutting-edge tools that power the world's best websites
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              {["React", "Next.js", "Vue", "TypeScript", "Tailwind CSS", "Node.js", "PostgreSQL", "Vercel"].map(
                (tech, index) => (
                  <div
                    key={index}
                    className="glass rounded-full px-6 py-3 font-semibold hover:bg-primary/10 hover:scale-105 transition-all duration-300 cursor-default"
                  >
                    {tech}
                  </div>
                )
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
