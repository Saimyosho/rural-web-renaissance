import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { Star, TrendingUp, Users, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";
import AnimatedCounter from "./AnimatedCounter";

const SocialProof = () => {
  const stats = [
    { value: 50, label: "Projects Completed", suffix: "+", icon: CheckCircle2 },
    { value: 35, label: "Happy Clients", suffix: "+", icon: Users },
    { value: 99, label: "Client Satisfaction", suffix: "%", icon: Star },
    { value: 15, label: "Years Experience", suffix: "+", icon: TrendingUp },
  ];

  const testimonials = [
    {
      name: "David Chen",
      business: "Chen Family Restaurant",
      role: "Manager",
      rating: 5,
      text: "Working with Sheldon was seamless. He understood our needs, provided weekly updates, and delivered ahead of schedule. The online ordering integration has been a game-changer for our business.",
      location: "Johnstown, PA"
    },
    {
      name: "David Chen",
      business: "Chenshuan Family Restaurant",
      role: "Manager",
      rating: 5,
      text: "Working with Sheldon was seamless. He understood our needs, provided weekly updates, and delivered ahead of schedule. The online ordering integration has been a game-changer for our business.",
      location: "Reading, PA"
    },
    {
      name: "Lisa Thompson",
      business: "Thompson Law Practice",
      role: "Attorney",
      rating: 5,
      text: "I was skeptical about the 'free website' model, but Sheldon delivered enterprise-level quality. The e-signature integration saves us hours each week. Worth every penny of the automation tools! Love you Shelly!",
      location: "Somerset, PA"
    }
  ];

  return (
    <section className="py-20 px-6 bg-gradient-to-b from-background to-background/50">
      <div className="container mx-auto max-w-7xl">
        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <Badge className="mb-4" variant="outline">
            <TrendingUp className="w-4 h-4 mr-2" />
            Proven Results
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Trusted by <span className="gradient-sunrise-text">Rural Businesses</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-12">
            Real results from real businesses across Pennsylvania
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className="glass-strong border-primary/20 hover:border-primary/40 transition-all">
                    <CardContent className="pt-6 text-center">
                      <Icon className="w-8 h-8 mx-auto mb-3 text-primary" />
                      <div className="text-4xl md:text-5xl font-bold mb-2 gradient-sunrise-text">
                        <AnimatedCounter end={stat.value} suffix={stat.suffix} />
                      </div>
                      <p className="text-sm text-muted-foreground">{stat.label}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Testimonials Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <h3 className="text-3xl font-bold text-center mb-2">What Clients Say</h3>
          <p className="text-center text-muted-foreground mb-12">
            Real feedback from businesses we've helped grow
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="glass-strong border-primary/20 hover:border-primary/40 transition-all h-full">
                  <CardContent className="pt-6">
                    {/* Rating Stars */}
                    <div className="flex gap-1 mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 fill-accent text-accent" />
                      ))}
                    </div>

                    {/* Testimonial Text */}
                    <p className="text-muted-foreground mb-6 italic">
                      "{testimonial.text}"
                    </p>

                    {/* Author Info */}
                    <div className="border-t border-primary/20 pt-4">
                      <p className="font-semibold">{testimonial.name}</p>
                      <p className="text-sm text-primary">{testimonial.role}</p>
                      <p className="text-sm text-muted-foreground">{testimonial.business}</p>
                      <p className="text-xs text-muted-foreground mt-1">{testimonial.location}</p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Trust Indicators */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-12"
        >
          <Card className="glass-strong border-primary/20">
            <CardContent className="pt-6">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
                <div>
                  <CheckCircle2 className="w-8 h-8 mx-auto mb-2 text-primary" />
                  <p className="font-semibold mb-1">100% Satisfaction</p>
                  <p className="text-sm text-muted-foreground">Money-back guarantee</p>
                </div>
                <div>
                  <CheckCircle2 className="w-8 h-8 mx-auto mb-2 text-primary" />
                  <p className="font-semibold mb-1">Full Ownership</p>
                  <p className="text-sm text-muted-foreground">You own all code & design</p>
                </div>
                <div>
                  <CheckCircle2 className="w-8 h-8 mx-auto mb-2 text-primary" />
                  <p className="font-semibold mb-1">10-Day Support</p>
                  <p className="text-sm text-muted-foreground">Post-launch assistance</p>
                </div>
                <div>
                  <CheckCircle2 className="w-8 h-8 mx-auto mb-2 text-primary" />
                  <p className="font-semibold mb-1">No Hidden Fees</p>
                  <p className="text-sm text-muted-foreground">Transparent pricing</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
};

export default SocialProof;
