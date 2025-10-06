import { Check, ArrowRight, Calendar, Instagram, Mail, MessageSquare, DollarSign, Facebook, FileText, Workflow, Bot, Zap, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import WireframeBackground from "@/components/WireframeBackground";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { useState } from "react";

const ServicesPage = () => {
  const [email, setEmail] = useState("");

  const quickLinks = [
    {
      icon: Zap,
      title: "Popular Services",
      description: "AI Booking & Social Media",
      href: "#popular"
    },
    {
      icon: Bot,
      title: "All Automations",
      description: "Browse complete catalog",
      href: "#all-services"
    },
    {
      icon: Calendar,
      title: "Get Started",
      description: "Book free consultation",
      href: "#contact"
    },
    {
      icon: FileText,
      title: "Pricing Guide",
      description: "Transparent costs",
      href: "/pricing"
    },
  ];

  const services = [
    {
      id: "booking",
      icon: Calendar,
      name: "AI Booking System",
      tagline: "Never miss an appointment",
      description: "Your AI receptionist that never sleeps. Books appointments 24/7, collects deposits automatically, and sends reminders that actually work.",
      benefits: [
        "Books appointments while you sleep",
        "Automatic deposit collection",
        "Smart SMS reminders",
        "Reduces no-shows by 70%"
      ],
      pricing: "$500 setup + $200/mo",
      timeSaved: "10-15 hrs/week",
      image: "booking",
      popular: true
    },
    {
      id: "social",
      icon: Instagram,
      name: "Social Media Automation",
      tagline: "Your 24/7 marketing team",
      description: "AI creates engaging posts about your business and publishes them across Facebook, Instagram, and LinkedIn. Consistent presence, zero effort.",
      benefits: [
        "AI writes your content",
        "Posts to all platforms",
        "Automated scheduling",
        "Consistent brand voice"
      ],
      pricing: "$400 setup + $200/mo",
      timeSaved: "8-12 hrs/week",
      image: "social",
      popular: true
    },
    {
      id: "support",
      icon: MessageSquare,
      name: "AI Customer Support",
      tagline: "Instant answers, happy customers",
      description: "AI chatbot handles common questions, creates organized tickets, and escalates complex issues. Your customers get instant help, you get more time.",
      benefits: [
        "24/7 instant responses",
        "Handles 80% of FAQs",
        "Smart ticket routing",
        "Learns over time"
      ],
      pricing: "$600 setup + $250/mo",
      timeSaved: "6-10 hrs/week",
      image: "support",
      popular: false
    },
    {
      id: "invoicing",
      icon: DollarSign,
      name: "Invoice & Payment",
      tagline: "Get paid on autopilot",
      description: "Generate invoices, send them automatically, track payments, and send friendly reminders. Professional billing without the busywork.",
      benefits: [
        "Auto-generate invoices",
        "Track payment status",
        "Smart reminders",
        "Syncs with QuickBooks"
      ],
      pricing: "$350 setup + $150/mo",
      timeSaved: "4-6 hrs/week",
      image: "invoicing",
      popular: false
    },
    {
      id: "reviews",
      icon: Facebook,
      name: "Review Collection",
      tagline: "Build your reputation automatically",
      description: "Request reviews after service, post the good ones to social media, and monitor your online reputation. Social proof on autopilot.",
      benefits: [
        "Auto-request reviews",
        "Post to social media",
        "Monitor reputation",
        "Build social proof"
      ],
      pricing: "$300 setup + $150/mo",
      timeSaved: "3-5 hrs/week",
      image: "reviews",
      popular: false
    },
    {
      id: "leads",
      icon: Mail,
      name: "Lead Nurturing",
      tagline: "Turn prospects into customers",
      description: "Automated email sequences that score leads based on engagement and alert you when they're ready to buy. Smart follow-up, zero effort.",
      benefits: [
        "Smart email sequences",
        "Lead scoring",
        "Engagement tracking",
        "Sales-ready alerts"
      ],
      pricing: "$450 setup + $200/mo",
      timeSaved: "5-8 hrs/week",
      image: "leads",
      popular: false
    },
  ];

  const popularServices = services.filter(s => s.popular);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Section */}
      <section className="relative pt-32 pb-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-background to-background" />
        
        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              The Automation Framework<br />for <span className="gradient-sunrise-text">Business Owners</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-3xl mx-auto">
              Save 20+ hours every week with AI that actually works.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
              <Button
                size="lg"
                className="bg-gradient-to-r from-primary to-accent text-lg px-8 py-6"
                onClick={() => document.getElementById("popular")?.scrollIntoView({ behavior: "smooth" })}
              >
                Browse Services
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="text-lg px-8 py-6"
                onClick={() => window.location.href = "/#contact"}
              >
                Book Consultation
              </Button>
            </div>

            {/* Email Signup */}
            <div className="max-w-md mx-auto">
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="Get notified about new automations"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 px-4 py-3 rounded-lg glass border border-border/50 focus:border-primary focus:outline-none transition-colors"
                />
                <Button
                  onClick={() => {
                    if (email) {
                      alert("Thanks! We'll keep you updated.");
                      setEmail("");
                    }
                  }}
                >
                  <Check className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Quick Links Grid */}
      <section className="py-16 border-y border-border/50">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
            {quickLinks.map((link, index) => (
              <motion.a
                key={link.title}
                href={link.href}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="glass-strong rounded-xl p-6 hover-lift group cursor-pointer border border-border/50 hover:border-primary/50 transition-all"
              >
                <link.icon className="w-8 h-8 text-primary mb-4 group-hover:scale-110 transition-transform" />
                <h3 className="text-lg font-bold mb-2 group-hover:text-primary transition-colors">
                  {link.title}
                </h3>
                <p className="text-sm text-muted-foreground mb-3">{link.description}</p>
                <div className="flex items-center text-sm text-primary font-semibold">
                  <span>Learn more</span>
                  <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* What is This? */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              What is This?
            </h2>
            <p className="text-xl text-muted-foreground mb-4">
              Business automation that solves the "I don't have time" problem.
            </p>
            <p className="text-lg text-muted-foreground">
              It does other things too, but that's the gist of it.
            </p>
          </div>
        </div>
      </section>

      {/* Popular Services - Visual Comparisons */}
      <section id="popular" className="py-24 bg-gradient-to-b from-background to-primary/5">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto space-y-32">
            {popularServices.map((service, index) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className={`flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-12 items-center`}
              >
                {/* Visual/Image Side */}
                <div className="flex-1">
                  <div className="glass-strong rounded-2xl p-8 border border-primary/20 min-h-[400px] flex items-center justify-center">
                    <div className="text-center">
                      <service.icon className="w-24 h-24 text-primary mx-auto mb-6" />
                      <div className="text-6xl font-bold gradient-text mb-4">{service.timeSaved}</div>
                      <div className="text-muted-foreground">saved every week</div>
                    </div>
                  </div>
                </div>

                {/* Content Side */}
                <div className="flex-1">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass border border-primary/30 mb-4">
                    <service.icon className="w-4 h-4 text-primary" />
                    <span className="text-sm font-semibold">Popular</span>
                  </div>
                  
                  <h3 className="text-4xl md:text-5xl font-bold mb-4">
                    {service.name}
                  </h3>
                  
                  <p className="text-xl text-primary font-semibold mb-6">
                    {service.tagline}
                  </p>
                  
                  <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                    {service.description}
                  </p>

                  <div className="space-y-3 mb-8">
                    {service.benefits.map((benefit, idx) => (
                      <div key={idx} className="flex items-start gap-3">
                        <div className="p-1 rounded-full bg-primary/20 mt-1">
                          <Check className="w-4 h-4 text-primary" />
                        </div>
                        <span className="text-muted-foreground">{benefit}</span>
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center gap-6 mb-8">
                    <div>
                      <div className="text-sm text-muted-foreground mb-1">Investment</div>
                      <div className="text-xl font-bold">{service.pricing}</div>
                    </div>
                  </div>

                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-primary to-accent"
                    onClick={() => window.location.href = "/#contact"}
                  >
                    Get Started
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* All Services Grid */}
      <section id="all-services" className="py-24">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              All Services
            </h2>
            <p className="text-xl text-muted-foreground">
              Mix and match to build your perfect automation stack.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {services.map((service, index) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="glass-strong h-full hover-lift border border-border/50 hover:border-primary/50 transition-all">
                  <CardHeader>
                    <div className="flex items-center justify-between mb-4">
                      <div className="p-3 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20">
                        <service.icon className="w-6 h-6 text-primary" />
                      </div>
                      {service.popular && (
                        <span className="text-xs px-2 py-1 rounded-full bg-primary/20 text-primary font-semibold">
                          Popular
                        </span>
                      )}
                    </div>
                    <CardTitle className="text-xl">{service.name}</CardTitle>
                    <CardDescription className="text-base">
                      {service.tagline}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 mb-6">
                      {service.benefits.slice(0, 3).map((benefit, idx) => (
                        <div key={idx} className="flex items-start gap-2 text-sm">
                          <Check className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                          <span className="text-muted-foreground">{benefit}</span>
                        </div>
                      ))}
                    </div>

                    <div className="pt-4 border-t border-border/50 space-y-2 mb-4">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Time Saved</span>
                        <span className="font-semibold text-primary">{service.timeSaved}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Cost</span>
                        <span className="font-semibold">{service.pricing}</span>
                      </div>
                    </div>

                    <Button
                      variant="outline"
                      className="w-full"
                      onClick={() => window.location.href = "/#contact"}
                    >
                      Learn More
                      <ChevronRight className="w-4 h-4 ml-2" />
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 border-t border-border/50">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Get ready to fall in love with<br />business automation <span className="gradient-accent-text">all over again</span>.
            </h2>
            <p className="text-xl text-muted-foreground mb-12">
              Book a free consultation to see what's possible for your business.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-gradient-to-r from-primary to-accent text-lg px-8 py-6"
                onClick={() => window.location.href = "/#contact"}
              >
                Book Free Consultation
                <Calendar className="w-5 h-5 ml-2" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="text-lg px-8 py-6"
                onClick={() => window.location.href = "/pricing"}
              >
                View Pricing
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ServicesPage;
