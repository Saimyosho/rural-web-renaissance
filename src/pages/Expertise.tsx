import Navigation from "@/components/Navigation";
import RealTimeWebVitals from "@/components/RealTimeWebVitals";
import BuildStatus from "@/components/BuildStatus";
import AccessibilityShowcase from "@/components/AccessibilityShowcase";
import DesignSystemShowcase from "@/components/DesignSystemShowcase";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Award, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const Expertise = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      
      {/* Breadcrumb */}
      <div className="container mx-auto px-6 pt-32 pb-8">
        <nav className="flex items-center gap-2 text-sm text-muted-foreground">
          <a href="/" className="hover:text-primary transition-colors">Home</a>
          <ChevronRight className="w-4 h-4" />
          <span className="text-foreground">Our Expertise</span>
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
              <Award className="w-4 h-4 mr-2" />
              Technical Excellence
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Our <span className="gradient-sunrise-text">Technical Expertise</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
              Professional-grade development with modern technology stack, comprehensive design system, 
              and performance optimization that exceeds industry standards.
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
                onClick={() => window.location.href = "/process"}
                className="glass border-primary/50"
              >
                See How We Work
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
                <a href="#performance" className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
                  <ChevronRight className="w-4 h-4" />
                  Real-Time Web Vitals
                </a>
                <a href="#ci-cd" className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
                  <ChevronRight className="w-4 h-4" />
                  CI/CD Pipeline Status
                </a>
                <a href="#accessibility" className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
                  <ChevronRight className="w-4 h-4" />
                  Accessibility Compliance
                </a>
                <a href="#design-system" className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
                  <ChevronRight className="w-4 h-4" />
                  Design System & Components
                </a>
                <a href="#certifications" className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
                  <ChevronRight className="w-4 h-4" />
                  Certifications & Standards
                </a>
                <a href="#tech-stack" className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
                  <ChevronRight className="w-4 h-4" />
                  Technology Stack
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <div id="performance">
        <RealTimeWebVitals />
      </div>

      <div id="ci-cd">
        <BuildStatus />
      </div>

      <div id="accessibility">
        <AccessibilityShowcase />
      </div>
      
      <div id="design-system">
        <DesignSystemShowcase />
      </div>

      {/* Certifications Section */}
      <section id="certifications" className="py-20 px-6 bg-gradient-to-b from-background/50 to-background">
        <div className="container mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <Badge className="mb-4" variant="outline">
              <Award className="w-4 h-4 mr-2" />
              Professional Standards
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Certifications & Expertise
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Continuous learning and professional development to deliver cutting-edge solutions
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: "React 18 Expert", desc: "Advanced component architecture and hooks", icon: "⚛️" },
              { title: "TypeScript Professional", desc: "Type-safe development practices", icon: "📘" },
              { title: "WCAG 2.1 AA Certified", desc: "Accessibility compliance specialist", icon: "♿" },
              { title: "Core Web Vitals", desc: "Performance optimization expert", icon: "⚡" },
              { title: "Agile/Scrum Master", desc: "Certified project management", icon: "🎯" },
              { title: "DevOps Engineer", desc: "CI/CD pipeline automation", icon: "🚀" },
              { title: "UX Research", desc: "User-centered design methodology", icon: "🔍" },
              { title: "Security Best Practices", desc: "OWASP compliance and secure coding", icon: "🔒" },
              { title: "Cloud Architecture", desc: "AWS, Azure, Google Cloud certified", icon: "☁️" }
            ].map((cert, index) => (
              <motion.div
                key={cert.title}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="p-6 rounded-xl glass-strong border border-primary/20 hover:border-primary/40 transition-all"
              >
                <div className="text-4xl mb-3">{cert.icon}</div>
                <h3 className="font-semibold text-lg mb-2">{cert.title}</h3>
                <p className="text-sm text-muted-foreground">{cert.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Technology Stack */}
      <section id="tech-stack" className="py-20 px-6 bg-gradient-to-b from-background to-background/50">
        <div className="container mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Modern Technology Stack
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Cutting-edge tools and frameworks for superior results
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              "React 18", "TypeScript", "Node.js", "Python",
              "Vite", "TailwindCSS", "Framer Motion", "Shadcn UI",
              "Supabase", "PostgreSQL", "MongoDB", "Redis",
              "AWS", "Vercel", "Docker", "GitHub Actions"
            ].map((tech, index) => (
              <motion.div
                key={tech}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="p-4 rounded-lg glass text-center font-semibold hover:bg-primary/10 transition-all"
              >
                {tech}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Expertise;
