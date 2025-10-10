import { useEffect } from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import {
  CheckCircle2,
  Scissors,
  Calendar,
  Bell,
  Star,
  CreditCard,
  Users,
  MapPin,
  Clock,
  Gift,
  ArrowRight
} from 'lucide-react';

const Salons = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const features = [
    {
      icon: Calendar,
      title: "24/7 Booking",
      description: "Clients book appointments anytime, even at 2 AM"
    },
    {
      icon: Bell,
      title: "Automatic Reminders",
      description: "Reduce no-shows by 80% with text & email reminders"
    },
    {
      icon: Gift,
      title: "Gift Certificates",
      description: "Sell gift cards online - extra revenue year-round"
    },
    {
      icon: Users,
      title: "Client Profiles",
      description: "Remember preferences, color formulas, allergies"
    },
    {
      icon: CreditCard,
      title: "Online Payments",
      description: "Take deposits or full payment when booking"
    },
    {
      icon: Star,
      title: "Service Packages",
      description: "Sell bundles and memberships automatically"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main id="main-content" className="pt-20" tabIndex={-1}>
        <section className="relative py-20 overflow-hidden">
          <div className="absolute inset-0 mesh-gradient opacity-30" />
          <div className="container mx-auto px-4 relative">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
                <Scissors className="h-5 w-5 text-primary" />
                <span className="text-sm text-primary font-medium">For Salons & Spas</span>
              </div>
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                Stop Playing{' '}
                <span className="gradient-sunrise-text">Phone Tag</span>
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground mb-8">
                Let clients book themselves 24/7. Save 10+ hours per week.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
                <Button size="lg" className="text-lg" asChild>
                  <a href="#get-started">Get Started Free</a>
                </Button>
                <Button size="lg" variant="outline" className="text-lg" asChild>
                  <a href="#features">See Features</a>
                </Button>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
                Time is Money
              </h2>
              
              <div className="grid md:grid-cols-2 gap-8">
                <Card className="p-8 border-destructive/50">
                  <h3 className="text-2xl font-bold mb-6 text-destructive">Without Online Booking</h3>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <Clock className="h-5 w-5 text-destructive mt-1 flex-shrink-0" />
                      <div>
                        <p className="font-semibold">2 hours daily on phone</p>
                        <p className="text-sm text-muted-foreground">Taking appointments, rescheduling, confirmations</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Bell className="h-5 w-5 text-destructive mt-1 flex-shrink-0" />
                      <div>
                        <p className="font-semibold">30% no-show rate</p>
                        <p className="text-sm text-muted-foreground">Clients forget, last-minute cancellations</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Users className="h-5 w-5 text-destructive mt-1 flex-shrink-0" />
                      <div>
                        <p className="font-semibold">Missed opportunities</p>
                        <p className="text-sm text-muted-foreground">Clients call after hours, go elsewhere</p>
                      </div>
                    </div>
                  </div>
                </Card>

                <Card className="p-8 border-primary/50 bg-primary/5">
                  <h3 className="text-2xl font-bold mb-6 text-primary">With Online Booking</h3>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <Clock className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                      <div>
                        <p className="font-semibold">Zero time on phone</p>
                        <p className="text-sm text-muted-foreground">Clients book themselves instantly</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Bell className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                      <div>
                        <p className="font-semibold">5% no-show rate</p>
                        <p className="text-sm text-muted-foreground">Automatic reminders keep calendar full</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Users className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                      <div>
                        <p className="font-semibold">Never miss bookings</p>
                        <p className="text-sm text-muted-foreground">Accept appointments 24/7/365</p>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>

              <div className="mt-12 p-8 bg-card border-2 border-primary rounded-lg text-center">
                <p className="text-2xl font-bold mb-2">
                  Save <span className="text-primary">10 hours per week</span> = 520 hours per year
                </p>
                <p className="text-muted-foreground">
                  That's 13 full weeks of your life back
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20" id="features">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  Everything Your Salon Needs
                </h2>
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

        <section className="py-20 bg-primary/10" id="get-started">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl md:text-5xl font-bold mb-6">
                Ready to Get Your Time Back?
              </h2>
              <p className="text-xl text-muted-foreground mb-8">
                Free professional website with 24/7 online booking. Set up in days.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="text-lg" asChild>
                  <a href="/#contact" className="flex items-center gap-2">
                    Get Started Free
                    <ArrowRight className="h-5 w-5" />
                  </a>
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

export default Salons;
