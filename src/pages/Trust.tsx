import { Shield, Lock, Eye, Heart, Leaf, Users, CheckCircle2, ExternalLink } from "lucide-react";
import { motion } from "framer-motion";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const Trust = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  const values = [
    {
      icon: Shield,
      title: "Privacy by Design",
      description: "Your data security isn't a feature—it's our foundation. We collect only what's essential and never sell your information.",
      details: [
        "End-to-end encryption for all sensitive data",
        "GDPR and CCPA compliant from day one",
        "Regular third-party security audits",
        "You own your data—export or delete anytime"
      ]
    },
    {
      icon: Eye,
      title: "Radical Transparency",
      description: "No hidden fees, no surprise charges. You know exactly what you pay for and why.",
      details: [
        "Open pricing—no negotiations needed",
        "Clear service-level agreements (SLAs)",
        "Real-time billing dashboard",
        "30-day money-back guarantee on all paid services"
      ]
    },
    {
      icon: Users,
      title: "Accessibility for All",
      description: "15% of the world has a disability. Our sites work for everyone, not just some.",
      details: [
        "WCAG 2.1 AA compliant (minimum standard)",
        "Screen reader tested and optimized",
        "Keyboard navigation on every interaction",
        "Color contrast ratios exceed requirements"
      ]
    },
    {
      icon: Leaf,
      title: "Sustainable by Default",
      description: "Enterprise quality doesn't have to destroy the planet. Our lean code = lower carbon footprint.",
      details: [
        "77% smaller bundle sizes (Brotli compression)",
        "Green hosting powered by renewable energy",
        "Optimized images reduce data transfer",
        "Efficient code = faster sites = less energy"
      ]
    },
    {
      icon: Heart,
      title: "Expert-Built, Not Automated",
      description: "AI-certified engineer with ML, deep learning, and prompt engineering expertise builds your site.",
      details: [
        "Certified in AI prompt & context engineering",
        "Deep learning & machine learning specialist",
        "Azure AI & Microsoft integrations expert",
        "Enterprise-grade solutions for Main Street"
      ]
    },
    {
      icon: Lock,
      title: "Security Standards",
      description: "Bank-level security for every client, regardless of size.",
      details: [
        "SSL/TLS encryption on all connections",
        "Regular automated security scans",
        "Two-factor authentication available",
        "Secure payment processing (PCI DSS compliant)"
      ]
    }
  ];

  const dataWeCollect = [
    { what: "Page visits & button clicks", why: "Improve user experience", shared: "Never" },
    { what: "Form submissions", why: "Respond to inquiries", shared: "Never" },
    { what: "Performance metrics", why: "Optimize site speed", shared: "Aggregated only" },
  ];

  const dataWeDontCollect = [
    "Cross-site tracking cookies",
    "Personal browsing history",
    "Third-party ad targeting data",
    "Social media activity",
    "Biometric information",
    "Location data (unless explicitly needed)"
  ];

  return (
    <div className="min-h-screen">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-background to-background" />
        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-6 border border-primary/20">
              <Shield className="w-4 h-4 text-primary" />
              <span className="text-sm font-semibold">Trust & Transparency Center</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              <span className="gradient-sunrise-text">Trust</span> is Earned,
              <br />Not Assumed
            </h1>
            
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              We believe you deserve to know exactly how we handle your data, what we collect, 
              and why our values align with your success.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                onClick={() => document.getElementById("privacy")?.scrollIntoView({ behavior: "smooth" })}
                className="bg-gradient-to-r from-primary to-bridge"
              >
                Our Privacy Commitment
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => document.getElementById("values")?.scrollIntoView({ behavior: "smooth" })}
                className="border-primary/50"
              >
                Core Values
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Core Values Grid */}
      <section id="values" className="py-20">
        <div className="container mx-auto px-6">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {values.map((value, index) => (
              <motion.div key={index} variants={itemVariants}>
                <Card className="glass-strong border-primary/20 hover:border-primary/40 transition-all duration-300 h-full">
                  <CardHeader>
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center mb-4">
                      <value.icon className="w-6 h-6 text-primary" />
                    </div>
                    <CardTitle className="text-xl">{value.title}</CardTitle>
                    <CardDescription className="text-base">{value.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {value.details.map((detail, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-sm text-muted-foreground">
                          <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                          <span>{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Privacy Section */}
      <section id="privacy" className="py-20 bg-gradient-to-b from-background to-primary/5">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">
              Crystal Clear <span className="gradient-text">Privacy Policy</span>
            </h2>
            <p className="text-lg text-muted-foreground mb-12 text-center">
              No legal jargon. Here's exactly what we collect and why.
            </p>

            {/* What We Collect */}
            <Card className="glass-strong mb-8">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Eye className="w-5 h-5 text-primary" />
                  What We Collect
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-border/50">
                        <th className="text-left py-3 px-4 font-semibold">Data Type</th>
                        <th className="text-left py-3 px-4 font-semibold">Why We Need It</th>
                        <th className="text-left py-3 px-4 font-semibold">Shared?</th>
                      </tr>
                    </thead>
                    <tbody>
                      {dataWeCollect.map((item, idx) => (
                        <tr key={idx} className="border-b border-border/30">
                          <td className="py-3 px-4 text-sm">{item.what}</td>
                          <td className="py-3 px-4 text-sm text-muted-foreground">{item.why}</td>
                          <td className="py-3 px-4">
                            <span className="text-xs px-2 py-1 rounded-full bg-green-500/20 text-green-500">
                              {item.shared}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>

            {/* What We DON'T Collect */}
            <Card className="glass-strong">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="w-5 h-5 text-green-500" />
                  What We DON'T Collect
                </CardTitle>
                <CardDescription>
                  We specifically avoid these common tracking methods
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid sm:grid-cols-2 gap-3">
                  {dataWeDontCollect.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-sm">
                      <div className="w-2 h-2 rounded-full bg-green-500" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Accessibility Commitment */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Built for <span className="gradient-accent-text">Everyone</span>
              </h2>
              <p className="text-lg text-muted-foreground">
                Accessibility isn't optional—it's how we build from day one.
              </p>
            </motion.div>

            <Card className="glass-strong">
              <CardContent className="pt-6">
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                      <CheckCircle2 className="w-5 h-5 text-primary" />
                      Our Standards
                    </h3>
                    <ul className="space-y-3 text-sm text-muted-foreground">
                      <li className="flex items-start gap-2">
                        <span className="text-primary">•</span>
                        WCAG 2.1 Level AA compliance (minimum)
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-primary">•</span>
                        Tested with NVDA, JAWS, and VoiceOver
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-primary">•</span>
                        Keyboard navigation on 100% of features
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-primary">•</span>
                        Minimum 4.5:1 color contrast ratios
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-primary">•</span>
                        Captions and transcripts for all media
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                      <Heart className="w-5 h-5 text-accent" />
                      Why It Matters
                    </h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      1 in 7 people have a disability. That's 15% of potential customers who can't use inaccessible websites.
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Beyond business, it's the right thing to do. Technology should empower everyone, not create barriers.
                    </p>
                  </div>
                </div>

                <div className="mt-8 pt-8 border-t border-border/50">
                  <p className="text-sm text-muted-foreground text-center">
                    Found an accessibility issue?{" "}
                    <a href="#contact" className="text-primary hover:underline">
                      Report it here
                    </a>{" "}
                    and we'll fix it within 48 hours.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Certifications & Compliance */}
      <section className="py-20 bg-gradient-to-b from-primary/5 to-background">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto text-center"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Compliance & <span className="gradient-text">Certifications</span>
            </h2>
            <p className="text-lg text-muted-foreground mb-12">
              We meet or exceed industry security and privacy standards
            </p>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {["GDPR", "CCPA", "PCI DSS", "WCAG 2.1 AA"].map((cert, idx) => (
                <Card key={idx} className="glass-strong hover:border-primary/40 transition-all">
                  <CardContent className="pt-6 text-center">
                    <CheckCircle2 className="w-8 h-8 text-green-500 mx-auto mb-3" />
                    <p className="font-semibold">{cert}</p>
                    <p className="text-xs text-muted-foreground mt-1">Compliant</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="mt-12 p-6 rounded-xl glass-strong border border-primary/20">
              <p className="text-sm text-muted-foreground">
                Want proof? Request our latest security audit or compliance certificates.{" "}
                <Button variant="link" className="text-primary p-0 h-auto">
                  Contact us <ExternalLink className="w-3 h-3 ml-1 inline" />
                </Button>
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Trust;
