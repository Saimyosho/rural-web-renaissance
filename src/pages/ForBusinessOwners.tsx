import { useEffect } from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import {
  CheckCircle2,
  XCircle,
  Globe,
  Calendar,
  FileText,
  CreditCard,
  Bell,
  Star,
  Clock,
  DollarSign,
  Users,
  TrendingUp,
  Smartphone,
  Shield,
  Zap,
  Heart,
  UtensilsCrossed,
  Scissors,
  Wrench,
  ShoppingBag,
  Briefcase,
  ArrowRight
} from 'lucide-react';

const ForBusinessOwners = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const benefits = [
    {
      icon: Globe,
      title: "Professional Website",
      description: "Your business looks trustworthy and modern online"
    },
    {
      icon: Users,
      title: "Found on Google",
      description: "Customers can find you when they search for your services"
    },
    {
      icon: Calendar,
      title: "24/7 Online Booking",
      description: "No more phone tag - customers book anytime, day or night"
    },
    {
      icon: Bell,
      title: "Automatic Reminders",
      description: "Reduce no-shows without lifting a finger"
    },
    {
      icon: FileText,
      title: "Digital Forms",
      description: "E-signatures sent automatically - no more paperwork"
    },
    {
      icon: CreditCard,
      title: "Accept Payments",
      description: "Get paid online securely and easily"
    }
  ];

  const problems = [
    {
      problem: "I lose customers because they can't book after hours",
      solution: "Your new website lets customers book appointments 24/7, even while you sleep. No more missed opportunities."
    },
    {
      problem: "I spend hours every week on appointment scheduling",
      solution: "Customers book themselves online. You just show up for the appointment. Save 5-10 hours per week."
    },
    {
      problem: "My current website looks outdated and unprofessional",
      solution: "Get a modern, mobile-friendly website that makes your business look premium and trustworthy."
    },
    {
      problem: "I need online ordering but it's too expensive",
      solution: "Start with a free professional website. Add online ordering later for a fraction of typical costs."
    },
    {
      problem: "I want to accept online payments securely",
      solution: "We integrate secure payment processing so you can get paid instantly - no technical knowledge needed."
    },
    {
      problem: "Too many no-shows are costing me money",
      solution: "Automatic SMS and email reminders reduce no-shows by up to 80%. Set it once, forget it forever."
    }
  ];

  const industries = [
    {
      icon: UtensilsCrossed,
      name: "Restaurants & Cafes",
      features: ["Online ordering", "Menu updates anytime", "Table reservations", "Customer reviews"]
    },
    {
      icon: Scissors,
      name: "Salons & Spas",
      features: ["Appointment booking", "Service packages", "Gift certificates", "Client profiles"]
    },
    {
      icon: Wrench,
      name: "Contractors",
      features: ["Quote requests", "Project galleries", "Service areas", "Contact forms"]
    },
    {
      icon: ShoppingBag,
      name: "Retail Stores",
      features: ["Product catalog", "Online shopping", "Order tracking", "Customer accounts"]
    },
    {
      icon: Briefcase,
      name: "Professional Services",
      features: ["Consultation booking", "Document signing", "Client portals", "Secure messaging"]
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main id="main-content" className="pt-20" tabIndex={-1}>
        {/* Hero Section */}
        <section className="relative py-20 overflow-hidden">
          <div className="absolute inset-0 mesh-gradient opacity-30" />
          <div className="container mx-auto px-4 relative">
            <div className="max-w-4xl mx-auto text-center">
              <Badge className="mb-6 text-base px-6 py-2">
                For Business Owners
              </Badge>
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                Free Professional Website{' '}
                <span className="gradient-sunrise-text">+ Optional Business Tools</span>
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground mb-8">
                No jargon. No complexity. Just what your business needs to grow.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="text-lg" asChild>
                  <a href="#get-started">Get Started Free</a>
                </Button>
                <Button size="lg" variant="outline" className="text-lg" asChild>
                  <a href="#how-it-works">See How It Works</a>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Before/After Comparison */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
                See the Difference
              </h2>
              
              <div className="grid md:grid-cols-2 gap-8">
                {/* Without */}
                <Card className="p-8 border-destructive/50 bg-destructive/5">
                  <div className="flex items-center gap-3 mb-6">
                    <XCircle className="h-8 w-8 text-destructive" />
                    <h3 className="text-2xl font-bold">Without a Professional Website</h3>
                  </div>
                  <ul className="space-y-4">
                    <li className="flex items-start gap-3">
                      <XCircle className="h-5 w-5 text-destructive mt-0.5 flex-shrink-0" />
                      <span className="text-muted-foreground">Customers can't find you on Google</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <XCircle className="h-5 w-5 text-destructive mt-0.5 flex-shrink-0" />
                      <span className="text-muted-foreground">Lose customers to competitors with websites</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <XCircle className="h-5 w-5 text-destructive mt-0.5 flex-shrink-0" />
                      <span className="text-muted-foreground">Waste hours playing phone tag for bookings</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <XCircle className="h-5 w-5 text-destructive mt-0.5 flex-shrink-0" />
                      <span className="text-muted-foreground">Paper forms and filing cabinets</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <XCircle className="h-5 w-5 text-destructive mt-0.5 flex-shrink-0" />
                      <span className="text-muted-foreground">Look unprofessional and outdated</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <XCircle className="h-5 w-5 text-destructive mt-0.5 flex-shrink-0" />
                      <span className="text-muted-foreground">Miss opportunities after business hours</span>
                    </li>
                  </ul>
                </Card>

                {/* With */}
                <Card className="p-8 border-primary/50 bg-primary/5">
                  <div className="flex items-center gap-3 mb-6">
                    <CheckCircle2 className="h-8 w-8 text-primary" />
                    <h3 className="text-2xl font-bold">With Our Complete Solution</h3>
                  </div>
                  <ul className="space-y-4">
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                      <span className="text-foreground font-medium">Show up when customers search on Google</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                      <span className="text-foreground font-medium">Professional site builds instant trust</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                      <span className="text-foreground font-medium">Customers book themselves 24/7</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                      <span className="text-foreground font-medium">Digital forms sent automatically</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                      <span className="text-foreground font-medium">Look modern and trustworthy</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                      <span className="text-foreground font-medium">Never miss another opportunity</span>
                    </li>
                  </ul>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* What You Get */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  What You Get
                </h2>
                <p className="text-xl text-muted-foreground">
                  Everything your business needs to succeed online
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {benefits.map((benefit, index) => (
                  <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
                    <benefit.icon className="h-12 w-12 text-primary mb-4" />
                    <h3 className="text-xl font-bold mb-2">{benefit.title}</h3>
                    <p className="text-muted-foreground">{benefit.description}</p>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Common Problems */}
        <section className="py-20 bg-muted/30" id="how-it-works">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  Problems We Solve
                </h2>
                <p className="text-xl text-muted-foreground">
                  Real challenges that business owners face every day
                </p>
              </div>

              <Accordion type="single" collapsible className="space-y-4">
                {problems.map((item, index) => (
                  <AccordionItem key={index} value={`item-${index}`} className="bg-background border rounded-lg px-6">
                    <AccordionTrigger className="text-left hover:no-underline">
                      <span className="text-lg font-semibold">{item.problem}</span>
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground pt-4">
                      {item.solution}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </section>

        {/* Simple Pricing */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  Simple, Honest Pricing
                </h2>
                <p className="text-xl text-muted-foreground">
                  No hidden fees. No surprises. Choose only what you need.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                {/* Free Website */}
                <Card className="p-8 border-2 border-primary">
                  <div className="flex items-center gap-2 mb-6">
                    <Star className="h-6 w-6 text-primary fill-primary" />
                    <Badge variant="default" className="text-sm">Most Popular</Badge>
                  </div>
                  <h3 className="text-3xl font-bold mb-2">Your Website</h3>
                  <div className="flex items-baseline gap-2 mb-6">
                    <span className="text-5xl font-bold gradient-sunrise-text">FREE</span>
                    <span className="text-muted-foreground">forever</span>
                  </div>
                  <ul className="space-y-3 mb-8">
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                      <span>Professional custom design</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                      <span>Works perfectly on phones & computers</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                      <span>Contact form included</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                      <span>Lightning fast loading</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                      <span>Secure & protected</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                      <span>Updates whenever you need</span>
                    </li>
                  </ul>
                  <Button size="lg" className="w-full" asChild>
                    <a href="#get-started">Get Started Free</a>
                  </Button>
                </Card>

                {/* Optional Add-ons */}
                <Card className="p-8">
                  <h3 className="text-3xl font-bold mb-2">Optional Add-Ons</h3>
                  <p className="text-muted-foreground mb-6">Pick what helps your business most</p>
                  <ul className="space-y-4 mb-8">
                    <li className="flex items-start gap-3">
                      <Calendar className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                      <div>
                        <div className="font-semibold">Online Booking</div>
                        <div className="text-sm text-muted-foreground">From $29/month</div>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <FileText className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                      <div>
                        <div className="font-semibold">E-Signature Forms</div>
                        <div className="text-sm text-muted-foreground">From $19/month</div>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <CreditCard className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                      <div>
                        <div className="font-semibold">Payment Processing</div>
                        <div className="text-sm text-muted-foreground">Standard rates apply</div>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <Bell className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                      <div>
                        <div className="font-semibold">SMS Reminders</div>
                        <div className="text-sm text-muted-foreground">Pay per message</div>
                      </div>
                    </li>
                  </ul>
                  <Button size="lg" variant="outline" className="w-full" asChild>
                    <a href="/#contact">Discuss Your Needs</a>
                  </Button>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Industry Examples */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  Perfect for Your Business
                </h2>
                <p className="text-xl text-muted-foreground">
                  We understand what different businesses need
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {industries.map((industry, index) => (
                  <Card key={index} className="p-6">
                    <industry.icon className="h-12 w-12 text-primary mb-4" />
                    <h3 className="text-xl font-bold mb-4">{industry.name}</h3>
                    <ul className="space-y-2">
                      {industry.features.map((feature, fIndex) => (
                        <li key={fIndex} className="flex items-center gap-2 text-sm text-muted-foreground">
                          <CheckCircle2 className="h-4 w-4 text-primary flex-shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  How It Works
                </h2>
                <p className="text-xl text-muted-foreground">
                  Get online in days, not months
                </p>
              </div>

              <div className="space-y-8">
                <div className="flex gap-6 items-start">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xl font-bold">
                    1
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold mb-2">Tell Us About Your Business</h3>
                    <p className="text-muted-foreground">
                      Quick phone call or message. We learn what makes your business special and what you need.
                    </p>
                  </div>
                </div>

                <div className="flex gap-6 items-start">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xl font-bold">
                    2
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold mb-2">We Build Your Site</h3>
                    <p className="text-muted-foreground">
                      Our team creates your professional website. You review it and request any changes you'd like.
                    </p>
                  </div>
                </div>

                <div className="flex gap-6 items-start">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xl font-bold">
                    3
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold mb-2">Go Live!</h3>
                    <p className="text-muted-foreground">
                      Your website launches. Customers can find you, book appointments, and contact you 24/7.
                    </p>
                  </div>
                </div>

                <div className="flex gap-6 items-start">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xl font-bold">
                    4
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold mb-2">We Support You</h3>
                    <p className="text-muted-foreground">
                      Need changes? Want to add features? Just ask. We're here to help your business grow.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-primary/10" id="get-started">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl md:text-5xl font-bold mb-6">
                Ready to Grow Your Business?
              </h2>
              <p className="text-xl text-muted-foreground mb-8">
                Start with a free professional website. No credit card required. No risk.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="text-lg" asChild>
                  <a href="/#contact" className="flex items-center gap-2">
                    Get Started Free
                    <ArrowRight className="h-5 w-5" />
                  </a>
                </Button>
                <Button size="lg" variant="outline" className="text-lg" asChild>
                  <a href="/faq">Common Questions</a>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default ForBusinessOwners;
