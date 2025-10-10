import { useEffect } from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  CheckCircle2,
  UtensilsCrossed,
  Calendar,
  CreditCard,
  Star,
  Clock,
  Users,
  MapPin,
  ShoppingCart,
  Bell,
  TrendingUp,
  ArrowRight
} from 'lucide-react';

const Restaurants = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const features = [
    {
      icon: ShoppingCart,
      title: "Online Ordering",
      description: "Customers order directly from your website - no third-party fees"
    },
    {
      icon: Calendar,
      title: "Table Reservations",
      description: "Let guests book tables 24/7 without calling"
    },
    {
      icon: UtensilsCrossed,
      title: "Digital Menu",
      description: "Update your menu anytime - prices, items, specials"
    },
    {
      icon: CreditCard,
      title: "Online Payments",
      description: "Accept payments securely online and in person"
    },
    {
      icon: Star,
      title: "Customer Reviews",
      description: "Display your 5-star reviews prominently"
    },
    {
      icon: Bell,
      title: "Order Notifications",
      description: "Get instant alerts for new orders and reservations"
    }
  ];

  const problems = [
    {
      title: "High Commission Fees",
      problem: "DoorDash and UberEats taking 30% of every order",
      solution: "Keep 100% of your profits with your own online ordering"
    },
    {
      title: "Phone Line Chaos",
      problem: "Staff overwhelmed answering phones during busy hours",
      solution: "Customers order and reserve online - your staff focuses on food"
    },
    {
      title: "Menu Update Headaches",
      problem: "Expensive to print new menus when prices change",
      solution: "Update your digital menu instantly - no printing costs"
    },
    {
      title: "No-Show Reservations",
      problem: "Tables sit empty because customers forget to cancel",
      solution: "Automatic reminders reduce no-shows by 80%"
    }
  ];

  const testimonial = {
    quote: "We saved $2,400 per month by ditching third-party delivery apps. Our own website pays for itself 100 times over.",
    author: "Maria Rodriguez",
    business: "La Cocina Mexican Restaurant",
    location: "Johnstown, PA"
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main id="main-content" className="pt-20" tabIndex={-1}>
        {/* Hero Section */}
        <section className="relative py-20 overflow-hidden">
          <div className="absolute inset-0 mesh-gradient opacity-30" />
          <div className="container mx-auto px-4 relative">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
                <UtensilsCrossed className="h-5 w-5 text-primary" />
                <span className="text-sm text-primary font-medium">For Restaurants & Cafes</span>
              </div>
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                Stop Paying{' '}
                <span className="gradient-sunrise-text">30% Commission Fees</span>
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground mb-8">
                Your own website with online ordering. Keep every dollar you earn.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
                <Button size="lg" className="text-lg" asChild>
                  <a href="#get-started">Get Started Free</a>
                </Button>
                <Button size="lg" variant="outline" className="text-lg" asChild>
                  <a href="#features">See What's Included</a>
                </Button>
              </div>
              <div className="flex flex-wrap gap-6 justify-center text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-primary" />
                  <span>No monthly fees</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-primary" />
                  <span>No commission</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-primary" />
                  <span>Set up in days</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Cost Comparison */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
                The Real Cost of Third-Party Apps
              </h2>
              
              <div className="grid md:grid-cols-2 gap-8">
                <Card className="p-8 border-destructive/50">
                  <h3 className="text-2xl font-bold mb-6 text-destructive">Third-Party Apps</h3>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center pb-3 border-b border-border">
                      <span>$100 order</span>
                      <span className="font-mono">$100.00</span>
                    </div>
                    <div className="flex justify-between items-center pb-3 border-b border-border text-destructive">
                      <span>Commission (30%)</span>
                      <span className="font-mono">-$30.00</span>
                    </div>
                    <div className="flex justify-between items-center pb-3 border-b border-border text-destructive">
                      <span>Processing fee</span>
                      <span className="font-mono">-$3.50</span>
                    </div>
                    <div className="flex justify-between items-center pt-2 text-lg font-bold">
                      <span>You keep:</span>
                      <span className="font-mono text-destructive">$66.50</span>
                    </div>
                  </div>
                  <div className="mt-6 p-4 bg-destructive/10 rounded-lg">
                    <p className="text-sm text-center font-semibold text-destructive">
                      Lost $33.50 per order!
                    </p>
                  </div>
                </Card>

                <Card className="p-8 border-primary/50 bg-primary/5">
                  <h3 className="text-2xl font-bold mb-6 text-primary">Your Own Website</h3>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center pb-3 border-b border-border">
                      <span>$100 order</span>
                      <span className="font-mono">$100.00</span>
                    </div>
                    <div className="flex justify-between items-center pb-3 border-b border-border text-primary">
                      <span>Commission</span>
                      <span className="font-mono">$0.00</span>
                    </div>
                    <div className="flex justify-between items-center pb-3 border-b border-border">
                      <span>Processing fee</span>
                      <span className="font-mono">-$3.20</span>
                    </div>
                    <div className="flex justify-between items-center pt-2 text-lg font-bold">
                      <span>You keep:</span>
                      <span className="font-mono text-primary">$96.80</span>
                    </div>
                  </div>
                  <div className="mt-6 p-4 bg-primary/10 rounded-lg">
                    <p className="text-sm text-center font-semibold text-primary">
                      Save $30.30 per order!
                    </p>
                  </div>
                </Card>
              </div>

              <div className="mt-12 p-8 bg-card border-2 border-primary rounded-lg text-center">
                <p className="text-2xl font-bold mb-2">
                  Just 10 orders per day = <span className="text-primary">$9,090 saved per month</span>
                </p>
                <p className="text-muted-foreground">
                  That's over $100,000 per year back in your pocket
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="py-20" id="features">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  Everything Your Restaurant Needs
                </h2>
                <p className="text-xl text-muted-foreground">
                  Professional tools to run your restaurant efficiently
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {features.map((feature, index) => (
                  <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
                    <feature.icon className="h-12 w-12 text-primary mb-4" />
                    <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Problems We Solve */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
                Common Restaurant Challenges
              </h2>

              <div className="space-y-6">
                {problems.map((item, index) => (
                  <Card key={index} className="p-6">
                    <h3 className="text-xl font-bold mb-3 text-destructive">{item.title}</h3>
                    <p className="text-muted-foreground mb-3">❌ {item.problem}</p>
                    <p className="text-foreground font-medium">✅ {item.solution}</p>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Testimonial */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <Card className="p-8 md:p-12 bg-primary/5 border-primary/20">
                <div className="flex gap-1 mb-6 justify-center">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-6 w-6 text-primary fill-primary" />
                  ))}
                </div>
                <blockquote className="text-xl md:text-2xl font-medium text-center mb-8 italic">
                  "{testimonial.quote}"
                </blockquote>
                <div className="text-center">
                  <p className="font-bold text-lg">{testimonial.author}</p>
                  <p className="text-muted-foreground">{testimonial.business}</p>
                  <p className="text-sm text-muted-foreground flex items-center justify-center gap-1 mt-1">
                    <MapPin className="h-3 w-3" />
                    {testimonial.location}
                  </p>
                </div>
              </Card>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
                Get Started in 3 Easy Steps
              </h2>

              <div className="space-y-8">
                <div className="flex gap-6 items-start">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xl font-bold">
                    1
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold mb-2">Share Your Menu & Photos</h3>
                    <p className="text-muted-foreground">
                      Send us your current menu and a few photos of your best dishes. That's all we need.
                    </p>
                  </div>
                </div>

                <div className="flex gap-6 items-start">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xl font-bold">
                    2
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold mb-2">We Build Your Website</h3>
                    <p className="text-muted-foreground">
                      We create your professional site with online ordering. You review and approve.
                    </p>
                  </div>
                </div>

                <div className="flex gap-6 items-start">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xl font-bold">
                    3
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold mb-2">Start Taking Orders</h3>
                    <p className="text-muted-foreground">
                      Your site goes live. Customers order online. You keep 100% of the profits.
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
                Ready to Stop Losing Money?
              </h2>
              <p className="text-xl text-muted-foreground mb-8">
                Free professional website. No commission fees. Keep every dollar you earn.
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

export default Restaurants;
