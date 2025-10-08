import Navigation from "@/components/Navigation";
import DevProcessShowcase from "@/components/DevProcessShowcase";
import UXProcessShowcase from "@/components/UXProcessShowcase";
import CollaborationShowcase from "@/components/CollaborationShowcase";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Workflow, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const Process = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      
      {/* Breadcrumb */}
      <div className="container mx-auto px-6 pt-32 pb-8">
        <nav className="flex items-center gap-2 text-sm text-muted-foreground">
          <a href="/" className="hover:text-primary transition-colors">Home</a>
          <ChevronRight className="w-4 h-4" />
          <span className="text-foreground">Our Process</span>
        </nav>
      </div>

      {/* Hero Section */}
      <section className="py-20 px-6 bg-gradient-to-b from-background to-background/50">
        <div className="container mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <Badge className="mb-4" variant="outline">
              <Workflow className="w-4 h-4 mr-2" />
              Professional Methodology
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              How We <span className="gradient-sunrise-text">Work Together</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
              Transparent, collaborative, and proven processes from discovery to deployment. 
              Agile methodology meets user-centered design for exceptional results.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button
                size="lg"
                onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
                className="bg-gradient-to-r from-primary to-bridge hover:shadow-glow"
              >
                Start Your Project
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => window.location.href = "/expertise"}
                className="glass border-primary/50"
              >
                View Our Expertise
              </Button>
            </div>
          </motion.div>

          {/* Table of Contents */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="max-w-4xl mx-auto mb-12"
          >
            <div className="glass-strong p-6 rounded-xl border border-primary/20">
              <h3 className="text-lg font-semibold mb-4">On This Page</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <a href="#dev-process" className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
                  <ChevronRight className="w-4 h-4" />
                  Development Process & CI/CD
                </a>
                <a href="#ux-process" className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
                  <ChevronRight className="w-4 h-4" />
                  UX/UI Design Process
                </a>
                <a href="#collaboration" className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
                  <ChevronRight className="w-4 h-4" />
                  Collaboration & Communication
                </a>
                <a href="#timeline" className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
                  <ChevronRight className="w-4 h-4" />
                  Project Timeline
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <div id="dev-process">
        <DevProcessShowcase />
      </div>
      
      <div id="ux-process">
        <UXProcessShowcase />
      </div>

      <div id="collaboration">
        <CollaborationShowcase />
      </div>

      {/* Project Timeline Overview */}
      <section id="timeline" className="py-20 px-6 bg-gradient-to-b from-background/50 to-background">
        <div className="container mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <Badge className="mb-4" variant="outline">
              <Workflow className="w-4 h-4 mr-2" />
              Typical Timeline
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              From Concept to Launch
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              A realistic timeline for most projects with clear milestones
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-bridge to-accent" />

              {[
                {
                  week: "Week 1-2",
                  phase: "Discovery & Planning",
                  activities: [
                    "Initial consultation & requirements gathering",
                    "User research & competitive analysis",
                    "Project scope & timeline finalization",
                    "Design wireframes & sitemap"
                  ]
                },
                {
                  week: "Week 3-4",
                  phase: "Design & Prototyping",
                  activities: [
                    "High-fidelity UI designs",
                    "Design system creation",
                    "Interactive prototypes",
                    "Client review & revisions"
                  ]
                },
                {
                  week: "Week 5-8",
                  phase: "Development",
                  activities: [
                    "Frontend development (React/TypeScript)",
                    "Backend API & database setup",
                    "Component integration",
                    "Weekly progress demos"
                  ]
                },
                {
                  week: "Week 9-10",
                  phase: "Testing & Refinement",
                  activities: [
                    "Comprehensive QA testing",
                    "Performance optimization",
                    "Accessibility compliance",
                    "User acceptance testing"
                  ]
                },
                {
                  week: "Week 11",
                  phase: "Launch & Training",
                  activities: [
                    "Production deployment",
                    "Domain & SSL setup",
                    "Client training session",
                    "Documentation handoff"
                  ]
                },
                {
                  week: "Ongoing",
                  phase: "Support & Iteration",
                  activities: [
                    "30-day post-launch support",
                    "Analytics monitoring",
                    "User feedback collection",
                    "Continuous improvements"
                  ]
                }
              ].map((item, index) => (
                <motion.div
                  key={item.phase}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="relative pl-20 pb-12 last:pb-0"
                >
                  {/* Timeline dot */}
                  <div className="absolute left-6 top-2 w-5 h-5 rounded-full bg-primary border-4 border-background" />
                  
                  <div className="glass-strong p-6 rounded-xl border border-primary/20 hover:border-primary/40 transition-all">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <Badge variant="outline" className="mb-2">{item.week}</Badge>
                        <h3 className="text-xl font-semibold">{item.phase}</h3>
                      </div>
                    </div>
                    <ul className="space-y-2">
                      {item.activities.map((activity, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                          <ChevronRight className="w-4 h-4 mt-0.5 text-primary flex-shrink-0" />
                          <span>{activity}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mt-12"
          >
            <p className="text-muted-foreground mb-6">
              Timeline may vary based on project complexity and scope. We'll provide a detailed timeline during discovery.
            </p>
            <Button
              size="lg"
              onClick={() => window.location.href = "/#contact"}
              className="bg-gradient-to-r from-primary to-accent hover:shadow-glow"
            >
              Get Your Custom Timeline
            </Button>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Process;
