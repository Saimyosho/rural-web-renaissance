import { motion } from "framer-motion";
import { Bot, Calendar, Star, MessageSquare, Instagram, UtensilsCrossed, ArrowRight, CheckCircle, TrendingUp, Clock, DollarSign, Zap } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import WireframeBackground from "@/components/WireframeBackground";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BookingBotDemo, ReviewReplierDemo, SocialBotDemo, LeadCaptureDemo, MenuMasterDemo } from "@/components/ai-demos/AgentDemos";

const AIAgents = () => {
  const agents = [
    {
      id: "bookingbot",
      icon: <Calendar className="w-8 h-8" />,
      name: "BookingBot",
      tagline: "24/7 Appointment Assistant",
      description: "Never miss a booking again. AI-powered assistant that handles appointments, collects deposits, and reduces no-shows by 60%+",
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
        improvement: "60% reduction in no-shows"
      },
      pricing: "$300-450/month",
      gradient: "from-blue-500 to-cyan-500",
      demoType: "chat"
    },
    {
      id: "reviewreplier",
      icon: <Star className="w-8 h-8" />,
      name: "ReviewReplier",
      tagline: "Automated Review Management",
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
        improvement: "100% review response rate"
      },
      pricing: "$150-250/month",
      gradient: "from-yellow-500 to-orange-500",
      demoType: "reviews"
    },
    {
      id: "socialbot",
      icon: <Instagram className="w-8 h-8" />,
      name: "SocialBot",
      tagline: "Automated Social Media Manager",
      description: "Consistent, engaging content without the hassle. AI creates and posts daily content optimized for your audience.",
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
      pricing: "$300-500/month",
      gradient: "from-pink-500 to-purple-500",
      demoType: "social"
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
      pricing: "$200-350/month",
      gradient: "from-green-500 to-emerald-500",
      demoType: "chat"
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
      pricing: "$250-450/month",
      gradient: "from-red-500 to-orange-500",
      demoType: "chat"
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

  return (
    <div className="min-h-screen">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <WireframeBackground variant="circuit" density="medium" animate={true} />
        
        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <Badge className="mb-6 px-4 py-2 text-sm">
              <Bot className="w-4 h-4 mr-2 inline" />
              AI-Powered Business Automation
            </Badge>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              AI Agents That <span className="gradient-text">Work 24/7</span>
            </h1>
            
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Custom AI assistants built for small businesses. Handle bookings, reviews, social media, and more—completely automated.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                onClick={() => document.getElementById("agents")?.scrollIntoView({ behavior: "smooth" })}
                className="bg-gradient-to-r from-primary to-accent hover:shadow-glow"
              >
                Explore AI Agents
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
                className="glass border-primary/50"
              >
                Get Custom AI Agent
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 relative">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="glass-strong p-6 text-center hover-lift">
                  <div className="inline-flex p-4 rounded-full bg-primary/20 text-primary mb-4">
                    {benefit.icon}
                  </div>
                  <h3 className="text-lg font-bold mb-2">{benefit.title}</h3>
                  <p className="text-sm text-muted-foreground">{benefit.description}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* AI Agents Grid */}
      <section id="agents" className="py-20 relative">
        <WireframeBackground variant="dots" density="low" animate={false} />
        
        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Meet Your <span className="gradient-accent-text">AI Team</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
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
                <Card className="glass-strong p-8 md:p-12 hover-lift">
                  <div className="grid md:grid-cols-2 gap-8 items-start">
                    {/* Left Column - Info */}
                    <div>
                      <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-br ${agent.gradient} text-white mb-6`}>
                        {agent.icon}
                      </div>
                      
                      <h3 className="text-3xl font-bold mb-2">{agent.name}</h3>
                      <p className="text-lg text-primary mb-4">{agent.tagline}</p>
                      <p className="text-muted-foreground mb-6 leading-relaxed">
                        {agent.description}
                      </p>

                      <div className="mb-6">
                        <h4 className="text-sm font-semibold mb-3 text-foreground">Perfect For:</h4>
                        <div className="flex flex-wrap gap-2">
                          {agent.perfectFor.map((type, i) => (
                            <Badge key={i} variant="outline" className="glass">
                              {type}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div className="mb-6">
                        <h4 className="text-sm font-semibold mb-3 text-foreground">Key Features:</h4>
                        <ul className="space-y-2">
                          {agent.features.map((feature, i) => (
                            <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                              <CheckCircle className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                              <span>{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="grid grid-cols-3 gap-4 mb-6">
                        <div className="glass rounded-lg p-3">
                          <div className="text-xs text-muted-foreground mb-1">Time Saved</div>
                          <div className="text-sm font-bold text-primary">{agent.stats.timeSaved}</div>
                        </div>
                        <div className="glass rounded-lg p-3">
                          <div className="text-xs text-muted-foreground mb-1">ROI</div>
                          <div className="text-sm font-bold text-accent">{agent.stats.roi}</div>
                        </div>
                        <div className="glass rounded-lg p-3">
                          <div className="text-xs text-muted-foreground mb-1">Impact</div>
                          <div className="text-sm font-bold text-green-500">{agent.stats.improvement}</div>
                        </div>
                      </div>

                      <div className="flex items-center gap-4">
                        <div className="text-2xl font-bold gradient-text">{agent.pricing}</div>
                        <Button className="bg-gradient-to-r from-primary to-accent">
                          Get {agent.name}
                          <ArrowRight className="w-4 h-4 ml-2" />
                        </Button>
                      </div>
                    </div>

                    {/* Right Column - Demo */}
                    <div className="glass rounded-2xl p-6 border border-primary/20 min-h-[500px]">
                      <div className="text-sm font-semibold mb-4 text-primary">
                        🚀 Interactive Demo
                      </div>
                      <div className="h-[450px]">
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

      {/* Pricing Tiers */}
      <section className="py-20 relative">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Simple <span className="gradient-text">Pricing</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Choose the plan that fits your business needs
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[
              {
                name: "Essential",
                price: "$250-350",
                description: "Perfect for getting started",
                features: [
                  "One AI agent of your choice",
                  "Basic customization",
                  "Email support",
                  "Monthly performance reports",
                  "Free setup & training"
                ]
              },
              {
                name: "Professional",
                price: "$500-700",
                description: "For growing businesses",
                features: [
                  "Two AI agents",
                  "Advanced customization",
                  "Priority support",
                  "Weekly analytics",
                  "Custom AI training",
                  "Integration assistance"
                ],
                popular: true
              },
              {
                name: "Enterprise",
                price: "$1000+",
                description: "Complete automation",
                features: [
                  "Three+ AI agents",
                  "Full custom development",
                  "24/7 support",
                  "Daily reports",
                  "Dedicated account manager",
                  "API access"
                ]
              }
            ].map((tier, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className={`glass-strong p-8 h-full ${tier.popular ? 'border-2 border-primary' : ''}`}>
                  {tier.popular && (
                    <Badge className="mb-4 bg-primary">Most Popular</Badge>
                  )}
                  <h3 className="text-2xl font-bold mb-2">{tier.name}</h3>
                  <div className="text-4xl font-bold gradient-text mb-2">{tier.price}</div>
                  <p className="text-sm text-muted-foreground mb-6">{tier.description}</p>
                  
                  <ul className="space-y-3 mb-8">
                    {tier.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm">
                        <CheckCircle className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Button 
                    className={`w-full ${tier.popular ? 'bg-gradient-to-r from-primary to-accent' : ''}`}
                    variant={tier.popular ? 'default' : 'outline'}
                  >
                    Get Started
                  </Button>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 relative">
        <div className="container mx-auto px-6">
          <Card className="glass-strong p-12 text-center max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold mb-6">
              Ready to <span className="gradient-text">Automate</span> Your Business?
            </h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Get a free consultation to discuss which AI agents are right for your business. No commitment required.
            </p>
            <Button
              size="lg"
              onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
              className="bg-gradient-to-r from-primary to-accent hover:shadow-glow"
            >
              Schedule Free Consultation
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </Card>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default AIAgents;
