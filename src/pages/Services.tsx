import { Check, Sparkles, ArrowRight, Calendar, Instagram, Mail, MessageSquare, DollarSign, Facebook, FileText, Workflow, Bot, Zap, Grid3x3, List, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import WireframeBackground from "@/components/WireframeBackground";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

const ServicesPage = () => {
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [showCalculator, setShowCalculator] = useState(false);

  const services = [
    {
      id: "booking",
      icon: Calendar,
      name: "AI Booking System",
      tagline: "Never miss an appointment",
      description: "AI chatbot books appointments 24/7, collects deposits automatically, and sends reminders to reduce no-shows.",
      benefits: [
        "Books appointments while you sleep",
        "Collects deposits via Stripe/PayPal",
        "Automatic confirmation emails",
        "SMS reminders to clients",
        "Reduces no-shows by 70%",
        "Syncs with Google Calendar"
      ],
      tools: ["n8n", "Calendly", "Stripe", "ChatGPT"],
      timeSaved: "10-15 hrs/week",
      pricing: 500,
      monthly: 200,
      gradient: "from-primary to-primary-glow",
      category: "popular",
      featured: true,
    },
    {
      id: "social",
      icon: Instagram,
      name: "Social Media Automation",
      tagline: "Your 24/7 marketing team",
      description: "AI creates engaging posts about your business and publishes them across Facebook, Instagram, and LinkedIn on schedule.",
      benefits: [
        "AI writes engaging content",
        "Posts to Facebook, Instagram, LinkedIn",
        "Automated scheduling",
        "Repurposes your existing content",
        "Consistent brand presence",
        "Includes image suggestions"
      ],
      tools: ["n8n", "ChatGPT", "Buffer", "Canva"],
      timeSaved: "8-12 hrs/week",
      pricing: 400,
      monthly: 200,
      gradient: "from-purple-500 to-purple-700",
      category: "popular",
      featured: true,
    },
    {
      id: "support",
      icon: MessageSquare,
      name: "AI Customer Support",
      tagline: "Answer questions instantly",
      description: "AI chatbot handles common questions, creates support tickets, and escalates complex issues to you automatically.",
      benefits: [
        "Instant responses 24/7",
        "Handles 80% of FAQs",
        "Creates organized tickets",
        "Learns from conversations",
        "Multilingual support",
        "Reduces support workload"
      ],
      tools: ["n8n", "ChatGPT", "Zendesk"],
      timeSaved: "6-10 hrs/week",
      pricing: 600,
      monthly: 250,
      gradient: "from-accent to-accent-glow",
      category: "advanced",
      featured: false,
    },
    {
      id: "invoicing",
      icon: DollarSign,
      name: "Invoice & Payment",
      tagline: "Get paid automatically",
      description: "Generate invoices after job completion, send them automatically, track payments, and send friendly reminders.",
      benefits: [
        "Auto-generate invoices",
        "Track payment status",
        "Send payment reminders",
        "Accept online payments",
        "Syncs with QuickBooks/Wave",
        "Professional PDF invoices"
      ],
      tools: ["Zapier", "QuickBooks", "Stripe"],
      timeSaved: "4-6 hrs/week",
      pricing: 350,
      monthly: 150,
      gradient: "from-green-500 to-green-700",
      category: "all",
      featured: false,
    },
    {
      id: "reviews",
      icon: Facebook,
      name: "Review Collection",
      tagline: "Build your reputation",
      description: "Automatically request reviews after service, post positive ones to social media, and monitor your online reputation.",
      benefits: [
        "Auto-request reviews",
        "Post positive reviews to social",
        "Monitor reputation",
        "Respond to feedback",
        "Build social proof",
        "Track review trends"
      ],
      tools: ["n8n", "Google Reviews", "Trustpilot"],
      timeSaved: "3-5 hrs/week",
      pricing: 300,
      monthly: 150,
      gradient: "from-blue-500 to-blue-700",
      category: "all",
      featured: false,
    },
    {
      id: "leads",
      icon: Mail,
      name: "Lead Nurturing",
      tagline: "Convert more prospects",
      description: "Automatically email leads, score them based on engagement, and notify you when they're ready to buy.",
      benefits: [
        "Automated email sequences",
        "Lead scoring system",
        "Engagement tracking",
        "Sales-ready alerts",
        "Personalized follow-ups",
        "CRM integration"
      ],
      tools: ["Zapier", "ActiveCampaign"],
      timeSaved: "5-8 hrs/week",
      pricing: 450,
      monthly: 200,
      gradient: "from-pink-500 to-pink-700",
      category: "advanced",
      featured: false,
    },
    {
      id: "esign",
      icon: FileText,
      name: "E-Signature Platform",
      tagline: "Sign contracts instantly",
      description: "Send contracts, get electronic signatures, store documents securely, and track completion status.",
      benefits: [
        "Electronic signatures",
        "Secure document storage",
        "Completion tracking",
        "Legal compliance",
        "Faster deal closing",
        "Mobile-friendly signing"
      ],
      tools: ["DocuSign", "HelloSign"],
      timeSaved: "2-4 hrs/week",
      pricing: 250,
      monthly: 100,
      gradient: "from-indigo-500 to-indigo-700",
      category: "all",
      featured: false,
    },
    {
      id: "workflow",
      icon: Workflow,
      name: "Custom Workflows",
      tagline: "Automate anything",
      description: "Have a unique process? I'll build custom automation workflows tailored to your specific business needs.",
      benefits: [
        "Fully customized solution",
        "Multi-step automation",
        "Complex integrations",
        "Your specific requirements",
        "Unlimited possibilities",
        "White-glove service"
      ],
      tools: ["n8n", "Zapier", "Make"],
      timeSaved: "Varies",
      pricing: 0,
      monthly: 0,
      gradient: "from-orange-500 to-orange-700",
      category: "advanced",
      featured: false,
    },
  ];

  const featuredServices = services.filter(s => s.featured);
  const popularServices = services.filter(s => s.category === "popular");
  const advancedServices = services.filter(s => s.category === "advanced");

  const toggleService = (id: string) => {
    setSelectedServices(prev =>
      prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]
    );
    if (!showCalculator && !selectedServices.includes(id)) {
      setShowCalculator(true);
    }
  };

  const calculateTotal = () => {
    const selected = services.filter(s => selectedServices.includes(s.id));
    const setupTotal = selected.reduce((sum, service) => sum + service.pricing, 0);
    const monthlyTotal = selected.reduce((sum, service) => sum + service.monthly, 0);
    return { setup: setupTotal, monthly: monthlyTotal };
  };

  const ServiceCard = ({ service, featured = false }: { service: typeof services[0], featured?: boolean }) => {
    const isSelected = selectedServices.includes(service.id);
    const Icon = service.icon;

    if (viewMode === "list") {
      return (
        <motion.div
          layout
          className={`glass-strong rounded-2xl p-6 hover-lift cursor-pointer transition-all ${
            isSelected ? 'ring-2 ring-primary shadow-glow' : ''
          }`}
          onClick={() => toggleService(service.id)}
        >
          <div className="flex items-start gap-6">
            <div className={`p-4 rounded-xl bg-gradient-to-br ${service.gradient} text-white flex-shrink-0`}>
              <Icon className="w-8 h-8" />
            </div>
            
            <div className="flex-1">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h3 className="text-2xl font-bold mb-1">{service.name}</h3>
                  <p className="text-primary font-semibold">{service.tagline}</p>
                </div>
                <Button
                  variant={isSelected ? "default" : "outline"}
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleService(service.id);
                  }}
                >
                  {isSelected ? <><Check className="w-4 h-4 mr-2" />Selected</> : 'Select'}
                </Button>
              </div>

              <p className="text-muted-foreground mb-4">{service.description}</p>

              <div className="grid md:grid-cols-2 gap-3 mb-4">
                {service.benefits.map((benefit, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-sm">
                    <Check className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-muted-foreground">{benefit}</span>
                  </div>
                ))}
              </div>

              <div className="flex items-center gap-6 pt-4 border-t border-border/50">
                <div>
                  <div className="text-sm text-muted-foreground">Time Saved</div>
                  <div className="font-semibold text-primary">{service.timeSaved}</div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Setup Cost</div>
                  <div className="font-semibold">${service.pricing > 0 ? service.pricing.toLocaleString() : 'Custom'}</div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Monthly</div>
                  <div className="font-semibold">${service.monthly}/mo</div>
                </div>
                <div className="flex-1">
                  <div className="flex flex-wrap gap-2">
                    {service.tools.map((tool, idx) => (
                      <Badge key={idx} variant="outline" className="text-xs">
                        {tool}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      );
    }

    return (
      <motion.div
        layout
        whileHover={{ y: -5 }}
        className={`glass-strong rounded-2xl overflow-hidden hover-lift cursor-pointer transition-all h-full flex flex-col ${
          isSelected ? 'ring-2 ring-primary shadow-glow' : ''
        } ${featured ? 'md:col-span-1' : ''}`}
        onClick={() => toggleService(service.id)}
      >
        <CardHeader>
          <div className={`inline-flex p-4 rounded-xl bg-gradient-to-br ${service.gradient} text-white mb-4 w-fit`}>
            <Icon className="w-8 h-8" />
          </div>
          <CardTitle className="text-xl">{service.name}</CardTitle>
          <CardDescription className="text-base font-semibold text-primary">
            {service.tagline}
          </CardDescription>
        </CardHeader>

        <CardContent className="flex-1 flex flex-col">
          <p className="text-muted-foreground mb-4">{service.description}</p>

          <div className="space-y-2 mb-4">
            {service.benefits.slice(0, 3).map((benefit, idx) => (
              <div key={idx} className="flex items-start gap-2 text-sm">
                <Check className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                <span className="text-muted-foreground">{benefit}</span>
              </div>
            ))}
          </div>

          <div className="mt-auto pt-4 border-t border-border/50 space-y-3">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Time Saved:</span>
              <span className="font-semibold text-primary">{service.timeSaved}</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Setup:</span>
              <span className="font-semibold">${service.pricing > 0 ? service.pricing.toLocaleString() : 'Custom'}</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Monthly:</span>
              <span className="font-semibold">${service.monthly}/mo</span>
            </div>

            <Button
              className={`w-full mt-2 ${
                isSelected ? 'bg-gradient-to-r from-primary to-accent' : ''
              }`}
              variant={isSelected ? "default" : "outline"}
              onClick={(e) => {
                e.stopPropagation();
                toggleService(service.id);
              }}
            >
              {isSelected ? <><Check className="w-4 h-4 mr-2" />Selected</> : 'Add to Package'}
            </Button>
          </div>
        </CardContent>
      </motion.div>
    );
  };

  const totals = calculateTotal();

  return (
    <div className="min-h-screen">
      <Navigation />

      {/* Hero */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <WireframeBackground variant="circuit" density="medium" animate={true} />
        
        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-4xl mx-auto mb-16"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-6 border border-primary/20">
              <Bot className="w-4 h-4 text-primary" />
              <span className="text-sm font-semibold">Business Automation Services</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Save <span className="gradient-sunrise-text">20+ Hours</span> Every Week
            </h1>
            
            <p className="text-xl text-muted-foreground mb-8">
              Choose the automation services that fit your business. Mix and match to build your perfect package.
            </p>
          </motion.div>

          {/* Featured Services */}
          <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {featuredServices.map((service) => (
              <ServiceCard key={service.id} service={service} featured />
            ))}
          </div>
        </div>
      </section>

      {/* All Services with Tabs */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl md:text-4xl font-bold">
              All <span className="gradient-text">Services</span>
            </h2>

            <div className="flex items-center gap-2">
              <Button
                variant={viewMode === "grid" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode("grid")}
              >
                <Grid3x3 className="w-4 h-4 mr-2" />
                Grid
              </Button>
              <Button
                variant={viewMode === "list" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode("list")}
              >
                <List className="w-4 h-4 mr-2" />
                List
              </Button>
            </div>
          </div>

          <Tabs defaultValue="all" className="w-full">
            <TabsList className="grid w-full max-w-md grid-cols-3 mb-8">
              <TabsTrigger value="all">All Services</TabsTrigger>
              <TabsTrigger value="popular">Popular</TabsTrigger>
              <TabsTrigger value="advanced">Advanced</TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="space-y-6">
              <div className={viewMode === "grid" ? "grid md:grid-cols-2 lg:grid-cols-3 gap-6" : "space-y-4"}>
                {services.map((service) => (
                  <ServiceCard key={service.id} service={service} />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="popular" className="space-y-6">
              <div className={viewMode === "grid" ? "grid md:grid-cols-2 gap-6" : "space-y-4"}>
                {popularServices.map((service) => (
                  <ServiceCard key={service.id} service={service} />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="advanced" className="space-y-6">
              <div className={viewMode === "grid" ? "grid md:grid-cols-2 lg:grid-cols-3 gap-6" : "space-y-4"}>
                {advancedServices.map((service) => (
                  <ServiceCard key={service.id} service={service} />
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Floating Calculator */}
      <AnimatePresence>
        {showCalculator && selectedServices.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 100 }}
            className="fixed bottom-6 right-6 z-50 max-w-md"
          >
            <Card className="glass-strong border-primary/30 shadow-glow">
              <CardHeader className="flex flex-row items-center justify-between pb-3">
                <CardTitle className="text-lg">Your Package ({selectedServices.length})</CardTitle>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowCalculator(false)}
                >
                  <X className="w-4 h-4" />
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 mb-4 max-h-48 overflow-y-auto">
                  {services.filter(s => selectedServices.includes(s.id)).map((service) => (
                    <div key={service.id} className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">{service.name}</span>
                      <span className="font-semibold">${service.pricing > 0 ? service.pricing : 'TBD'}</span>
                    </div>
                  ))}
                </div>

                <div className="pt-3 border-t border-border/50 space-y-2 mb-4">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold">Setup Total:</span>
                    <span className="text-2xl font-bold gradient-text">
                      ${totals.setup > 0 ? totals.setup.toLocaleString() : 'TBD'}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Monthly:</span>
                    <span className="font-semibold">${totals.monthly}/mo</span>
                  </div>
                </div>

                <Button
                  size="lg"
                  className="w-full bg-gradient-to-r from-primary to-accent"
                  onClick={() => window.location.href = "/#contact"}
                >
                  Request Quote
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <Sparkles className="w-12 h-12 text-primary mx-auto mb-6" />
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Not Sure What You Need?
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Book a free consultation. I'll analyze your workflow and recommend the perfect automation package.
            </p>
            <Button
              size="lg"
              onClick={() => window.location.href = "/#contact"}
              className="bg-gradient-to-r from-primary to-accent"
            >
              Schedule Free Consultation
              <Calendar className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ServicesPage;
