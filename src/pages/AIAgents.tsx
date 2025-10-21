import { motion } from "framer-motion";
import { Bot, Calendar, Star, MessageSquare, Instagram, UtensilsCrossed, ArrowRight, CheckCircle, TrendingUp, Clock, DollarSign, Zap, Sparkles, Award, BarChart } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import WireframeBackground from "@/components/WireframeBackground";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BookingBotDemo, ReviewReplierDemo, SocialBotDemo, LeadCaptureDemo, MenuMasterDemo } from "@/components/ai-demos/AgentDemos";
import PremiumAgentShowcase from "@/components/ai-demos/PremiumAgentShowcase";

const AIAgents = () => {
  const agents = [
    {
      id: "bookingbot",
      icon: <Calendar className="w-8 h-8" />,
      name: "BookingBot",
      tagline: "24/7 Appointment Assistant",
      description: "Never miss a booking again. AI-powered assistant that handles appointments, collects deposits, and reduces no-shows automatically.",
      perfectFor: ["Salons & Barbers", "Restaurants", "Service Providers", "Medical Offices"],
      features: [
        "24/7 availability via chat, text, or voice",
        "Real-time availability checking",
        "Automatic deposit collection via Stripe",
        "SMS/Email confirmations & reminders",
        "Smart rescheduling & cancellations",
        "No-show reduction by 60%+"
      ],
      stats: {
        timeSaved: "15+ hours/week",
        roi: "Pays for itself with 3 bookings",
        improvement: "60% no-show reduction"
      },
      pricing: {
        monthly: "$299",
        setup: "Free setup & training included"
      },
      gradient: "from-blue-500 to-cyan-500",
      demoType: "chat",
      roiCalculator: {
        avgBookingValue: 40,
        bookingsPerMonth: 15,
        timeSavedHours: 15
      }
    },
    {
      id: "reviewreplier",
      icon: <Star className="w-8 h-8" />,
      name: "ReviewReplier",
      tagline: "Reputation Management on Autopilot",
      description: "Turn every review into an opportunity. AI monitors and responds to Google, Yelp, and Facebook reviews with perfect brand voice.",
      perfectFor: ["Restaurants", "Retail Shops", "Salons", "Service Businesses"],
      features: [
        "24/7 review monitoring across platforms",
        "Personalized thank-you responses",
        "Diplomatic handling of negative reviews",
        "Crisis alert system for owners",
        "Sentiment trend tracking",
        "Improves star ratings over time"
      ],
      stats: {
        timeSaved: "10+ hours/week",
        roi: "Better ratings = 30% more customers",
        improvement: "100% response rate"
      },
      pricing: {
        monthly: "$199",
        setup: "Free setup & training included"
      },
      gradient: "from-yellow-500 to-orange-500",
      demoType: "reviews",
      roiCalculator: {
        avgCustomerValue: 50,
        newCustomersPerMonth: 8,
        timeSavedHours: 10
      }
    },
    {
      id: "socialbot",
      icon: <Instagram className="w-8 h-8" />,
      name: "SocialBot",
      tagline: "Automated Social Media Manager",
      description: "Consistent, engaging content without the hassle. AI creates and posts daily content optimized for your rural audience.",
      perfectFor: ["Restaurants", "Retail Stores", "Contractors", "Any Local Business"],
      features: [
        "Daily automated posting to Instagram/Facebook",
        "AI-generated captions from your business info",
        "Simple graphics & photo creation",
        "Optimal scheduling based on engagement data",
        "Automatic comment responses",
        "Engagement analytics & insights"
      ],
      stats: {
        timeSaved: "20+ hours/week",
        roi: "3x increase in online engagement",
        improvement: "50%+ follower growth"
      },
      pricing: {
        monthly: "$299",
        setup: "Free setup & training included"
      },
      gradient: "from-pink-500 to-purple-500",
      demoType: "social",
      roiCalculator: {
        avgPostReach: 500,
        postsPerMonth: 30,
        timeSavedHours: 20
      }
    },
    {
      id: "leadcapture",
      icon: <MessageSquare className="w-8 h-8" />,
      name: "LeadCapture",
      tagline: "Website Chat & Lead Qualifier",
      description: "Convert more visitors into customers. Intelligent chat assistant that engages visitors and qualifies leads automatically.",
      perfectFor: ["Contractors", "Professional Services", "B2B Companies", "Real Estate"],
      features: [
        "Proactive visitor engagement",
        "Smart qualifying questions",
        "Automatic lead scoring",
        "Instant hot lead notifications",
        "Contact info collection",
        "Long-term lead nurturing"
      ],
      stats: {
        timeSaved: "12+ hours/week",
        roi: "2-3 extra qualified leads = paid",
        improvement: "200%+ lead capture rate"
      },
      pricing: {
        monthly: "$249",
        setup: "Free setup & training included"
      },
      gradient: "from-green-500 to-emerald-500",
      demoType: "chat",
      roiCalculator: {
        avgLeadValue: 500,
        leadsPerMonth: 3,
        timeSavedHours: 12
      }
    },
    {
      id: "menumaster",
      icon: <UtensilsCrossed className="w-8 h-8" />,
      name: "MenuMaster",
      tagline: "Restaurant AI Assistant",
      description: "Never miss an order. AI handles menu questions, takes orders, and manages dietary restrictions via text or chat.",
      perfectFor: ["Restaurants", "Cafes", "Food Trucks", "Catering Services"],
      features: [
        "Menu questions via text/chat 24/7",
        "Order taking for pickup/delivery",
        "Dietary restriction handling",
        "Real-time wait time updates",
        "Customer preference tracking",
        "Automatic upselling of specials"
      ],
      stats: {
        timeSaved: "25+ hours/week",
        roi: "15-30 extra orders/month",
        improvement: "40% reduction in phone traffic"
      },
      pricing: {
        monthly: "$279",
        setup: "Free setup & training included"
      },
      gradient: "from-red-500 to-orange-500",
      demoType: "chat",
      roiCalculator: {
        avgOrderValue: 35,
        ordersPerMonth: 20,
        timeSavedHours: 25
      }
    }
  ];

  const benefits = [
    {
      icon: <Clock className="w-6 h-6" />,
      title: "Save Time",
      description: "10-25 hours saved per week on repetitive tasks"
    },
    {
      icon: <DollarSign className="w-6 h-6" />,
      title: "Increase Revenue",
      description: "Never miss opportunities while you're busy or offline"
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Always Available",
      description: "24/7 service without hiring additional staff"
    },
    {
      icon: <TrendingUp className="w-6 h-6" />,
      title: "Scale Easily",
      description: "Handle 10x more customers without stress"
    }
  ];

  const pricingTiers = [
    {
      name: "Single Tool",
      price: "$199-299",
      period: "/month",
      description: "Perfect for getting started",
      features: [
        "One AI agent of your choice",
        "Free setup & training",
        "Email support",
        "Monthly performance reports",
        "Add to your existing free site"
      ],
      cta: "Start Free Site + Add Tool",
      popular: false
    },
    {
      name: "Smart Tools Bundle",
      price: "$549",
      period: "/month",
      description: "For growing businesses",
      savings: "Save 15% vs. individual tools",
      features: [
        "Two AI agents",
        "Advanced customization",
        "Priority support",
        "Weekly analytics",
        "Custom AI training",
        "Integration assistance"
      ],
      cta: "Get Smart Tools",
      popular: true
    },
    {
      name: "Growth Engine",
      price: "$999",
      period: "/month",
      description: "Complete automation",
      savings: "Maximum value + dedicated support",
      features: [
        "All 5 AI agents",
        "Full custom development",
        "24/7 priority support",
        "Daily reports & insights",
        "Dedicated account manager",
        "API access & white-label"
      ],
      cta: "Book Growth Call",
      popular: false
    }
  ];

  return (
    <div className="min-h-screen">
      <Navigation />
      
      {/* Hero Section - LiftKit Golden Ratio */}
      <section className="relative lk-py-3xl overflow-hidden">
        <WireframeBackground variant="circuit" density="medium" animate={true} />
        
        <div className="container mx-auto lk-px-md relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto lk-optical-center"
          >
            <Badge className="lk-mb-md px-4 py-2 text-sm">
              <Bot className="w-4 h-4 mr-2 inline" />
              Smart Tools That Scale Your Free Site
            </Badge>
            
            <h1 className="lk-display1 lk-mb-md">
              Add AI Agents to <span className="gradient-text">Your Website</span>
            </h1>
            
            <p className="lk-title3 text-muted-foreground lk-mb-lg max-w-2xl mx-auto">
              Got your free professional website? Now automate bookings, reviews, social media, and lead capture—no new hire needed.
            </p>

            <div className="flex flex-col sm:flex-row lk-gap-md justify-center lk-mb-xl">
              <Button
                size="lg"
                onClick={() => document.getElementById("agents")?.scrollIntoView({ behavior: "smooth" })}
                className="lk-button-lg bg-gradient-to-r from-primary to-accent hover:shadow-glow"
              >
                <Sparkles className="w-5 h-5 mr-2" />
                Explore AI Tools
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => window.location.href = "#contact"}
                className="lk-button-lg glass border-primary/50"
              >
                Start My Free Site First
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </div>

            {/* Trust Badges */}
            <div className="flex flex-wrap justify-center lk-gap-md">
              <Badge variant="outline" className="glass lk-px-md lk-py-xs">
                <Award className="w-4 h-4 mr-2 inline text-primary" />
                Built by Saimyosho
              </Badge>
              <Badge variant="outline" className="glass lk-px-md lk-py-xs">
                <BarChart className="w-4 h-4 mr-2 inline text-green-500" />
                Lighthouse 98+ Score
              </Badge>
              <Badge variant="outline" className="glass lk-px-md lk-py-xs">
                <Zap className="w-4 h-4 mr-2 inline text-yellow-500" />
                Loads in {'<'}1s
              </Badge>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Benefits Section - LiftKit Spacing */}
      <section className="lk-py-2xl relative">
        <div className="container mx-auto lk-px-md">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 lk-gap-lg max-w-6xl mx-auto">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="lk-card-optical text-center hover-lift h-full">
                  <div className="inline-flex p-4 lk-rounded-full bg-primary/20 text-primary lk-mb-md">
                    {benefit.icon}
                  </div>
                  <h3 className="lk-heading lk-mb-sm">{benefit.title}</h3>
                  <p className="lk-caption text-muted-foreground">{benefit.description}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* AI Agents Grid - Golden Ratio Layout */}
      <section id="agents" className="lk-py-3xl relative">
        <WireframeBackground variant="dots" density="low" animate={false} />
        
        <div className="container mx-auto lk-px-md relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center lk-mb-2xl"
          >
            <h2 className="lk-display2 lk-mb-md">
              Your <span className="gradient-accent-text">AI Team</span>
            </h2>
            <p className="lk-title3 text-muted-foreground max-w-2xl mx-auto">
              Five specialized AI agents designed to automate your most time-consuming tasks
            </p>
          </motion.div>

          <div className="space-y-12 max-w-7xl mx-auto">
            {agents.map((agent, index) => (
              <motion.div
                key={agent.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="lk-card lk-shadow-xl hover-lift overflow-hidden">
                  <div className="lk-grid-golden lk-gap-xl items-start">
                    {/* Left Column - Info (38.2%) */}
                    <div className="lk-py-lg lk-px-lg">
                      <div className={`inline-flex p-4 lk-rounded-xl bg-gradient-to-br ${agent.gradient} text-white lk-mb-md lk-shadow-lg`}>
                        {agent.icon}
                      </div>
                      
                      <h3 className="lk-title1 lk-mb-xs">{agent.name}</h3>
                      <p className="lk-heading text-primary lk-mb-md">{agent.tagline}</p>
                      <p className="lk-body text-muted-foreground lk-mb-lg leading-relaxed">
                        {agent.description}
                      </p>

                      <div className="lk-mb-lg">
                        <h4 className="lk-caption font-semibold lk-mb-sm text-foreground">Perfect For:</h4>
                        <div className="flex flex-wrap lk-gap-xs">
                          {agent.perfectFor.map((type, i) => (
                            <Badge key={i} variant="outline" className="glass">
                              {type}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div className="lk-mb-lg">
                        <h4 className="lk-caption font-semibold lk-mb-sm text-foreground">Key Features:</h4>
                        <ul className="space-y-2">
                          {agent.features.map((feature, i) => (
                            <li key={i} className="flex items-start lk-gap-xs lk-caption text-muted-foreground">
                              <CheckCircle className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                              <span>{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="grid grid-cols-3 lk-gap-sm lk-mb-lg">
                        <div className="glass lk-rounded-md p-3">
                          <div className="lk-caption text-muted-foreground mb-1">Time Saved</div>
                          <div className="text-sm font-bold text-primary">{agent.stats.timeSaved}</div>
                        </div>
                        <div className="glass lk-rounded-md p-3">
                          <div className="lk-caption text-muted-foreground mb-1">ROI</div>
                          <div className="text-sm font-bold text-accent">{agent.stats.roi}</div>
                        </div>
                        <div className="glass lk-rounded-md p-3">
                          <div className="lk-caption text-muted-foreground mb-1">Impact</div>
                          <div className="text-sm font-bold text-green-500">{agent.stats.improvement}</div>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <div>
                          <div className="lk-title2 gradient-text lk-mb-xs">{agent.pricing.monthly}<span className="lk-body text-muted-foreground">/month</span></div>
                          <div className="lk-caption text-muted-foreground">{agent.pricing.setup}</div>
                        </div>
                        <Button className={`w-full bg-gradient-to-r ${agent.gradient}`}>
                          Add to My Free Site
                          <ArrowRight className="w-4 h-4 ml-2" />
                        </Button>
                      </div>
                    </div>

                    {/* Right Column - Demo (61.8%) */}
                    <div className="glass lk-rounded-xl lk-p-lg border border-primary/20 lk-aspect-golden flex flex-col">
                      <div className="lk-caption font-semibold lk-mb-md text-primary flex items-center gap-2">
                        <Sparkles className="w-4 h-4" />
                        Try It Live
                      </div>
                      <div className="flex-1 min-h-0">
                        {agent.id === "bookingbot" && <BookingBotDemo />}
                        {agent.id === "reviewreplier" && <ReviewReplierDemo />}
                        {agent.id === "socialbot" && <SocialBotDemo />}
                        {agent.id === "leadcapture" && <LeadCaptureDemo />}
                        {agent.id === "menumaster" && <MenuMasterDemo />}
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Premium Agent Showcase */}
      <PremiumAgentShowcase />

      {/* Pricing Tiers - LiftKit Cards */}
      <section className="lk-py-3xl relative">
        <div className="container mx-auto lk-px-md">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center lk-mb-2xl"
          >
            <h2 className="lk-display2 lk-mb-md">
              Simple <span className="gradient-text">Pricing</span>
            </h2>
            <p className="lk-title3 text-muted-foreground max-w-2xl mx-auto">
              Add smart tools to your free website—choose the plan that fits your business needs
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 lk-gap-lg max-w-6xl mx-auto">
            {pricingTiers.map((tier, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className={`lk-card-optical h-full flex flex-col ${tier.popular ? 'border-2 border-primary lk-shadow-xl' : 'lk-shadow-md'}`}>
                  {tier.popular && (
                    <Badge className="lk-mb-md bg-primary">Most Popular</Badge>
                  )}
                  <h3 className="lk-title2 lk-mb-xs">{tier.name}</h3>
                  <div className="lk-title1 gradient-text lk-mb-xs">
                    {tier.price}
                    <span className="lk-caption text-muted-foreground">{tier.period}</span>
                  </div>
                  {tier.savings && (
                    <div className="lk-caption text-green-500 lk-mb-sm">{tier.savings}</div>
                  )}
                  <p className="lk-caption text-muted-foreground lk-mb-lg">{tier.description}</p>
                  
                  <ul className="space-y-3 lk-mb-lg flex-1">
                    {tier.features.map((feature, i) => (
                      <li key={i} className="flex items-start lk-gap-xs lk-caption">
                        <CheckCircle className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Button 
                    className={`w-full ${tier.popular ? 'bg-gradient-to-r from-primary to-accent' : ''}`}
                    variant={tier.popular ? 'default' : 'outline'}
                  >
                    {tier.cta}
                  </Button>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="lk-py-2xl relative">
        <div className="container mx-auto lk-px-md">
          <Card className="lk-card-optical text-center max-w-4xl mx-auto lk-shadow-xl">
            <h2 className="lk-display2 lk-mb-md">
              Ready to <span className="gradient-text">Automate</span>?
            </h2>
            <p className="lk-title3 text-muted-foreground lk-mb-lg max-w-2xl mx-auto">
              Start with a free professional website, then add AI tools when you're ready to scale. No commitment required.
            </p>
            <div className="flex flex-col sm:flex-row lk-gap-md justify-center">
              <Button
                size="lg"
                className="lk-button-lg bg-gradient-to-r from-primary to-accent hover:shadow-glow"
              >
                Start My Free Site
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="lk-button-lg glass border-primary/50"
              >
                Schedule Consultation
              </Button>
            </div>
          </Card>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default AIAgents;
