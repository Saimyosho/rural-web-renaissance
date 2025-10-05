import { Check, Sparkles, Zap, ArrowRight, Calendar, MessageSquare, DollarSign, Mail, Instagram, Facebook } from "lucide-react";
import { Button } from "@/components/ui/button";
import WireframeBackground from "@/components/WireframeBackground";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";

const Pricing = () => {
  const scrollToContact = () => {
    window.location.href = "/#contact";
  };

  const automationExamples = [
    {
      icon: <Calendar className="w-6 h-6" />,
      title: "Appointment Booking",
      description: "AI chatbot books appointments, sends confirmations, collects deposits, and sends reminders automatically",
      tools: "n8n + Calendly + Stripe",
    },
    {
      icon: <Instagram className="w-6 h-6" />,
      title: "Social Media Automation",
      description: "AI creates engaging posts about your business and publishes them across Facebook, Instagram, and LinkedIn on schedule",
      tools: "n8n + ChatGPT + Buffer",
    },
    {
      icon: <Mail className="w-6 h-6" />,
      title: "Lead Nurturing",
      description: "Automatically email leads, score them based on engagement, and notify you when they're ready to buy",
      tools: "Zapier + ActiveCampaign",
    },
    {
      icon: <MessageSquare className="w-6 h-6" />,
      title: "Customer Support",
      description: "AI chatbot answers FAQs, creates support tickets, and hands off complex issues to you",
      tools: "n8n + ChatGPT + Zendesk",
    },
    {
      icon: <DollarSign className="w-6 h-6" />,
      title: "Invoice & Payment",
      description: "Generate invoices automatically after job completion, send them, track payments, and send reminders",
      tools: "Zapier + QuickBooks + Stripe",
    },
    {
      icon: <Facebook className="w-6 h-6" />,
      title: "Review Collection",
      description: "Automatically request reviews after service, post positive ones to social media, track reputation",
      tools: "n8n + Google Reviews + Social Media",
    },
  ];

  const pricingTiers = [
    {
      name: "Quick Start",
      price: "$1,500",
      monthly: "$200/mo",
      description: "Perfect for getting started with automation",
      features: [
        "3 custom automation workflows",
        "Basic n8n or Zapier setup",
        "1 month of support & tweaks",
        "Setup consultation call",
        "Documentation & training",
      ],
      cta: "Get Started",
      popular: false,
    },
    {
      name: "Growth Package",
      price: "$3,500",
      monthly: "$400/mo",
      description: "Complete automation system for growing businesses",
      features: [
        "8-10 custom workflows",
        "Advanced integrations",
        "AI chatbot setup (ChatGPT)",
        "3 months support included",
        "Priority response time",
        "Monthly optimization calls",
      ],
      cta: "Most Popular",
      popular: true,
    },
    {
      name: "Enterprise",
      price: "Custom",
      monthly: "$600+/mo",
      description: "Unlimited automation for serious operations",
      features: [
        "Unlimited workflows",
        "Complex multi-step automation",
        "Dedicated automation manager",
        "24/7 monitoring",
        "Custom integrations",
        "White-glove service",
      ],
      cta: "Contact Us",
      popular: false,
    },
  ];

  return (
    <div className="min-h-screen">
      <Navigation />
      {/* Hero Section */}
      <section className="relative py-32 overflow-hidden">
        <WireframeBackground variant="circuit" density="low" animate={true} />
        
        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            className="text-center max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-8 border border-primary/30">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-sm font-semibold">AI Automation Pricing</span>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              <span className="gradient-text">Free Website.</span>
              <br />
              <span className="text-foreground">Paid Automation.</span>
            </h1>

            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              I build your custom website for free while building my portfolio. 
              The value comes from AI automation that saves you 10-20 hours per week.
            </p>

            <div className="glass-strong rounded-2xl p-6 max-w-2xl mx-auto">
              <p className="text-lg font-semibold mb-2">Here's How It Works:</p>
              <ol className="text-left text-muted-foreground space-y-2">
                <li className="flex items-start gap-2">
                  <span className="text-primary font-bold">1.</span>
                  <span>You get a custom, award-quality website - completely free</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary font-bold">2.</span>
                  <span>I show you what AI automation can do for your business</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary font-bold">3.</span>
                  <span>You choose the automation you want - social media, booking, invoicing, etc.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary font-bold">4.</span>
                  <span>I build custom workflows using n8n and Zapier tailored to your needs</span>
                </li>
              </ol>
            </div>
          </motion.div>
        </div>
      </section>

      {/* What Can Be Automated Section */}
      <section className="py-20 relative">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              What Can <span className="gradient-accent-text">Be Automated?</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Using n8n and Zapier, I can automate virtually any repetitive task in your business. Here are real examples:
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
            {automationExamples.map((example, index) => (
              <motion.div
                key={index}
                className="glass-strong rounded-2xl p-6 hover-lift"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="inline-flex p-3 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 text-primary mb-4">
                  {example.icon}
                </div>
                <h3 className="text-xl font-bold mb-2">{example.title}</h3>
                <p className="text-muted-foreground text-sm mb-3">
                  {example.description}
                </p>
                <div className="text-xs text-primary/70 font-mono">
                  {example.tools}
                </div>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-12">
            <p className="text-muted-foreground mb-4">
              These are just examples. Tell me what eats up your time, and I'll automate it.
            </p>
          </div>
        </div>
      </section>

      {/* Pricing Tiers Section */}
      <section className="py-20 relative">
        <WireframeBackground variant="dots" density="low" animate={true} />
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Simple, <span className="gradient-text">Transparent Pricing</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              One-time setup fee + monthly management. Cancel anytime.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {pricingTiers.map((tier, index) => (
              <motion.div
                key={index}
                className={`glass-strong rounded-3xl p-8 relative ${
                  tier.popular ? "border-2 border-primary shadow-glow" : ""
                }`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                {tier.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-primary to-primary-glow text-white text-sm font-bold">
                    Most Popular
                  </div>
                )}

                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold mb-2">{tier.name}</h3>
                  <p className="text-muted-foreground text-sm mb-4">{tier.description}</p>
                  <div className="text-4xl font-bold gradient-text mb-1">{tier.price}</div>
                  <div className="text-sm text-muted-foreground">+ {tier.monthly} management</div>
                </div>

                <ul className="space-y-3 mb-8">
                  {tier.features.map((feature, fIndex) => (
                    <li key={fIndex} className="flex items-start gap-2">
                      <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button
                  onClick={scrollToContact}
                  className={`w-full ${
                    tier.popular
                      ? "bg-gradient-to-r from-primary to-primary-glow hover:shadow-glow"
                      : "glass border-primary/50"
                  }`}
                  size="lg"
                >
                  {tier.cta}
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </motion.div>
            ))}
          </div>

          <div className="mt-16 text-center max-w-2xl mx-auto">
            <div className="glass-strong rounded-2xl p-6">
              <Zap className="w-8 h-8 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">Not Sure What You Need?</h3>
              <p className="text-muted-foreground mb-4">
                Schedule a free consultation call. I'll analyze your workflow and show you exactly what can be automated and how much time you'll save.
              </p>
              <Button onClick={scrollToContact} variant="outline" size="lg">
                Book Free Consultation
                <Calendar className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Common <span className="gradient-accent-text">Questions</span>
            </h2>
          </div>

          <div className="max-w-3xl mx-auto space-y-4">
            {[
              {
                q: "Why is the website free?",
                a: "I'm building my portfolio and gaining experience. You get a professional website, I get a showcase project. It's a win-win. The real value I provide is in automation that saves you time.",
              },
              {
                q: "What's the difference between n8n and Zapier?",
                a: "Both are automation tools. n8n is more powerful and cheaper for complex workflows. Zapier is easier for simple integrations. I use whichever fits your needs best.",
              },
              {
                q: "Can I cancel the monthly management?",
                a: "Yes, anytime. The workflows keep running, but you won't get updates, monitoring, or support. You own everything we build.",
              },
              {
                q: "What if I only want one automation?",
                a: "Contact me! We can do custom packages. Maybe you just want social media automation - we can work out a fair price for that.",
              },
              {
                q: "Do you work with businesses outside Pennsylvania?",
                a: "Absolutely! While I'm based in rural PA, I work with clients anywhere via video calls and screen sharing.",
              },
            ].map((faq, index) => (
              <motion.div
                key={index}
                className="glass-strong rounded-xl p-6"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <h3 className="text-lg font-bold mb-2">{faq.q}</h3>
                <p className="text-muted-foreground">{faq.a}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Pricing;
