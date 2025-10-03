import { ExternalLink } from "lucide-react";
import { Button } from "./ui/button";

const Portfolio = () => {
  const projects = [
    {
      title: "Horn Barbecue",
      category: "Restaurant & Catering",
      description: "Award-winning BBQ restaurant website featuring online ordering, catering services, and brand storytelling.",
      image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800&auto=format&fit=crop&q=80",
      tags: ["E-commerce", "Branding", "Ordering System"],
      size: "large",
      link: "https://www.hornbarbecue.com/",
      favicon: "/favicons/horn-favicon.ico",
    },
    {
      title: "Base44",
      category: "Technology & Digital",
      description: "Modern digital agency website showcasing services, team, and innovative solutions with clean design.",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop&q=80",
      tags: ["React", "Corporate", "Responsive"],
      size: "medium",
      link: "https://base44.com/about-us",
      favicon: "/favicons/base44-favicon.ico",
    },
    {
      title: "Axiom.ai",
      category: "AI & Automation",
      description: "Cutting-edge AI automation platform with sophisticated interface and powerful browser automation tools.",
      image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&auto=format&fit=crop&q=80",
      tags: ["AI", "SaaS", "Automation"],
      size: "medium",
      link: "https://axiom.ai/",
      favicon: "/favicons/axiom-favicon.ico",
    },
  ];

  return (
    <section id="portfolio" className="py-32 relative bg-gradient-to-b from-background to-background/50">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20 animate-fade-in">
            <h2 className="text-4xl md:text-6xl font-bold mb-6">
              <span className="gradient-text">Portfolio</span> Showcase
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Real projects for real businesses. Each one built to award standards and optimized for results.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {projects.map((project, index) => (
              <div
                key={index}
                className={`group glass-strong rounded-2xl overflow-hidden hover-lift animate-fade-in ${
                  project.size === "large" ? "md:col-span-2" : ""
                }`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="relative aspect-video overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end justify-center pb-6">
                    <Button
                      variant="outline"
                      className="glass-strong border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                      onClick={() => window.open(project.link, '_blank')}
                    >
                      View Project <ExternalLink className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                </div>
                <div className="p-6">
                  <div className="text-sm text-primary font-semibold mb-2">{project.category}</div>
                  <div className="flex items-center gap-3 mb-3">
                    {project.favicon && (
                      <img 
                        src={project.favicon} 
                        alt={`${project.title} favicon`}
                        className="w-6 h-6 object-contain"
                      />
                    )}
                    <h3 className="text-2xl font-bold">{project.title}</h3>
                  </div>
                  <p className="text-muted-foreground mb-4">{project.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag, tagIndex) => (
                      <span
                        key={tagIndex}
                        className="text-xs px-3 py-1 rounded-full glass border border-primary/20 text-primary"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center">
            <p className="text-muted-foreground mb-6">
              Want to see your business featured here? Let's build something amazing together.
            </p>
            <Button
              size="lg"
              onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
              className="bg-gradient-to-r from-accent to-accent-glow hover:shadow-glow transition-all duration-500"
            >
              Start Your Free Project
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
